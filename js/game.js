// ===================== CAR GENERATION =====================
function generateCar() {
    const bd = carBrands[Math.random() * carBrands.length | 0];
    const model = bd.models[Math.random() * bd.models.length | 0];
    const year = 1985 + (Math.random() * 40 | 0);
    const mileage = Math.random() * 500 + 10 | 0;
    const ci = year < 2000 ? Math.random() * 2 | 0 : Math.random() * 3 | 0;
    const condition = conditions[ci];
    let bp = 200000 + (2026 - year) * -3000 + Math.random() * 100000;
    if (condition === 'Требует ремонта') bp *= .5;
    if (condition === 'В идеале') bp *= 1.3;
    if (bd.brand === 'BMW' || bd.brand === 'MERCEDES') bp *= 1.5;
    if (bd.brand === 'ЛАДА') bp *= .4;
    // Apply active effects
    GS.activeEffects.forEach(e => {
        if (e.type === 'price') {
            if (e.brands && e.brands.includes(bd.brand)) bp *= e.multiplier;
            if (e.maxYear && year <= e.maxYear) bp *= e.multiplier;
        }
        if (e.type === 'demand' && e.brands && e.brands.includes(bd.brand)) bp *= e.multiplier;
        if (e.type === 'demand' && e.models && e.models.includes(model)) bp *= e.multiplier;
        if (e.type === 'city_price' && e.city === GS.currentCity) bp *= e.multiplier;
    });
    const price = Math.round(bp / 1000) * 1000;
    return { id: Date.now() + Math.random(), brand: bd.brand, model, year, mileage, condition, price, city: cities[Math.random() * cities.length | 0], seller: sellers[Math.random() * sellers.length | 0], photo: carPhotos[Math.random() * carPhotos.length | 0], photoCount: (Math.random() * 12 | 0) + 3, views: (Math.random() * 500 | 0) + 10, daysAgo: (Math.random() * 30 | 0) + 1, isOwn: false };
}
function generateListings() { GS.listings = []; for (let i = 0; i < 15; i++)GS.listings.push(generateCar()); saveGame() }

// ===================== BUY CAR =====================
function buyCar(id) {
    const ci = GS.listings.findIndex(c => c.id == id); if (ci < 0) return;
    const car = GS.listings[ci];
    if (GS.garage.length >= GS.maxGarageSlots) { showToast('Гараж полон! Купите больше мест.', 'error'); return }
    if (GS.balance < car.price) { showToast('Недостаточно средств!', 'error'); return }
    GS.balance -= car.price;
    // Инициализация currentGarageCity если нет
    if (!GS.currentGarageCity) GS.currentGarageCity = 'Москва';
    GS.garage.push({ ...car, isOwn: true, purchasePrice: car.price, purchaseDate: GS.gameDay, garageCity: GS.currentGarageCity });
    GS.transactions.unshift({ id: Date.now(), type: 'expense', name: `Покупка: ${car.brand} ${car.model}`, amount: car.price, date: new Date().toISOString(), icon: '🚗' });
    GS.listings.splice(ci, 1); saveGame(); closeModal(); renderListings(); updateBalance(); renderTransactions(); renderGarage();
    showToast(`${car.brand} ${car.model} куплен! 🎉`, 'success');
}

