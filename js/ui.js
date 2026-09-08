// ===================== PHONE APP GRID =====================
function buildPhoneGrid() {
    document.getElementById('phoneAppGrid').innerHTML = appDefs.map(a => `<div class="app-icon" onclick="openApp('${a.id}')">${a.iconImg ? `<div class="app-icon-wrapper"><img src="${a.iconImg}" class="app-icon-png"></div>` : `<div class="app-icon-img" style="background:${a.bg}">${a.icon}</div>`}<span class="app-icon-label">${a.label}</span></div>`).join('');
}

// ===================== APP NAVIGATION =====================
function openApp(id) {
    // Если приложение сейчас в macOS-окне — закрываем окно и возвращаем в телефон
    const macosWin = document.getElementById('win-' + id);
    if (macosWin) {
        returnAppToPhone(id);
        macosWin.remove();
        const dockEl = document.getElementById('dock-' + id); if (dockEl) dockEl.classList.remove('running');
    }
    const app = document.getElementById(id + '-app'); if (app) app.classList.add('active');
    if (id === 'avtobuy') { renderListings(); switchAvtoBuyTab('listings') }
    if (id === 'garage') renderGarage();
    if (id === 'bank') { renderTransactions(); updateBalance() }
    if (id === 'maps') renderMaps();
    if (id === 'news') renderNews();
    if (id === 'notepad') document.getElementById('notepadText').value = GS.notes || '';
    if (id === 'settings') {
        document.getElementById('statsInfo').textContent = GS.garage.length + ' авто';
        document.getElementById('gameDay').textContent = 'День ' + GS.gameDay;
        applyMode();
    }
}
function closeApp(id) {
    const app = document.getElementById(id + '-app'); if (app) app.classList.remove('active');
    if (id === 'notepad') { GS.notes = document.getElementById('notepadText').value; saveGame() }
}

// ===================== LISTINGS =====================
function renderListings() {
    const c = document.getElementById('listingsContainer'); if (!c) return;
    const search = (document.getElementById('searchInput')?.value || '').toLowerCase();
    let f = GS.listings.filter(l => !l.isOwn);
    if (search) f = f.filter(l => `${l.brand} ${l.model}`.toLowerCase().includes(search) || l.city.toLowerCase().includes(search));
    c.innerHTML = f.map(car => `<div class="listing-card" onclick="showCarDetail('${car.id}',false)"><div class="listing-photo"><img src="${car.photo}" alt="" loading="lazy"><div class="listing-photo-count">📷 ${car.photoCount}</div><div class="listing-favorite ${GS.favorites.includes(car.id) ? 'active' : ''}" onclick="event.stopPropagation();toggleFavorite('${car.id}')">${GS.favorites.includes(car.id) ? '❤️' : '🤍'}</div></div><div class="listing-info"><div class="listing-price">${fmtP(car.price)}</div><div class="listing-title">${car.brand} ${car.model}</div><div class="listing-details">${car.year} г. • ${car.mileage} тыс км</div><div class="listing-location">📍 ${car.city}</div><div class="listing-seller">${car.seller} • Частное лицо</div><div class="listing-meta"><span>${car.daysAgo === 1 ? 'Вчера' : car.daysAgo + ' дн. назад'}</span><span class="listing-views">👁 ${car.views}</span></div></div></div>`).join('');
}
function filterListings() { renderListings() }
function toggleFavorite(id) { const i = GS.favorites.indexOf(id); if (i >= 0) GS.favorites.splice(i, 1); else GS.favorites.push(id); saveGame(); renderListings() }
function showFavorites() {
    document.getElementById('tabFavorites').classList.add('active');
    document.getElementById('tabListings').classList.remove('active');
    document.getElementById('tabChat').classList.remove('active');
    document.getElementById('chatListContainer').style.display = 'none';
    document.getElementById('chatWindow').style.display = 'none';
    const c = document.getElementById('listingsContainer'); c.style.display = 'block';
    const fav = GS.listings.filter(l => GS.favorites.includes(l.id));
    if (!fav.length) { c.innerHTML = '<div style="text-align:center;padding:40px;color:#666">Нет избранных</div>'; return }
    c.innerHTML = fav.map(car => `<div class="listing-card" onclick="showCarDetail('${car.id}',false)"><div class="listing-photo"><img src="${car.photo}" alt="" loading="lazy"><div class="listing-favorite active" onclick="event.stopPropagation();toggleFavorite('${car.id}')">❤️</div></div><div class="listing-info"><div class="listing-price">${fmtP(car.price)}</div><div class="listing-title">${car.brand} ${car.model}</div><div class="listing-details">${car.year} г. • ${car.mileage} тыс км</div><div class="listing-location">📍 ${car.city}</div></div></div>`).join('');
}

