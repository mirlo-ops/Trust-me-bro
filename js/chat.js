// ===================== AVTOBUY TABS =====================
let avtoBuyTab = 'listings';
function switchAvtoBuyTab(tab) {
    avtoBuyTab = tab;
    document.getElementById('listingsContainer').style.display = tab === 'listings' ? 'block' : 'none';
    document.getElementById('chatListContainer').style.display = tab === 'chat' ? 'block' : 'none';
    document.getElementById('chatWindow').style.display = 'none';
    document.getElementById('tabListings').classList.toggle('active', tab === 'listings');
    document.getElementById('tabChat').classList.toggle('active', tab === 'chat');
    document.getElementById('tabFavorites').classList.remove('active');
    if (tab === 'chat') renderChatList();
    if (tab === 'listings') renderListings();
}

// ===================== HAGGLE / CHAT SYSTEM =====================
let activeChatId = null;
function startHaggle(carId) {
    const car = GS.listings.find(c => c.id == carId); if (!car) return;
    closeModal();
    // Create or find chat
    let chat = GS.chats.find(ch => ch.carId == carId && ch.type === 'buy');
    if (!chat) {
        chat = {
            id: Date.now(), carId, type: 'buy', sellerName: car.seller, carName: car.brand + ' ' + car.model, originalPrice: car.price, currentOffer: car.price, messages: [
                { from: 'seller', text: `Здравствуйте! Продаю ${car.brand} ${car.model} ${car.year} г. Цена ${fmtP(car.price)}. Интересует?` },
            ], status: 'active'
        };
        GS.chats.push(chat); saveGame();
    }
    switchAvtoBuyTab('chat');
    setTimeout(() => openChatWindow(chat.id), 100);
}
function renderChatList() {
    const c = document.getElementById('chatListContainer'); if (!c) return;
    if (!GS.chats.length) { c.innerHTML = '<div style="text-align:center;padding:40px;color:#666">Нет чатов. Начните торг с продавцом!</div>'; return }
    c.innerHTML = GS.chats.map(ch => {
        const lastMsg = ch.messages[ch.messages.length - 1];
        return `<div class="chat-item" onclick="openChatWindow('${ch.id}')"><div class="chat-avatar">${ch.type === 'buy' ? '👤' : '💰'}</div><div class="chat-info"><div class="chat-name">${ch.sellerName || ch.buyerName || 'Покупатель'} — ${ch.carName}</div><div class="chat-preview">${lastMsg ? lastMsg.text : ''}</div></div><div class="chat-time">${ch.status === 'deal' ? '✅' : ''}</div></div>`;
    }).join('');
}
function openChatWindow(chatId) {
    activeChatId = chatId;
    const ch = GS.chats.find(c => c.id == chatId); if (!ch) return;
    document.getElementById('chatListContainer').style.display = 'none';
    document.getElementById('chatWindow').style.display = 'flex';
    document.getElementById('chatWindowTitle').textContent = ch.sellerName || ch.buyerName || 'Чат';
    renderChatMessages(ch);
    renderQuickReplies(ch);
}
function closeChatWindow() {
    document.getElementById('chatWindow').style.display = 'none';
    document.getElementById('chatListContainer').style.display = 'block';
    activeChatId = null;
}
function renderChatMessages(ch) {
    const c = document.getElementById('chatMessages');
    c.innerHTML = ch.messages.map(m => `<div class="chat-msg ${m.from === 'seller' || m.from === 'buyer' ? 'incoming' : m.from === 'system' ? 'system' : 'outgoing'}">${m.text}</div>`).join('');
    c.scrollTop = c.scrollHeight;
}
function renderQuickReplies(ch) {
    const qr = document.getElementById('chatQuickReplies');
    if (ch.status !== 'active') { qr.innerHTML = ''; return }
    if (ch.type === 'buy') {
        const discount5 = Math.round(ch.originalPrice * 0.95 / 1000) * 1000;
        const discount10 = Math.round(ch.originalPrice * 0.90 / 1000) * 1000;
        const discount20 = Math.round(ch.originalPrice * 0.80 / 1000) * 1000;
        qr.innerHTML = `<div class="quick-reply-btn" onclick="sendHaggleReply('small')">Скиньте немного (${fmtP(discount5)})</div><div class="quick-reply-btn" onclick="sendHaggleReply('medium')">Давайте за ${fmtP(discount10)}</div><div class="quick-reply-btn" onclick="sendHaggleReply('low')">Заберу за ${fmtP(discount20)}</div><div class="quick-reply-btn" onclick="sendHaggleReply('agree')">Беру за ${fmtP(ch.currentOffer)}</div>`;
    }
}
function sendHaggleReply(level) {
    const ch = GS.chats.find(c => c.id == activeChatId); if (!ch || ch.status !== 'active') return;
    let offer, reply, sellerReply, acceptChance;
    if (level === 'small') { offer = Math.round(ch.originalPrice * .95 / 1000) * 1000; reply = `Может скинете немного? Готов взять за ${fmtP(offer)}`; acceptChance = .15 }
    else if (level === 'medium') { offer = Math.round(ch.originalPrice * .90 / 1000) * 1000; reply = `Давайте за ${fmtP(offer)}, быстро оформим!`; acceptChance = .3 }
    else if (level === 'low') { offer = Math.round(ch.originalPrice * .80 / 1000) * 1000; reply = `Максимум ${fmtP(offer)}, у машины есть нюансы.`; acceptChance = .5 }
    else { offer = ch.currentOffer; reply = `Хорошо, беру за ${fmtP(offer)}!`; acceptChance = .95 }

    ch.messages.push({ from: 'me', text: reply });

    setTimeout(() => {
        const roll = Math.random();
        if (roll < acceptChance || level === 'agree') {
            ch.currentOffer = offer;
            ch.status = 'deal';
            ch.messages.push({ from: 'system', text: `Сделка! Цена: ${fmtP(offer)}` });
            ch.messages.push({ from: 'seller', text: 'Договорились! Приезжайте за машиной.' });
            // Actually buy
            const carIdx = GS.listings.findIndex(c => c.id == ch.carId);
            if (carIdx >= 0) {
                const car = GS.listings[carIdx];
                if (GS.balance >= offer) {
                    GS.balance -= offer;
                    if (!GS.currentGarageCity) GS.currentGarageCity = 'Москва';
                    GS.garage.push({ ...car, price: offer, isOwn: true, purchasePrice: offer, purchaseDate: GS.gameDay, garageCity: GS.currentGarageCity });
                    GS.transactions.unshift({ id: Date.now(), type: 'expense', name: `Покупка: ${car.brand} ${car.model} (торг)`, amount: offer, date: new Date().toISOString(), icon: '🚗' });
                    GS.listings.splice(carIdx, 1);
                    ch.messages.push({ from: 'system', text: `Вы купили ${car.brand} ${car.model} за ${fmtP(offer)}!` });
                    showToast(`${car.brand} ${car.model} куплен со скидкой! 🎉`, 'success');
                } else {
                    ch.messages.push({ from: 'system', text: 'Недостаточно средств!' });
                }
            }
        } else {
            const counter = Math.round((offer + ch.currentOffer) / 2 / 1000) * 1000;
            ch.currentOffer = Math.min(counter, ch.originalPrice);
            const responses = ['Нет, это слишком мало.', 'Маловато будет...', 'Я бы подумал, но нет.', 'Давайте встретимся посередине?'];
            sellerReply = responses[Math.random() * responses.length | 0] + ` Могу уступить до ${fmtP(ch.currentOffer)}.`;
            ch.messages.push({ from: 'seller', text: sellerReply });
        }
        saveGame(); renderChatMessages(ch); renderQuickReplies(ch); updateBalance(); renderListings();
    }, 800);
    saveGame(); renderChatMessages(ch);
}
function sendChatMsg() {
    const inp = document.getElementById('chatInput'); const txt = inp.value.trim(); if (!txt) return;
    const ch = GS.chats.find(c => c.id == activeChatId); if (!ch) return;
    ch.messages.push({ from: 'me', text: txt }); inp.value = ''; saveGame(); renderChatMessages(ch);
}