// ===================== SELL =====================
function showSellModal() {
    if (!GS.garage.length) { showToast('У вас нет машин для продажи', 'error'); return }
    const m = document.getElementById('modalContent'); m.className = 'modal-content';
    m.innerHTML = `<div class="modal-header"><span style="font-weight:700">Подать объявление</span><div class="modal-close" onclick="closeModal()">✕</div></div><div class="sell-form"><label>Автомобиль</label><select id="sellCarSelect">${GS.garage.map(c => `<option value="${c.id}">${c.brand} ${c.model} ${c.year}</option>`).join('')}</select><label>Цена (₽)</label><input type="number" id="sellPrice" placeholder="Цена"><label>Город</label><select id="sellCity">${cities.map(c => `<option value="${c}">${c}</option>`).join('')}</select><button class="btn btn-primary" onclick="submitListing()" style="width:100%;margin-top:8px">Опубликовать</button></div>`;
    document.getElementById('sellCarSelect').addEventListener('change', function () { const car = GS.garage.find(c => c.id == this.value); if (car) { let s = car.price; if (car.condition === 'В идеале') s *= 1.2; if (car.condition === 'Требует ремонта') s *= .8; document.getElementById('sellPrice').value = Math.round(s / 1000) * 1000 } });
    const fc = GS.garage[0]; if (fc) document.getElementById('sellPrice').value = Math.round(fc.price / 1000) * 1000;
    document.getElementById('modalOverlay').classList.add('active');
}
function showSellOwnModal(carId) {
    const car = GS.garage.find(c => c.id == carId); if (!car) return;
    const m = document.getElementById('modalContent'); m.className = 'modal-content';
    m.innerHTML = `<div class="modal-header"><span style="font-weight:700">Продать ${car.brand} ${car.model}</span><div class="modal-close" onclick="closeModal()">✕</div></div><div class="sell-form"><label>Цена (₽)</label><input type="number" id="sellPrice" value="${Math.round(car.price * 1.15 / 1000) * 1000}"><label>Город</label><select id="sellCity">${cities.map(c => `<option value="${c}" ${c === car.city ? 'selected' : ''}>${c}</option>`).join('')}</select><button class="btn btn-primary" onclick="submitOwnListing('${car.id}')" style="width:100%;margin-top:8px">Опубликовать</button></div>`;
    document.getElementById('modalOverlay').classList.add('active');
}
function submitListing() {
    const carId = document.getElementById('sellCarSelect').value;
    const price = parseInt(document.getElementById('sellPrice').value);
    const city = document.getElementById('sellCity').value;
    if (!price || price <= 0) { showToast('Укажите цену', 'error'); return }
    const ci = GS.garage.findIndex(c => c.id == carId); if (ci < 0) return;
    const car = GS.garage[ci];
    const listing = { ...car, id: Date.now() + Math.random(), price, city, seller: 'Вы', isOwn: true, daysAgo: 0, views: 0, photoCount: (Math.random() * 8 | 0) + 3 };
    GS.listings.push(listing); GS.myListings.push({ listingId: listing.id, carId: car.id }); GS.garage.splice(ci, 1);
    saveGame(); closeModal(); renderListings(); renderGarage(); showToast('Объявление опубликовано! 📋', 'success');
}
function submitOwnListing(carId) {
    const price = parseInt(document.getElementById('sellPrice').value);
    const city = document.getElementById('sellCity').value;
    if (!price || price <= 0) { showToast('Укажите цену', 'error'); return }
    const ci = GS.garage.findIndex(c => c.id == carId); if (ci < 0) return;
    const car = GS.garage[ci];
    const listing = { ...car, id: Date.now() + Math.random(), price, city, seller: 'Вы', isOwn: true, daysAgo: 0, views: 0, photoCount: (Math.random() * 8 | 0) + 3 };
    GS.listings.push(listing); GS.myListings.push({ listingId: listing.id, carId: car.id }); GS.garage.splice(ci, 1);
    saveGame(); closeModal(); renderListings(); renderGarage(); showToast('Объявление опубликовано! 📋', 'success');
}

// ===================== REPAIR =====================
function showRepairModal(carId) {
    const car = GS.garage.find(c => c.id == carId); if (!car) return;
    const m = document.getElementById('modalContent'); m.className = 'modal-content';
    m.innerHTML = `<div class="modal-header"><span style="font-weight:700">Ремонт: ${car.brand} ${car.model}</span><div class="modal-close" onclick="closeModal()">✕</div></div><div class="repair-options"><div class="repair-option" onclick="repairCar('${car.id}','minor')"><div class="repair-option-title">🔧 Мелкий ремонт</div><div class="repair-option-desc">Замена расходников, ТО</div><div class="repair-option-price">${fmtP(Math.round(car.price * .05 / 1000) * 1000)}</div></div><div class="repair-option" onclick="repairCar('${car.id}','medium')"><div class="repair-option-title">🛠 Средний ремонт</div><div class="repair-option-desc">Замена деталей, покраска</div><div class="repair-option-price">${fmtP(Math.round(car.price * .12 / 1000) * 1000)}</div></div><div class="repair-option" onclick="repairCar('${car.id}','major')"><div class="repair-option-title">🏗 Капитальный ремонт</div><div class="repair-option-desc">Полное восстановление</div><div class="repair-option-price">${fmtP(Math.round(car.price * .25 / 1000) * 1000)}</div></div></div>`;
    document.getElementById('modalOverlay').classList.add('active');
}
function repairCar(carId, level) {
    const car = GS.garage.find(c => c.id == carId); if (!car) return;
    let cost, nc;
    if (level === 'minor') { cost = Math.round(car.price * .05 / 1000) * 1000; nc = car.condition === 'Требует ремонта' ? 'Хорошее' : car.condition }
    else if (level === 'medium') { cost = Math.round(car.price * .12 / 1000) * 1000; nc = car.condition === 'Требует ремонта' ? 'Хорошее' : 'В идеале' }
    else { cost = Math.round(car.price * .25 / 1000) * 1000; nc = 'В идеале' }
    if (GS.balance < cost) { showToast('Недостаточно средств!', 'error'); return }
    GS.balance -= cost; car.condition = nc; car.price = Math.round(car.price * (level === 'minor' ? 1.08 : level === 'medium' ? 1.18 : 1.3) / 1000) * 1000;
    GS.transactions.unshift({ id: Date.now(), type: 'expense', name: `Ремонт: ${car.brand} ${car.model}`, amount: cost, date: new Date().toISOString(), icon: '🔧' });
    saveGame(); closeModal(); renderGarage(); updateBalance(); renderTransactions(); showToast(`Ремонт завершён! Состояние: ${nc}`, 'success');
}