// ===================== CAR DETAIL =====================
function showCarDetail(id, isOwn) {
    const car = isOwn ? GS.garage.find(c => c.id == id) : GS.listings.find(c => c.id == id); if (!car) return;
    const cc = car.condition === 'В идеале' ? 'condition-ideal' : car.condition === 'Хорошее' ? 'condition-good' : 'condition-repair';
    let acts = '';
    if (!isOwn && !car.isOwn) {
        acts = `<div class="modal-actions"><button class="btn btn-secondary dark" onclick="closeModal()">Закрыть</button><button class="btn btn-warning" onclick="startHaggle('${car.id}')">Торг</button><button class="btn btn-success" onclick="buyCar('${car.id}')">Купить</button></div>`;
    } else {
        acts = `<div class="modal-actions"><button class="btn btn-secondary dark" onclick="closeModal()">Закрыть</button><button class="btn btn-warning" onclick="showRepairModal('${car.id}')">Ремонт</button><button class="btn btn-primary" onclick="showSellOwnModal('${car.id}')">Продать</button></div>`;
    }
    const m = document.getElementById('modalContent'); m.className = 'modal-content dark';
    m.innerHTML = `<div class="modal-header dark"><span style="font-weight:700">Подробности</span><div class="modal-close dark" onclick="closeModal()">✕</div></div><div class="modal-body"><div class="modal-car-photo"><img src="${car.photo}" alt=""></div><div class="modal-car-title">${car.brand} ${car.model}</div><div class="modal-car-price">${fmtP(car.price)}</div><div class="modal-car-specs"><div class="spec-item dark"><div class="spec-label">Год</div><div class="spec-value">${car.year}</div></div><div class="spec-item dark"><div class="spec-label">Пробег</div><div class="spec-value">${car.mileage} тыс км</div></div><div class="spec-item dark"><div class="spec-label">Состояние</div><div class="spec-value ${cc}">${car.condition}</div></div><div class="spec-item dark"><div class="spec-label">Город</div><div class="spec-value">${car.city}</div></div></div>${!isOwn && !car.isOwn ? `<div style="margin-top:8px;font-size:13px;color:#888"><div>👤 ${car.seller} • Частное лицо</div><div style="margin-top:4px">📅 ${car.daysAgo === 1 ? 'Вчера' : car.daysAgo + ' дн. назад'} • 👁 ${car.views}</div></div>` : ''}${acts}</div>`;
    document.getElementById('modalOverlay').classList.add('active');
}
function closeModal() { document.getElementById('modalOverlay').classList.remove('active') }
document.getElementById('modalOverlay').addEventListener('click', function (e) { if (e.target === this) closeModal() });

// ===================== GARAGE =====================
function renderGarage() {
    const c = document.getElementById('garageList'); if (!c) return;
    const si = document.getElementById('garageSlotsInfo');
    const cs = document.getElementById('garageCitySelector');

    // Инициализация currentGarageCity если нет
    if (!GS.currentGarageCity) GS.currentGarageCity = 'Москва';
    if (!GS.activeGarageTab) GS.activeGarageTab = 'myCars';

    // Обновление информации о местах (без кнопки покупки)
    if (si) si.innerHTML = `<span>Мест: <strong>${GS.garage.length}/${GS.maxGarageSlots}</strong></span>`;

    // Рендер селектора городов
    if (cs) {
        const citiesWithCars = [...new Set(GS.garage.map(c => c.garageCity || 'Москва'))];
        if (!citiesWithCars.includes('Москва')) citiesWithCars.unshift('Москва');
        cs.innerHTML = citiesWithCars.map(city => `<button class="garage-city-btn ${city === GS.currentGarageCity ? 'active' : ''}" onclick="changeGarageCity('${city}')">${city}</button>`).join('');
    }

    // Рендер в зависимости от активной вкладки
    if (GS.activeGarageTab === 'myCars') {
        renderMyCarsTab(c);
    } else {
        renderParkingSlotsTab(c);
    }
}

