// ===================== INTERFACE MODE =====================
let currentMode = 'phone';
function detectMode() {
    if (GS.interfaceMode === 'phone') { currentMode = 'phone' }
    else if (GS.interfaceMode === 'desktop') { currentMode = 'desktop' }
    else { currentMode = window.innerWidth > 768 ? 'desktop' : 'phone' }
    applyMode();
}
function applyMode() {
    document.getElementById('phoneMode').style.display = currentMode === 'phone' ? 'block' : 'none';
    const dm = document.getElementById('desktopMode');
    if (currentMode === 'desktop') { dm.classList.add('active') } else { dm.classList.remove('active') }
    document.body.style.background = currentMode === 'desktop' ? '#000' : '#1a1a2e';
    const tgl = document.getElementById('interfaceToggle');
    const lbl = document.getElementById('interfaceModeLabel');
    if (currentMode === 'desktop') { tgl.classList.add('active'); lbl.textContent = 'macOS' } else { tgl.classList.remove('active'); lbl.textContent = 'Телефон' }
    // Обновляем батарею после смены режима
    updateBatteryUI(currentBatteryLevel, isCharging);
}
function toggleInterfaceMode() {
    if (currentMode === 'phone') {
        // Возвращаем все приложения из macOS-окон обратно в телефон
        document.querySelectorAll('.macos-window').forEach(w => {
            const id = w.id.replace('win-', '');
            returnAppToPhone(id);
        });
        document.getElementById('macosWindows').innerHTML = '';
        GS.interfaceMode = 'desktop'; currentMode = 'desktop';
    } else {
        GS.interfaceMode = 'phone'; currentMode = 'phone';
    }
    saveGame(); applyMode();
    if (currentMode === 'desktop') buildDesktopUI();
}
window.addEventListener('resize', () => { if (GS.interfaceMode === 'auto') detectMode() });

// ===================== DESKTOP UI =====================
function buildDesktopUI() {
    // Desktop icons
    const di = document.getElementById('macosDesktopIcons');
    di.innerHTML = appDefs.map(a => `<div class="macos-desktop-icon" onclick="openDesktopApp('${a.id}')">${a.iconImg ? `<div class="macos-desktop-icon-wrapper"><img src="${a.iconImg}" class="macos-desktop-icon-png"></div>` : `<div class="icon-img" style="background:${a.bg}">${a.icon}</div>`}<div class="icon-label">${a.label}</div></div>`).join('');
    // Dock
    const dk = document.getElementById('macosDock');
    const dockApps = ['avtobuy', 'garage', 'bank', 'maps', 'news', 'settings'];
    dk.innerHTML = dockApps.map(id => { const a = appDefs.find(x => x.id === id); return `<div class="dock-item" id="dock-${id}" onclick="openDesktopApp('${id}')">${a.iconImg ? `<div class="dock-icon-wrapper"><img src="${a.iconImg}" class="dock-icon-png"></div>` : `<div class="dock-icon-bg" style="background:${a.bg}">${a.icon}</div>`}<div class="dock-dot"></div></div>` }).join('') + '<div class="dock-separator"></div><div class="dock-item" onclick="openDesktopApp(\'notepad\')"><div class="dock-icon-bg" style="background:linear-gradient(135deg,#fbbf24,#f59e0b)">💡</div><div class="dock-dot"></div></div>';
    // Windows container
    document.getElementById('macosWindows').innerHTML = '';
}
function openDesktopApp(id) {
    const existing = document.getElementById('win-' + id);
    if (existing) { existing.style.display = 'flex'; bringToFront(existing); return }
    const a = appDefs.find(x => x.id === id); if (!a) return;
    const w = document.createElement('div');
    w.className = 'macos-window active'; w.id = 'win-' + id;
    w.style.cssText = `width:700px;height:520px;top:60px;left:${100 + Math.random() * 200}px;z-index:${200 + Math.random() * 100 | 0}`;
    w.innerHTML = `<div class="macos-window-titlebar" onmousedown="startDrag(event,'win-${id}')"><div class="macos-traffic-lights"><div class="macos-traffic-light tl-close" onclick="closeDesktopApp('${id}')"></div><div class="macos-traffic-light tl-minimize" onclick="document.getElementById('win-${id}').style.display='none'"></div><div class="macos-traffic-light tl-maximize"></div></div><div class="macos-window-title">${a.label}</div></div><div class="macos-window-body" id="winbody-${id}"></div>`;
    document.getElementById('macosWindows').appendChild(w);
    bringToFront(w);
    renderDesktopAppContent(id);
    const dockEl = document.getElementById('dock-' + id); if (dockEl) dockEl.classList.add('running');
    document.getElementById('macosActiveApp').textContent = a.label;
}
function closeDesktopApp(id) {
    const w = document.getElementById('win-' + id);
    if (w) {
        returnAppToPhone(id);
        w.remove();
    }
    const dockEl = document.getElementById('dock-' + id); if (dockEl) dockEl.classList.remove('running');
    document.getElementById('macosActiveApp').textContent = 'Finder';
}
function returnAppToPhone(id) {
    const app = document.getElementById(id + '-app');
    if (!app) return;
    // Сбрасываем стили macOS-окна
    app.style.position = '';
    app.style.transform = '';
    app.style.width = '';
    app.style.height = '';
    app.classList.remove('active');
    // Возвращаем в телефон
    document.getElementById('phoneScreen').appendChild(app);
}
function bringToFront(w) { document.querySelectorAll('.macos-window').forEach(x => x.style.zIndex = 100); w.style.zIndex = 500 }
let dragState = null;
function startDrag(e, winId) { const w = document.getElementById(winId); bringToFront(w); dragState = { el: w, ox: e.clientX - w.offsetLeft, oy: e.clientY - w.offsetTop }; e.preventDefault() }
document.addEventListener('mousemove', e => { if (!dragState) return; dragState.el.style.left = (e.clientX - dragState.ox) + 'px'; dragState.el.style.top = (e.clientY - dragState.oy) + 'px' });
document.addEventListener('mouseup', () => { dragState = null });

function renderDesktopAppContent(id) {
    const body = document.getElementById('winbody-' + id); if (!body) return;
    const phoneApp = document.getElementById(id + '-app');
    if (phoneApp) {
        // Перемещаем оригинальный элемент (не клонируем!)
        phoneApp.dataset.originalParent = 'phone';
        body.innerHTML = '';
        body.appendChild(phoneApp);
        // Рендерим контент
        if (id === 'avtobuy') { renderListings(); switchAvtoBuyTab('listings') }
        if (id === 'garage') renderGarage();
        if (id === 'bank') { renderTransactions(); updateBalance() }
        if (id === 'maps') renderMaps();
        if (id === 'news') renderNews();
        if (id === 'notepad') { document.getElementById('notepadText').value = GS.notes || '' }
        if (id === 'settings') {
            document.getElementById('statsInfo').textContent = GS.garage.length + ' авто';
            document.getElementById('gameDay').textContent = 'День ' + GS.gameDay;
        }
    } else {
        body.innerHTML = `<div class="decorative-screen"><div class="decorative-icon">${appDefs.find(x => x.id === id)?.icon || '📱'}</div><div class="decorative-text">Приложение</div></div>`;
    }
}