// ===================== MAPS (DRIVE) =====================
function renderMaps() {
    const c = document.getElementById('mapsCityList'); if (!c) return;
    c.innerHTML = cities.map(city => {
        const dist = cityDistances[city] || 0;
        const cost = dist * 5;
        const isCurrent = city === GS.currentCity;
        return `<div class="maps-city-card" onclick="${isCurrent ? '' : `showDriveModal('${city}',${dist},${cost})`}" style="${isCurrent ? 'border:2px solid #4ade80;opacity:.7' : ''}"><div class="maps-city-icon">🏙</div><div class="maps-city-info"><div class="maps-city-name">${city} ${isCurrent ? '(вы здесь)' : ''}</div><div class="maps-city-desc">${dist} км от Челябинска</div></div><div class="maps-city-dist">${isCurrent ? '—' : fmtP(cost)}</div></div>`;
    }).join('');
}
function showDriveModal(city, dist, cost) {
    if (!GS.garage.length) { showToast('Нет машин для перегона', 'error'); return }
    const m = document.getElementById('modalContent'); m.className = 'modal-content dark';
    m.innerHTML = `<div class="modal-header dark"><span style="font-weight:700">Перегон в ${city}</span><div class="modal-close dark" onclick="closeModal()">✕</div></div><div class="modal-body"><p style="font-size:13px;color:#aaa;margin-bottom:16px">Расстояние: ${dist} км • Стоимость: ${fmtP(cost)}<br>Риск поломки: ${Math.min(dist / 10, 30).toFixed(0)}%</p><label style="font-size:13px;color:#888;display:block;margin-bottom:6px">Выберите авто:</label><select id="driveCarSelect" style="width:100%;padding:10px;border-radius:10px;background:#2a2a2a;color:#fff;border:1px solid #444;margin-bottom:16px">${GS.garage.map(c => `<option value="${c.id}">${c.brand} ${c.model} ${c.year}</option>`).join('')}</select><button class="btn btn-primary" onclick="driveCar('${city}',${cost})" style="width:100%">Перегнать</button></div>`;
    document.getElementById('modalOverlay').classList.add('active');
}
function driveCar(city, cost) {
    if (GS.balance < cost) { showToast('Недостаточно средств!', 'error'); return }
    const carId = document.getElementById('driveCarSelect').value;
    const car = GS.garage.find(c => c.id == carId); if (!car) return;
    GS.balance -= cost;
    const breakdownChance = Math.min(cityDistances[city] / 1000, 0.3);
    if (Math.random() < breakdownChance && car.condition !== 'В идеале') {
        car.condition = car.condition === 'Хорошее' ? 'Требует ремонта' : 'Требует ремонта';
        GS.transactions.unshift({ id: Date.now(), type: 'expense', name: `Перегон: ${car.brand} ${car.model} → ${city} (поломка!)`, amount: cost, date: new Date().toISOString(), icon: '🚗' });
        showToast(`Машина доехала, но сломалась в дороге! 😰`, 'error');
    } else {
        GS.transactions.unshift({ id: Date.now(), type: 'expense', name: `Перегон: ${car.brand} ${car.model} → ${city}`, amount: cost, date: new Date().toISOString(), icon: '🚗' });
        showToast(`${car.brand} ${car.model} доставлен в ${city}! ✅`, 'success');
    }
    car.city = city; car.garageCity = city; GS.currentCity = city;
    document.getElementById('currentCity').textContent = city;
    saveGame(); closeModal(); renderGarage(); renderMaps(); updateBalance(); renderTransactions();
}

