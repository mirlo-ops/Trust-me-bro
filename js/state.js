// ===================== STATE =====================
let GS = { balance: 500000, garage: [], listings: [], transactions: [], favorites: [], notes: '', gameDay: 1, gameDate: new Date(2026, 8, 7).toISOString(), myListings: [], maxGarageSlots: 3, credits: [], chats: [], news: [], activeEffects: [], interfaceMode: 'auto', currentCity: 'Челябинск', gameTimeSeconds: 8 * 3600 }; // Старт в 08:00 (8 часов * 3600 секунд)

function loadGame() { const s = localStorage.getItem('carFlipGame2'); if (s) { GS = JSON.parse(s); GS.gameDate = new Date(GS.gameDate) } else { GS.gameDate = new Date(GS.gameDate) } }
function saveGame() { localStorage.setItem('carFlipGame2', JSON.stringify(GS)) }

// ===================== UTILS =====================
function fmtP(p) { return p.toLocaleString('ru-RU') + ' ₽' }
function showToast(msg, type = '') {
    const t = document.getElementById(currentMode === 'desktop' ? 'toastDesktop' : 'toast');
    t.textContent = msg; t.className = `toast ${type} show`;
    setTimeout(() => t.classList.remove('show'), 3000);
}
function resetGame() {
    if (confirm('Сбросить весь прогресс?')) {
        localStorage.removeItem('carFlipGame2'); location.reload();
    }
}
