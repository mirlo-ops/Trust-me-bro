// ===================== INIT =====================
function init() {
    loadGame();
    if (!GS.listings.length) generateListings();
    if (!GS.maxGarageSlots) GS.maxGarageSlots = 3;
    if (!GS.chats) GS.chats = [];
    if (!GS.news) GS.news = [];
    if (!GS.activeEffects) GS.activeEffects = [];
    if (!GS.credits) GS.credits = [];
    if (GS.gameTimeSeconds === undefined) GS.gameTimeSeconds = 0;
    if (!GS.currentGarageCity) GS.currentGarageCity = 'Москва';
    if (!GS.activeGarageTab) GS.activeGarageTab = 'myCars';
    buildPhoneGrid();
    detectMode();
    if (currentMode === 'desktop') buildDesktopUI();
    renderListings(); renderGarage(); renderTransactions(); updateBalance();
    updateGameTimeDisplay();
    startGameTimer();
    document.getElementById('currentCity').textContent = GS.currentCity || 'Челябинск';
    initBatteryAPI();
}
init();