// ===================== BANK / CREDITS =====================
function showCreditCalc() {
    const m = document.getElementById('modalContent'); m.className = 'modal-content';
    m.innerHTML = `<div class="modal-header"><span style="font-weight:700">Автокредит</span><div class="modal-close" onclick="closeModal()">✕</div></div><div class="credit-calc"><label>Сумма кредита (₽)</label><input type="number" id="creditAmount" value="500000" oninput="calcCredit()"><label>Срок (месяцев)</label><select id="creditTerm" onchange="calcCredit()"><option value="3">3 мес. (5%)</option><option value="6">6 мес. (8%)</option><option value="12" selected>12 мес. (12%)</option><option value="24">24 мес. (18%)</option><option value="36">36 мес. (24%)</option></select><div class="credit-result" id="creditResult"></div><button class="btn btn-warning" onclick="takeCredit()" style="width:100%;margin-top:12px">Взять кредит</button></div>`;
    document.getElementById('modalOverlay').classList.add('active');
    calcCredit();
}
function calcCredit() {
    const amount = parseInt(document.getElementById('creditAmount')?.value) || 0;
    const term = parseInt(document.getElementById('creditTerm')?.value) || 12;
    const rates = { 3: 5, 6: 8, 12: 12, 24: 18, 36: 24 };
    const rate = rates[term] || 12;
    const total = Math.round(amount * (1 + rate / 100));
    const monthly = Math.round(total / term);
    const overpay = total - amount;
    const r = document.getElementById('creditResult'); if (!r) return;
    r.innerHTML = `<div class="credit-result-row"><span>Сумма:</span><span>${fmtP(amount)}</span></div><div class="credit-result-row"><span>Ставка:</span><span>${rate}%</span></div><div class="credit-result-row"><span>Ежемесячно:</span><span>${fmtP(monthly)}</span></div><div class="credit-result-row"><span>Переплата:</span><span style="color:#ef4444">${fmtP(overpay)}</span></div><div class="credit-result-row total"><span>Итого к возврату:</span><span>${fmtP(total)}</span></div>`;
}
function takeCredit() {
    const amount = parseInt(document.getElementById('creditAmount').value) || 0;
    const term = parseInt(document.getElementById('creditTerm').value) || 12;
    const rates = { 3: 5, 6: 8, 12: 12, 24: 18, 36: 24 };
    const rate = rates[term] || 12;
    const total = Math.round(amount * (1 + rate / 100));
    if (amount < 10000) { showToast('Минимальная сумма: 10 000 ₽', 'error'); return }
    GS.balance += amount;
    GS.credits.push({ id: Date.now(), amount, total, term, remaining: total, monthlyPayment: Math.round(total / term), monthsLeft: term });
    GS.transactions.unshift({ id: Date.now(), type: 'income', name: `Кредит: ${fmtP(amount)} на ${term} мес.`, amount, date: new Date().toISOString(), icon: '💳' });
    saveGame(); closeModal(); updateBalance(); renderTransactions(); showToast(`Кредит одобрен! +${fmtP(amount)} на счёт`, 'success');
}

// ===================== NEWS =====================
function generateNews() {
    if (GS.news.length === 0) {
        for (let i = 0; i < 3; i++) {
            const ev = newsEvents[Math.random() * newsEvents.length | 0];
            GS.news.unshift({ ...ev, id: Date.now() + Math.random(), day: GS.gameDay, date: new Date().toISOString() });
        }
    }
}
function renderNews() {
    generateNews();
    const c = document.getElementById('newsList'); if (!c) return;
    if (!GS.news.length) { c.innerHTML = '<div style="text-align:center;padding:40px;color:#999">Нет новостей</div>'; return }
    c.innerHTML = GS.news.map(n => `<div class="news-card"><div class="news-card-header"><span class="news-badge ${n.badge}">${n.badge === 'important' ? 'ВАЖНО' : n.badge === 'positive' ? 'ПОЗИТИВ' : 'ИНФО'}</span><span class="news-date">День ${n.day}</span></div><div class="news-title">${n.title}</div><div class="news-text">${n.text}</div></div>`).join('');
}

// ===================== TIME =====================
let gameTimerInterval = null;