function switchGarageTab(tab) {
    GS.activeGarageTab = tab;
    document.querySelectorAll('.garage-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    renderGarage();
}

function changeGarageCity(city) {
    GS.currentGarageCity = city;
    renderGarage();
}

function getGarageSlotNumber(car) {
    const idx = GS.garage.findIndex(c => c.id === car.id);
    return `Место #${idx + 1}`;
}

function renderMyCarsTab(container) {
    const carsInCity = GS.garage.filter(c => (c.garageCity || 'Москва') === GS.currentGarageCity);

    if (!carsInCity.length) {
        container.innerHTML = '<div class="garage-empty"><div class="garage-empty-icon">🚗</div><div>Гараж пуст</div><div style="font-size:13px;margin-top:8px;color:#aaa">В этом городе нет машин. Купите машину на AvtoBuy или выберите другой город.</div></div>';
        return;
    }

    container.innerHTML = carsInCity.map((car, idx) => {
        const cc = car.condition === 'В идеале' ? 'condition-ideal' : car.condition === 'Хорошее' ? 'condition-good' : 'condition-repair';
        const slotNum = getGarageSlotNumber(car);
        return `<div class="garage-card" onclick="showCarDetail('${car.id}',true)"><div class="garage-car-photo"><img src="${car.photo}" alt="" loading="lazy"></div><div class="garage-car-info"><div class="garage-car-name">${car.brand} ${car.model}</div><div class="garage-car-details">${car.year} г. • ${car.mileage} тыс км</div><div class="garage-car-condition ${cc}">${car.condition}</div><div class="garage-slot-number">${slotNum}</div></div></div>`;
    }).join('');
}

function renderParkingSlotsTab(container) {
    if (!GS.garage.length) {
        container.innerHTML = '<div class="garage-empty"><div class="garage-empty-icon">🚗</div><div>У вас нет автомобилей</div><div style="font-size:13px;margin-top:8px;color:#aaa">Купите машину на AvtoBuy</div></div>';
        return;
    }

    // Группировка по городам
    const grouped = {};
    GS.garage.forEach(car => {
        const city = car.garageCity || 'Москва';
        if (!grouped[city]) grouped[city] = [];
        grouped[city].push(car);
    });

    let html = '';
    for (const city in grouped) {
        const cars = grouped[city];
        html += `<div class="garage-parking-group"><div class="garage-parking-title">📍 ${city} (${cars.length} ${cars.length === 1 ? 'машина' : 'машины'})</div>`;
        cars.forEach(car => {
            const cc = car.condition === 'В идеале' ? 'condition-ideal' : car.condition === 'Хорошее' ? 'condition-good' : 'condition-repair';
            const slotNum = getGarageSlotNumber(car);
            html += `<div class="garage-card" onclick="showCarDetail('${car.id}',true)"><div class="garage-car-photo"><img src="${car.photo}" alt="" loading="lazy"></div><div class="garage-car-info"><div class="garage-car-name">${car.brand} ${car.model}</div><div class="garage-car-details">${car.year} г. • ${car.mileage} тыс км</div><div class="garage-car-condition ${cc}">${car.condition}</div><div class="garage-slot-number">${slotNum}</div></div></div>`;
        });
        html += '</div>';
    }
    container.innerHTML = html;
}
function getSlotPrice() { return 50000 * GS.maxGarageSlots }
function buyGarageSlot() {
    const price = getSlotPrice();
    if (GS.balance < price) { showToast('Недостаточно средств!', 'error'); return }
    GS.balance -= price; GS.maxGarageSlots++;
    GS.transactions.unshift({ id: Date.now(), type: 'expense', name: 'Покупка парковочного места', amount: price, date: new Date().toISOString(), icon: '🅿' });
    saveGame(); renderGarage(); updateBalance(); renderTransactions(); showToast(`Гараж расширен до ${GS.maxGarageSlots} мест!`, 'success');
}

// ===================== BANK / TRANSACTIONS =====================
function updateBalance() { const el = document.getElementById('balanceDisplay'); if (el) el.textContent = fmtP(GS.balance) }
function renderTransactions() {
    const c = document.getElementById('transactionsList'); if (!c) return;
    if (!GS.transactions.length) { c.innerHTML = '<div style="text-align:center;padding:30px;color:#999">Нет операций</div>'; return }
    c.innerHTML = GS.transactions.slice(0, 50).map(t => { const d = new Date(t.date); return `<div class="transaction-card"><div class="transaction-icon ${t.type === 'income' ? 'income' : 'expense'}">${t.icon || (t.type === 'income' ? '🚗' : '🚂')}</div><div class="transaction-info"><div class="transaction-name">${t.name}</div><div class="transaction-date">${d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}, ${d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</div></div><div class="transaction-amount ${t.type === 'income' ? 'positive' : 'negative'}">${t.type === 'income' ? '+' : '-'}${fmtP(t.amount)}</div></div>` }).join('');
}

// ===================== FILTERS / CITY =====================
function showCityFilter() {
    const m = document.getElementById('modalContent'); m.className = 'modal-content';
    m.innerHTML = `<div class="modal-header"><span style="font-weight:700">Выбор города</span><div class="modal-close" onclick="closeModal()">✕</div></div><div class="filter-panel">${cities.map(c => `<div class="repair-option" onclick="GS.currentCity='${c}';document.getElementById('currentCity').textContent='${c}';closeModal();showToast('Город: ${c}')"><div class="repair-option-title">📍 ${c}</div></div>`).join('')}</div>`;
    document.getElementById('modalOverlay').classList.add('active');
}
function showFilters() {
    const m = document.getElementById('modalContent'); m.className = 'modal-content dark';
    m.innerHTML = `<div class="modal-header dark"><span style="font-weight:700">Фильтры</span><div class="modal-close dark" onclick="closeModal()">✕</div></div><div class="filter-panel"><div class="filter-group dark"><label>Марка</label><select id="filterBrand"><option value="">Все</option>${carBrands.map(b => `<option value="${b.brand}">${b.brand}</option>`).join('')}</select></div><div class="filter-group dark"><label>Цена от</label><input type="number" id="filterPriceMin" placeholder="0"></div><div class="filter-group dark"><label>Цена до</label><input type="number" id="filterPriceMax" placeholder="10000000"></div><button class="btn btn-primary" onclick="applyFilters()" style="width:100%;margin-top:12px">Применить</button></div>`;
    document.getElementById('modalOverlay').classList.add('active');
}
function applyFilters() {
    const brand = document.getElementById('filterBrand').value;
    const pMin = parseInt(document.getElementById('filterPriceMin').value) || 0;
    const pMax = parseInt(document.getElementById('filterPriceMax').value) || Infinity;
    let f = GS.listings.filter(l => !l.isOwn);
    if (brand) f = f.filter(l => l.brand === brand);
    f = f.filter(l => l.price >= pMin && l.price <= pMax);
    const c = document.getElementById('listingsContainer');
    c.innerHTML = f.map(car => `<div class="listing-card" onclick="showCarDetail('${car.id}',false)"><div class="listing-photo"><img src="${car.photo}" alt="" loading="lazy"><div class="listing-photo-count">📷 ${car.photoCount}</div></div><div class="listing-info"><div class="listing-price">${fmtP(car.price)}</div><div class="listing-title">${car.brand} ${car.model}</div><div class="listing-details">${car.year} г. • ${car.mileage} тыс км</div><div class="listing-location">📍 ${car.city}</div></div></div>`).join('') || '<div style="text-align:center;padding:40px;color:#666">Ничего не найдено</div>';
    closeModal();
}