function advanceTime() {
    GS.gameDay++;
    GS.gameDate = new Date(new Date(GS.gameDate).getTime() + 86400000).toISOString();
    processSales(); processCredits();
    // Refresh listings
    if (GS.listings.filter(l => !l.isOwn).length < 8) for (let i = 0; i < 5; i++)GS.listings.push(generateCar());
    // Random news event
    if (Math.random() < 0.35) {
        const ev = newsEvents[Math.random() * newsEvents.length | 0];
        GS.news.unshift({ ...ev, id: Date.now(), day: GS.gameDay, date: new Date().toISOString() });
        if (ev.effect) GS.activeEffects.push({ ...ev.effect, expiresDay: GS.gameDay + 5 });
        showToast(`📰 ${ev.title}`, '');
    }
    // Clean expired effects
    GS.activeEffects = GS.activeEffects.filter(e => !e.expiresDay || e.expiresDay > GS.gameDay);
    saveGame(); renderListings(); renderGarage(); renderTransactions(); updateBalance(); renderNews();
    const d = new Date(GS.gameDate);
    const dn = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const mn = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const cd = document.getElementById('calendarDate'); if (cd) cd.textContent = `${dn[d.getDay()]}, ${d.getDate()} ${mn[d.getMonth()]} ${d.getFullYear()}`;
    showToast(`День ${GS.gameDay} начался! ⏩`, 'success');
}

function startGameTimer() {
    if (gameTimerInterval) clearInterval(gameTimerInterval);
    gameTimerInterval = setInterval(() => {
        GS.gameTimeSeconds += 60; // +60 игровых секунд (1 игровая минута) каждую секунду реального времени (Time Scale = 60)
        if (GS.gameTimeSeconds >= 24 * 3600) { // 24 игровых часа = новый день
            GS.gameTimeSeconds = GS.gameTimeSeconds % (24 * 3600);
            advanceTime();
        }
        updateGameTimeDisplay();
    }, 1000); // Каждую секунду реального времени
}

function updateGameTimeDisplay() {
    const totalSeconds = GS.gameTimeSeconds;
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    const e1 = document.getElementById('statusTime'); if (e1) e1.textContent = timeStr;
    const e2 = document.getElementById('macosTime'); if (e2) e2.textContent = timeStr;
}
function processSales() {
    const rm = [];
    GS.myListings.forEach((ml, idx) => {
        const li = GS.listings.findIndex(l => l.id == ml.listingId); if (li < 0) { rm.push(idx); return }
        const listing = GS.listings[li]; listing.views += (Math.random() * 50 | 0) + 5; listing.daysAgo++;
        const fairPrice = listing.purchasePrice || listing.price;
        const ratio = listing.price / fairPrice;
        let sc = ratio < .9 ? .7 : ratio < 1 ? .5 : ratio < 1.1 ? .35 : ratio < 1.2 ? .2 : ratio < 1.3 ? .1 : .05;
        if (Math.random() < sc) {
            GS.balance += listing.price;
            GS.transactions.unshift({ id: Date.now() + Math.random(), type: 'income', name: `Продажа: ${listing.brand} ${listing.model}`, amount: listing.price, date: new Date().toISOString(), icon: '💰' });
            GS.listings.splice(li, 1); rm.push(idx);
            showToast(`${listing.brand} ${listing.model} продан за ${fmtP(listing.price)}! 💰`, 'success');
        }
    });
    rm.reverse().forEach(i => GS.myListings.splice(i, 1)); saveGame();
}
function processCredits() {
    GS.credits.forEach(cr => {
        if (cr.monthsLeft > 0) {
            const payment = Math.min(cr.monthlyPayment, cr.remaining);
            if (GS.balance >= payment) {
                GS.balance -= payment; cr.remaining -= payment; cr.monthsLeft--;
                GS.transactions.unshift({ id: Date.now() + Math.random(), type: 'expense', name: `Платёж по кредиту (ост. ${cr.monthsLeft} мес.)`, amount: payment, date: new Date().toISOString(), icon: '💳' });
            } else {
                GS.balance -= GS.balance; cr.monthsLeft--;
                GS.transactions.unshift({ id: Date.now() + Math.random(), type: 'expense', name: 'Просрочка по кредиту!', amount: payment, date: new Date().toISOString(), icon: '⚠️' });
            }
        }
    });
    GS.credits = GS.credits.filter(cr => cr.monthsLeft > 0 && cr.remaining > 0); saveGame();
}
function sleepAction() { advanceTime(); closeApp('sleep') }
