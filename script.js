// ===================== DATA =====================
const carBrands=[
{brand:'TOYOTA',models:['CARINA','CAMRY','COROLLA','MARK II','CELICA']},
{brand:'BMW',models:['X5','E34','E39','E46','E60']},
{brand:'MERCEDES',models:['E-CLASS','C-CLASS','S-CLASS','GLE','CLK']},
{brand:'ЛАДА',models:['ПРИОРА','ГРАНТА','КАЛИНА','ВАЗ 2107','ВЕСТА']},
{brand:'AUDI',models:['A4','A6','A3','Q5','A8']},
{brand:'VOLKSWAGEN',models:['PASSAT','GOLF','POLO','JETTA','TIGUAN']},
{brand:'HONDA',models:['ACCORD','CIVIC','CR-V','FIT','LEGEND']},
{brand:'MAZDA',models:['3','6','CX-5','RX-7','CX-3']},
{brand:'NISSAN',models:['ALMERA','TEANA','X-TRAIL','SKYLINE','PATROL']},
{brand:'FORD',models:['FOCUS','MONDEO','FIESTA','KUGA','EXPLORER']},
{brand:'HYUNDAI',models:['SOLARIS','TUCSON','SONATA','CRETA','ELANTRA']},
{brand:'KIA',models:['RIO','SPORTAGE','CERATO','OPTIMA','SORENTO']},
{brand:'MITSUBISHI',models:['LANCER','OUTLANDER','PAJERO','ECLIPSE','ASX']},
{brand:'SUBARU',models:['IMPREZA','FORESTER','LEGACY','OUTBACK','WRX']},
{brand:'OPEL',models:['ASTRA','VECTRA','INSIGNIA','CORSA','MOKKA']}
];
const cities=['Челябинск','Уфа','Екатеринбург','Москва','Казань','Новосибирск','Самара','Пермь','Тюмень','Омск'];
const cityDistances={'Челябинск':0,'Уфа':420,'Екатеринбург':210,'Москва':1780,'Казань':950,'Новосибирск':1550,'Самара':880,'Пермь':560,'Тюмень':340,'Омск':920};
const sellers=['Алексей','Дмитрий','Сергей','Иван','Михаил','Андрей','Николай','Владимир','Олег','Артём'];
const conditions=['Требует ремонта','Хорошее','В идеале'];
const carPhotos=['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop','https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop','https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=250&fit=crop','https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=250&fit=crop','https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=250&fit=crop','https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop','https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop','https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop','https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=250&fit=crop','https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop'];

const newsEvents=[
{title:'Бензин подорожал на 15%',text:'Цены на топливо резко выросли. Спрос на малолитражки и экономичные авто увеличился.',badge:'important',effect:{type:'demand',brands:['ЛАДА','KIA','HYUNDAI'],multiplier:1.2}},
{title:'Новый налог на старые авто',text:'Правительство ввело повышенный налог на автомобили старше 20 лет. Цены на классику падают.',badge:'important',effect:{type:'price',maxYear:2006,multiplier:0.8}},
{title:'Курс доллара упал',text:'Иномарки стали доступнее. Ожидается снижение цен на BMW, Mercedes и Audi.',badge:'positive',effect:{type:'price',brands:['BMW','MERCEDES','AUDI'],multiplier:0.85}},
{title:'Зима близко: спрос на кроссоверы',text:'Сезонный рост спроса на полноприводные автомобили и кроссоверы.',badge:'info',effect:{type:'demand',models:['X5','CX-5','TUCSON','SPORTAGE','OUTLANDER','CR-V','PATROL','FORESTER'],multiplier:1.25}},
{title:'Такси-агрегатор расширяется',text:'Крупная компания закупает бюджетные авто. Спрос на Solaris, Rio, Polo вырос.',badge:'positive',effect:{type:'demand',models:['SOLARIS','RIO','POLO','GRANTA','LOGAN'],multiplier:1.3}},
{title:'Дефицит запчастей из-за санкций',text:'Цены на ремонт иномарок выросли. Состояние авто теперь важнее.',badge:'important',effect:{type:'condition_bonus',multiplier:1.15}},
{title:'Автосалон закрылся в Екатеринбурге',text:'Крупный дилер обанкротился. На рынок выброшено 200 авто — цены в регионе упали.',badge:'info',effect:{type:'city_price',city:'Екатеринбург',multiplier:0.8}},
{title:'Мода на JDM возвращается',text:'Праворульные японские авто снова в тренде. Toyota Mark II и Nissan Skyline дорожают.',badge:'positive',effect:{type:'demand',models:['MARK II','SKYLINE','CELICA','RX-7','IMPREZA','WRX','LEGEND'],multiplier:1.35}}
];

const appDefs=[
{id:'avtobuy',icon:'🚗',iconImg:'CarGO-icon.png',label:'CarGO',bg:'linear-gradient(135deg,#1a1a2e,#2d2d5e)'},
{id:'maps',icon:'📍',iconImg:'maps-icon.png',label:'Карты',bg:'linear-gradient(135deg,#22c55e,#16a34a)'},
{id:'garage',icon:'🏠',iconImg:'garage-icon.png',label:'Гараж',bg:'linear-gradient(135deg,#4a9eff,#2563eb)'},
{id:'bank',icon:'🟠',iconImg:'bank-icon.png',label:'ФинкБанк',bg:'linear-gradient(135deg,#ff8c00,#ea580c)'},
{id:'news',icon:'📰',iconImg:'news-icon.png',label:'Новости',bg:'linear-gradient(135deg,#dc2626,#b91c1c)'},
{id:'sleep',icon:'😴',iconImg:'sleep-icon.png',label:'Сон',bg:'linear-gradient(135deg,#6366f1,#4338ca)'},
{id:'calendar',icon:'📅',iconImg:'calendare-icon.png',label:'Календарь',bg:'white'},
{id:'realtor',icon:'📞',iconImg:'sobolev-house-icon.png',label:'Риелтор',bg:'linear-gradient(135deg,#06b6d4,#0891b2)'},
{id:'settings',icon:'⚙️',iconImg:'setting-icon.png',label:'Настройки',bg:'linear-gradient(135deg,#6b7280,#374151)'},
{id:'vpn',icon:'🌐',iconImg:'vpn-icon.png',label:'VPN',bg:'linear-gradient(135deg,#10b981,#059669)'},
{id:'notepad',icon:'💡',iconImg:'tips-icon.png',label:'Заметки',bg:'linear-gradient(135deg,#fbbf24,#f59e0b)'},
{id:'blocks',icon:'🧱',label:'В разработке',bg:'linear-gradient(135deg,#a855f7,#7c3aed)'}
];

// ===================== STATE =====================
let GS={balance:500000,garage:[],listings:[],transactions:[],favorites:[],notes:'',gameDay:1,gameDate:new Date(2026,8,7).toISOString(),myListings:[],maxGarageSlots:3,credits:[],chats:[],news:[],activeEffects:[],interfaceMode:'auto',currentCity:'Челябинск',gameTimeSeconds:8*3600}; // Старт в 08:00 (8 часов * 3600 секунд)

function loadGame(){const s=localStorage.getItem('carFlipGame2');if(s){GS=JSON.parse(s);GS.gameDate=new Date(GS.gameDate)}else{GS.gameDate=new Date(GS.gameDate)}}
function saveGame(){localStorage.setItem('carFlipGame2',JSON.stringify(GS))}

// ===================== INTERFACE MODE =====================
let currentMode='phone';
function detectMode(){
    if(GS.interfaceMode==='phone'){currentMode='phone'}
    else if(GS.interfaceMode==='desktop'){currentMode='desktop'}
    else{currentMode=window.innerWidth>768?'desktop':'phone'}
    applyMode();
}
function applyMode(){
    document.getElementById('phoneMode').style.display=currentMode==='phone'?'block':'none';
    const dm=document.getElementById('desktopMode');
    if(currentMode==='desktop'){dm.classList.add('active')}else{dm.classList.remove('active')}
    document.body.style.background=currentMode==='desktop'?'#000':'#1a1a2e';
    const tgl=document.getElementById('interfaceToggle');
    const lbl=document.getElementById('interfaceModeLabel');
    if(currentMode==='desktop'){tgl.classList.add('active');lbl.textContent='macOS'}else{tgl.classList.remove('active');lbl.textContent='Телефон'}
    // Обновляем батарею после смены режима
    updateBatteryUI(currentBatteryLevel, isCharging);
}
function toggleInterfaceMode(){
    if(currentMode==='phone'){
        // Возвращаем все приложения из macOS-окон обратно в телефон
        document.querySelectorAll('.macos-window').forEach(w=>{
            const id=w.id.replace('win-','');
            returnAppToPhone(id);
        });
        document.getElementById('macosWindows').innerHTML='';
        GS.interfaceMode='desktop';currentMode='desktop';
    }else{
        GS.interfaceMode='phone';currentMode='phone';
    }
    saveGame();applyMode();
    if(currentMode==='desktop')buildDesktopUI();
}
window.addEventListener('resize',()=>{if(GS.interfaceMode==='auto')detectMode()});

// ===================== DESKTOP UI =====================
function buildDesktopUI(){
    // Desktop icons
    const di=document.getElementById('macosDesktopIcons');
    di.innerHTML=appDefs.map(a=>`<div class="macos-desktop-icon" onclick="openDesktopApp('${a.id}')">${a.iconImg ? `<div class="macos-desktop-icon-wrapper"><img src="${a.iconImg}" class="macos-desktop-icon-png"></div>` : `<div class="icon-img" style="background:${a.bg}">${a.icon}</div>`}<div class="icon-label">${a.label}</div></div>`).join('');
    // Dock
    const dk=document.getElementById('macosDock');
    const dockApps=['avtobuy','garage','bank','maps','news','settings'];
    dk.innerHTML=dockApps.map(id=>{const a=appDefs.find(x=>x.id===id);return`<div class="dock-item" id="dock-${id}" onclick="openDesktopApp('${id}')">${a.iconImg ? `<div class="dock-icon-wrapper"><img src="${a.iconImg}" class="dock-icon-png"></div>` : `<div class="dock-icon-bg" style="background:${a.bg}">${a.icon}</div>`}<div class="dock-dot"></div></div>`}).join('')+'<div class="dock-separator"></div><div class="dock-item" onclick="openDesktopApp(\'notepad\')"><div class="dock-icon-bg" style="background:linear-gradient(135deg,#fbbf24,#f59e0b)">💡</div><div class="dock-dot"></div></div>';
    // Windows container
    document.getElementById('macosWindows').innerHTML='';
}
function openDesktopApp(id){
    const existing=document.getElementById('win-'+id);
    if(existing){existing.style.display='flex';bringToFront(existing);return}
    const a=appDefs.find(x=>x.id===id);if(!a)return;
    const w=document.createElement('div');
    w.className='macos-window active';w.id='win-'+id;
    w.style.cssText=`width:700px;height:520px;top:60px;left:${100+Math.random()*200}px;z-index:${200+Math.random()*100|0}`;
    w.innerHTML=`<div class="macos-window-titlebar" onmousedown="startDrag(event,'win-${id}')"><div class="macos-traffic-lights"><div class="macos-traffic-light tl-close" onclick="closeDesktopApp('${id}')"></div><div class="macos-traffic-light tl-minimize" onclick="document.getElementById('win-${id}').style.display='none'"></div><div class="macos-traffic-light tl-maximize"></div></div><div class="macos-window-title">${a.label}</div></div><div class="macos-window-body" id="winbody-${id}"></div>`;
    document.getElementById('macosWindows').appendChild(w);
    bringToFront(w);
    renderDesktopAppContent(id);
    const dockEl=document.getElementById('dock-'+id);if(dockEl)dockEl.classList.add('running');
    document.getElementById('macosActiveApp').textContent=a.label;
}
function closeDesktopApp(id){
    const w=document.getElementById('win-'+id);
    if(w){
        returnAppToPhone(id);
        w.remove();
    }
    const dockEl=document.getElementById('dock-'+id);if(dockEl)dockEl.classList.remove('running');
    document.getElementById('macosActiveApp').textContent='Finder';
}
function returnAppToPhone(id){
    const app=document.getElementById(id+'-app');
    if(!app)return;
    // Сбрасываем стили macOS-окна
    app.style.position='';
    app.style.transform='';
    app.style.width='';
    app.style.height='';
    app.classList.remove('active');
    // Возвращаем в телефон
    document.getElementById('phoneScreen').appendChild(app);
}
function bringToFront(w){document.querySelectorAll('.macos-window').forEach(x=>x.style.zIndex=100);w.style.zIndex=500}
let dragState=null;
function startDrag(e,winId){const w=document.getElementById(winId);bringToFront(w);dragState={el:w,ox:e.clientX-w.offsetLeft,oy:e.clientY-w.offsetTop};e.preventDefault()}
document.addEventListener('mousemove',e=>{if(!dragState)return;dragState.el.style.left=(e.clientX-dragState.ox)+'px';dragState.el.style.top=(e.clientY-dragState.oy)+'px'});
document.addEventListener('mouseup',()=>{dragState=null});

function renderDesktopAppContent(id){
    const body=document.getElementById('winbody-'+id);if(!body)return;
    const phoneApp=document.getElementById(id+'-app');
    if(phoneApp){
        // Перемещаем оригинальный элемент (не клонируем!)
        phoneApp.dataset.originalParent='phone';
        body.innerHTML='';
        body.appendChild(phoneApp);
        // Рендерим контент
        if(id==='avtobuy'){renderListings();switchAvtoBuyTab('listings')}
        if(id==='garage')renderGarage();
        if(id==='bank'){renderTransactions();updateBalance()}
        if(id==='maps')renderMaps();
        if(id==='news')renderNews();
        if(id==='notepad'){document.getElementById('notepadText').value=GS.notes||''}
        if(id==='settings'){
            document.getElementById('statsInfo').textContent=GS.garage.length+' авто';
            document.getElementById('gameDay').textContent='День '+GS.gameDay;
        }
    } else {
        body.innerHTML=`<div class="decorative-screen"><div class="decorative-icon">${appDefs.find(x=>x.id===id)?.icon||'📱'}</div><div class="decorative-text">Приложение</div></div>`;
    }
}
// ===================== PHONE APP GRID =====================
function buildPhoneGrid(){
    document.getElementById('phoneAppGrid').innerHTML=appDefs.map(a=>`<div class="app-icon" onclick="openApp('${a.id}')">${a.iconImg ? `<div class="app-icon-wrapper"><img src="${a.iconImg}" class="app-icon-png"></div>` : `<div class="app-icon-img" style="background:${a.bg}">${a.icon}</div>`}<span class="app-icon-label">${a.label}</span></div>`).join('');
}

// ===================== APP NAVIGATION =====================
function openApp(id){
    // Если приложение сейчас в macOS-окне — закрываем окно и возвращаем в телефон
    const macosWin=document.getElementById('win-'+id);
    if(macosWin){
        returnAppToPhone(id);
        macosWin.remove();
        const dockEl=document.getElementById('dock-'+id);if(dockEl)dockEl.classList.remove('running');
    }
    const app=document.getElementById(id+'-app');if(app)app.classList.add('active');
    if(id==='avtobuy'){renderListings();switchAvtoBuyTab('listings')}
    if(id==='garage')renderGarage();
    if(id==='bank'){renderTransactions();updateBalance()}
    if(id==='maps')renderMaps();
    if(id==='news')renderNews();
    if(id==='notepad')document.getElementById('notepadText').value=GS.notes||'';
    if(id==='settings'){
        document.getElementById('statsInfo').textContent=GS.garage.length+' авто';
        document.getElementById('gameDay').textContent='День '+GS.gameDay;
        applyMode();
    }
}
function closeApp(id){
    const app=document.getElementById(id+'-app');if(app)app.classList.remove('active');
    if(id==='notepad'){GS.notes=document.getElementById('notepadText').value;saveGame()}
}

// ===================== AVTOBUY TABS =====================
let avtoBuyTab='listings';
function switchAvtoBuyTab(tab){
    avtoBuyTab=tab;
    document.getElementById('listingsContainer').style.display=tab==='listings'?'block':'none';
    document.getElementById('chatListContainer').style.display=tab==='chat'?'block':'none';
    document.getElementById('chatWindow').style.display='none';
    document.getElementById('tabListings').classList.toggle('active',tab==='listings');
    document.getElementById('tabChat').classList.toggle('active',tab==='chat');
    document.getElementById('tabFavorites').classList.remove('active');
    if(tab==='chat')renderChatList();
    if(tab==='listings')renderListings();
}

// ===================== CAR GENERATION =====================
function generateCar(){
    const bd=carBrands[Math.random()*carBrands.length|0];
    const model=bd.models[Math.random()*bd.models.length|0];
    const year=1985+(Math.random()*40|0);
    const mileage=Math.random()*500+10|0;
    const ci=year<2000?Math.random()*2|0:Math.random()*3|0;
    const condition=conditions[ci];
    let bp=200000+(2026-year)*-3000+Math.random()*100000;
    if(condition==='Требует ремонта')bp*=.5;
    if(condition==='В идеале')bp*=1.3;
    if(bd.brand==='BMW'||bd.brand==='MERCEDES')bp*=1.5;
    if(bd.brand==='ЛАДА')bp*=.4;
    // Apply active effects
    GS.activeEffects.forEach(e=>{
        if(e.type==='price'){
            if(e.brands&&e.brands.includes(bd.brand))bp*=e.multiplier;
            if(e.maxYear&&year<=e.maxYear)bp*=e.multiplier;
        }
        if(e.type==='demand'&&e.brands&&e.brands.includes(bd.brand))bp*=e.multiplier;
        if(e.type==='demand'&&e.models&&e.models.includes(model))bp*=e.multiplier;
        if(e.type==='city_price'&&e.city===GS.currentCity)bp*=e.multiplier;
    });
    const price=Math.round(bp/1000)*1000;
    return{id:Date.now()+Math.random(),brand:bd.brand,model,year,mileage,condition,price,city:cities[Math.random()*cities.length|0],seller:sellers[Math.random()*sellers.length|0],photo:carPhotos[Math.random()*carPhotos.length|0],photoCount:(Math.random()*12|0)+3,views:(Math.random()*500|0)+10,daysAgo:(Math.random()*30|0)+1,isOwn:false};
}
function generateListings(){GS.listings=[];for(let i=0;i<15;i++)GS.listings.push(generateCar());saveGame()}

// ===================== LISTINGS =====================
function renderListings(){
    const c=document.getElementById('listingsContainer');if(!c)return;
    const search=(document.getElementById('searchInput')?.value||'').toLowerCase();
    let f=GS.listings.filter(l=>!l.isOwn);
    if(search)f=f.filter(l=>`${l.brand} ${l.model}`.toLowerCase().includes(search)||l.city.toLowerCase().includes(search));
    c.innerHTML=f.map(car=>`<div class="listing-card" onclick="showCarDetail('${car.id}',false)"><div class="listing-photo"><img src="${car.photo}" alt="" loading="lazy"><div class="listing-photo-count">📷 ${car.photoCount}</div><div class="listing-favorite ${GS.favorites.includes(car.id)?'active':''}" onclick="event.stopPropagation();toggleFavorite('${car.id}')">${GS.favorites.includes(car.id)?'❤️':'🤍'}</div></div><div class="listing-info"><div class="listing-price">${fmtP(car.price)}</div><div class="listing-title">${car.brand} ${car.model}</div><div class="listing-details">${car.year} г. • ${car.mileage} тыс км</div><div class="listing-location">📍 ${car.city}</div><div class="listing-seller">${car.seller} • Частное лицо</div><div class="listing-meta"><span>${car.daysAgo===1?'Вчера':car.daysAgo+' дн. назад'}</span><span class="listing-views">👁 ${car.views}</span></div></div></div>`).join('');
}
function filterListings(){renderListings()}
function toggleFavorite(id){const i=GS.favorites.indexOf(id);if(i>=0)GS.favorites.splice(i,1);else GS.favorites.push(id);saveGame();renderListings()}
function showFavorites(){
    document.getElementById('tabFavorites').classList.add('active');
    document.getElementById('tabListings').classList.remove('active');
    document.getElementById('tabChat').classList.remove('active');
    document.getElementById('chatListContainer').style.display='none';
    document.getElementById('chatWindow').style.display='none';
    const c=document.getElementById('listingsContainer');c.style.display='block';
    const fav=GS.listings.filter(l=>GS.favorites.includes(l.id));
    if(!fav.length){c.innerHTML='<div style="text-align:center;padding:40px;color:#666">Нет избранных</div>';return}
    c.innerHTML=fav.map(car=>`<div class="listing-card" onclick="showCarDetail('${car.id}',false)"><div class="listing-photo"><img src="${car.photo}" alt="" loading="lazy"><div class="listing-favorite active" onclick="event.stopPropagation();toggleFavorite('${car.id}')">❤️</div></div><div class="listing-info"><div class="listing-price">${fmtP(car.price)}</div><div class="listing-title">${car.brand} ${car.model}</div><div class="listing-details">${car.year} г. • ${car.mileage} тыс км</div><div class="listing-location">📍 ${car.city}</div></div></div>`).join('');
}

// ===================== CAR DETAIL =====================
function showCarDetail(id,isOwn){
    const car=isOwn?GS.garage.find(c=>c.id==id):GS.listings.find(c=>c.id==id);if(!car)return;
    const cc=car.condition==='В идеале'?'condition-ideal':car.condition==='Хорошее'?'condition-good':'condition-repair';
    let acts='';
    if(!isOwn&&!car.isOwn){
        acts=`<div class="modal-actions"><button class="btn btn-secondary dark" onclick="closeModal()">Закрыть</button><button class="btn btn-warning" onclick="startHaggle('${car.id}')">Торг</button><button class="btn btn-success" onclick="buyCar('${car.id}')">Купить</button></div>`;
    }else{
        acts=`<div class="modal-actions"><button class="btn btn-secondary dark" onclick="closeModal()">Закрыть</button><button class="btn btn-warning" onclick="showRepairModal('${car.id}')">Ремонт</button><button class="btn btn-primary" onclick="showSellOwnModal('${car.id}')">Продать</button></div>`;
    }
    const m=document.getElementById('modalContent');m.className='modal-content dark';
    m.innerHTML=`<div class="modal-header dark"><span style="font-weight:700">Подробности</span><div class="modal-close dark" onclick="closeModal()">✕</div></div><div class="modal-body"><div class="modal-car-photo"><img src="${car.photo}" alt=""></div><div class="modal-car-title">${car.brand} ${car.model}</div><div class="modal-car-price">${fmtP(car.price)}</div><div class="modal-car-specs"><div class="spec-item dark"><div class="spec-label">Год</div><div class="spec-value">${car.year}</div></div><div class="spec-item dark"><div class="spec-label">Пробег</div><div class="spec-value">${car.mileage} тыс км</div></div><div class="spec-item dark"><div class="spec-label">Состояние</div><div class="spec-value ${cc}">${car.condition}</div></div><div class="spec-item dark"><div class="spec-label">Город</div><div class="spec-value">${car.city}</div></div></div>${!isOwn&&!car.isOwn?`<div style="margin-top:8px;font-size:13px;color:#888"><div>👤 ${car.seller} • Частное лицо</div><div style="margin-top:4px">📅 ${car.daysAgo===1?'Вчера':car.daysAgo+' дн. назад'} • 👁 ${car.views}</div></div>`:''}${acts}</div>`;
    document.getElementById('modalOverlay').classList.add('active');
}
function closeModal(){document.getElementById('modalOverlay').classList.remove('active')}
document.getElementById('modalOverlay').addEventListener('click',function(e){if(e.target===this)closeModal()});

// ===================== HAGGLE / CHAT SYSTEM =====================
function startHaggle(carId){
    const car=GS.listings.find(c=>c.id==carId);if(!car)return;
    closeModal();
    // Create or find chat
    let chat=GS.chats.find(ch=>ch.carId==carId&&ch.type==='buy');
    if(!chat){
        chat={id:Date.now(),carId,type:'buy',sellerName:car.seller,carName:car.brand+' '+car.model,originalPrice:car.price,currentOffer:car.price,messages:[
            {from:'seller',text:`Здравствуйте! Продаю ${car.brand} ${car.model} ${car.year} г. Цена ${fmtP(car.price)}. Интересует?`},
        ],status:'active'};
        GS.chats.push(chat);saveGame();
    }
    switchAvtoBuyTab('chat');
    setTimeout(()=>openChatWindow(chat.id),100);
}
function renderChatList(){
    const c=document.getElementById('chatListContainer');if(!c)return;
    if(!GS.chats.length){c.innerHTML='<div style="text-align:center;padding:40px;color:#666">Нет чатов. Начните торг с продавцом!</div>';return}
    c.innerHTML=GS.chats.map(ch=>{
        const lastMsg=ch.messages[ch.messages.length-1];
        return`<div class="chat-item" onclick="openChatWindow('${ch.id}')"><div class="chat-avatar">${ch.type==='buy'?'👤':'💰'}</div><div class="chat-info"><div class="chat-name">${ch.sellerName||ch.buyerName||'Покупатель'} — ${ch.carName}</div><div class="chat-preview">${lastMsg?lastMsg.text:''}</div></div><div class="chat-time">${ch.status==='deal'?'✅':''}</div></div>`;
    }).join('');
}
let activeChatId=null;
function openChatWindow(chatId){
    activeChatId=chatId;
    const ch=GS.chats.find(c=>c.id==chatId);if(!ch)return;
    document.getElementById('chatListContainer').style.display='none';
    document.getElementById('chatWindow').style.display='flex';
    document.getElementById('chatWindowTitle').textContent=ch.sellerName||ch.buyerName||'Чат';
    renderChatMessages(ch);
    renderQuickReplies(ch);
}
function closeChatWindow(){
    document.getElementById('chatWindow').style.display='none';
    document.getElementById('chatListContainer').style.display='block';
    activeChatId=null;
}
function renderChatMessages(ch){
    const c=document.getElementById('chatMessages');
    c.innerHTML=ch.messages.map(m=>`<div class="chat-msg ${m.from==='seller'||m.from==='buyer'?'incoming':m.from==='system'?'system':'outgoing'}">${m.text}</div>`).join('');
    c.scrollTop=c.scrollHeight;
}
function renderQuickReplies(ch){
    const qr=document.getElementById('chatQuickReplies');
    if(ch.status!=='active'){qr.innerHTML='';return}
    if(ch.type==='buy'){
        const discount5=Math.round(ch.originalPrice*0.95/1000)*1000;
        const discount10=Math.round(ch.originalPrice*0.90/1000)*1000;
        const discount20=Math.round(ch.originalPrice*0.80/1000)*1000;
        qr.innerHTML=`<div class="quick-reply-btn" onclick="sendHaggleReply('small')">Скиньте немного (${fmtP(discount5)})</div><div class="quick-reply-btn" onclick="sendHaggleReply('medium')">Давайте за ${fmtP(discount10)}</div><div class="quick-reply-btn" onclick="sendHaggleReply('low')">Заберу за ${fmtP(discount20)}</div><div class="quick-reply-btn" onclick="sendHaggleReply('agree')">Беру за ${fmtP(ch.currentOffer)}</div>`;
    }
}
function sendHaggleReply(level){
    const ch=GS.chats.find(c=>c.id==activeChatId);if(!ch||ch.status!=='active')return;
    let offer,reply,sellerReply,acceptChance;
    if(level==='small'){offer=Math.round(ch.originalPrice*.95/1000)*1000;reply=`Может скинете немного? Готов взять за ${fmtP(offer)}`;acceptChance=.15}
    else if(level==='medium'){offer=Math.round(ch.originalPrice*.90/1000)*1000;reply=`Давайте за ${fmtP(offer)}, быстро оформим!`;acceptChance=.3}
    else if(level==='low'){offer=Math.round(ch.originalPrice*.80/1000)*1000;reply=`Максимум ${fmtP(offer)}, у машины есть нюансы.`;acceptChance=.5}
    else{offer=ch.currentOffer;reply=`Хорошо, беру за ${fmtP(offer)}!`;acceptChance=.95}

    ch.messages.push({from:'me',text:reply});

    setTimeout(()=>{
        const roll=Math.random();
        if(roll<acceptChance||level==='agree'){
            ch.currentOffer=offer;
            ch.status='deal';
            ch.messages.push({from:'system',text:`Сделка! Цена: ${fmtP(offer)}`});
            ch.messages.push({from:'seller',text:'Договорились! Приезжайте за машиной.'});
            // Actually buy
            const carIdx=GS.listings.findIndex(c=>c.id==ch.carId);
            if(carIdx>=0){
                const car=GS.listings[carIdx];
                if(GS.balance>=offer){
                    GS.balance-=offer;
                    if(!GS.currentGarageCity)GS.currentGarageCity='Москва';
                    GS.garage.push({...car,price:offer,isOwn:true,purchasePrice:offer,purchaseDate:GS.gameDay,garageCity:GS.currentGarageCity});
                    GS.transactions.unshift({id:Date.now(),type:'expense',name:`Покупка: ${car.brand} ${car.model} (торг)`,amount:offer,date:new Date().toISOString(),icon:'🚗'});
                    GS.listings.splice(carIdx,1);
                    ch.messages.push({from:'system',text:`Вы купили ${car.brand} ${car.model} за ${fmtP(offer)}!`});
                    showToast(`${car.brand} ${car.model} куплен со скидкой! 🎉`,'success');
                }else{
                    ch.messages.push({from:'system',text:'Недостаточно средств!'});
                }
            }
        }else{
            const counter=Math.round((offer+ch.currentOffer)/2/1000)*1000;
            ch.currentOffer=Math.min(counter,ch.originalPrice);
            const responses=['Нет, это слишком мало.','Маловато будет...','Я бы подумал, но нет.','Давайте встретимся посередине?'];
            sellerReply=responses[Math.random()*responses.length|0]+` Могу уступить до ${fmtP(ch.currentOffer)}.`;
            ch.messages.push({from:'seller',text:sellerReply});
        }
        saveGame();renderChatMessages(ch);renderQuickReplies(ch);updateBalance();renderListings();
    },800);
    saveGame();renderChatMessages(ch);
}
function sendChatMsg(){
    const inp=document.getElementById('chatInput');const txt=inp.value.trim();if(!txt)return;
    const ch=GS.chats.find(c=>c.id==activeChatId);if(!ch)return;
    ch.messages.push({from:'me',text:txt});inp.value='';saveGame();renderChatMessages(ch);
}

// ===================== BUY CAR =====================
function buyCar(id){
    const ci=GS.listings.findIndex(c=>c.id==id);if(ci<0)return;
    const car=GS.listings[ci];
    if(GS.garage.length>=GS.maxGarageSlots){showToast('Гараж полон! Купите больше мест.','error');return}
    if(GS.balance<car.price){showToast('Недостаточно средств!','error');return}
    GS.balance-=car.price;
    // Инициализация currentGarageCity если нет
    if(!GS.currentGarageCity)GS.currentGarageCity='Москва';
    GS.garage.push({...car,isOwn:true,purchasePrice:car.price,purchaseDate:GS.gameDay,garageCity:GS.currentGarageCity});
    GS.transactions.unshift({id:Date.now(),type:'expense',name:`Покупка: ${car.brand} ${car.model}`,amount:car.price,date:new Date().toISOString(),icon:'🚗'});
    GS.listings.splice(ci,1);saveGame();closeModal();renderListings();updateBalance();renderTransactions();renderGarage();
    showToast(`${car.brand} ${car.model} куплен! 🎉`,'success');
}

// ===================== SELL =====================
function showSellModal(){
    if(!GS.garage.length){showToast('У вас нет машин для продажи','error');return}
    const m=document.getElementById('modalContent');m.className='modal-content';
    m.innerHTML=`<div class="modal-header"><span style="font-weight:700">Подать объявление</span><div class="modal-close" onclick="closeModal()">✕</div></div><div class="sell-form"><label>Автомобиль</label><select id="sellCarSelect">${GS.garage.map(c=>`<option value="${c.id}">${c.brand} ${c.model} ${c.year}</option>`).join('')}</select><label>Цена (₽)</label><input type="number" id="sellPrice" placeholder="Цена"><label>Город</label><select id="sellCity">${cities.map(c=>`<option value="${c}">${c}</option>`).join('')}</select><button class="btn btn-primary" onclick="submitListing()" style="width:100%;margin-top:8px">Опубликовать</button></div>`;
    document.getElementById('sellCarSelect').addEventListener('change',function(){const car=GS.garage.find(c=>c.id==this.value);if(car){let s=car.price;if(car.condition==='В идеале')s*=1.2;if(car.condition==='Требует ремонта')s*=.8;document.getElementById('sellPrice').value=Math.round(s/1000)*1000}});
    const fc=GS.garage[0];if(fc)document.getElementById('sellPrice').value=Math.round(fc.price/1000)*1000;
    document.getElementById('modalOverlay').classList.add('active');
}
function showSellOwnModal(carId){
    const car=GS.garage.find(c=>c.id==carId);if(!car)return;
    const m=document.getElementById('modalContent');m.className='modal-content';
    m.innerHTML=`<div class="modal-header"><span style="font-weight:700">Продать ${car.brand} ${car.model}</span><div class="modal-close" onclick="closeModal()">✕</div></div><div class="sell-form"><label>Цена (₽)</label><input type="number" id="sellPrice" value="${Math.round(car.price*1.15/1000)*1000}"><label>Город</label><select id="sellCity">${cities.map(c=>`<option value="${c}" ${c===car.city?'selected':''}>${c}</option>`).join('')}</select><button class="btn btn-primary" onclick="submitOwnListing('${car.id}')" style="width:100%;margin-top:8px">Опубликовать</button></div>`;
    document.getElementById('modalOverlay').classList.add('active');
}
function submitListing(){
    const carId=document.getElementById('sellCarSelect').value;
    const price=parseInt(document.getElementById('sellPrice').value);
    const city=document.getElementById('sellCity').value;
    if(!price||price<=0){showToast('Укажите цену','error');return}
    const ci=GS.garage.findIndex(c=>c.id==carId);if(ci<0)return;
    const car=GS.garage[ci];
    const listing={...car,id:Date.now()+Math.random(),price,city,seller:'Вы',isOwn:true,daysAgo:0,views:0,photoCount:(Math.random()*8|0)+3};
    GS.listings.push(listing);GS.myListings.push({listingId:listing.id,carId:car.id});GS.garage.splice(ci,1);
    saveGame();closeModal();renderListings();renderGarage();showToast('Объявление опубликовано! 📋','success');
}
function submitOwnListing(carId){
    const price=parseInt(document.getElementById('sellPrice').value);
    const city=document.getElementById('sellCity').value;
    if(!price||price<=0){showToast('Укажите цену','error');return}
    const ci=GS.garage.findIndex(c=>c.id==carId);if(ci<0)return;
    const car=GS.garage[ci];
    const listing={...car,id:Date.now()+Math.random(),price,city,seller:'Вы',isOwn:true,daysAgo:0,views:0,photoCount:(Math.random()*8|0)+3};
    GS.listings.push(listing);GS.myListings.push({listingId:listing.id,carId:car.id});GS.garage.splice(ci,1);
    saveGame();closeModal();renderListings();renderGarage();showToast('Объявление опубликовано! 📋','success');
}

// ===================== REPAIR =====================
function showRepairModal(carId){
    const car=GS.garage.find(c=>c.id==carId);if(!car)return;
    const m=document.getElementById('modalContent');m.className='modal-content';
    m.innerHTML=`<div class="modal-header"><span style="font-weight:700">Ремонт: ${car.brand} ${car.model}</span><div class="modal-close" onclick="closeModal()">✕</div></div><div class="repair-options"><div class="repair-option" onclick="repairCar('${car.id}','minor')"><div class="repair-option-title">🔧 Мелкий ремонт</div><div class="repair-option-desc">Замена расходников, ТО</div><div class="repair-option-price">${fmtP(Math.round(car.price*.05/1000)*1000)}</div></div><div class="repair-option" onclick="repairCar('${car.id}','medium')"><div class="repair-option-title">🛠 Средний ремонт</div><div class="repair-option-desc">Замена деталей, покраска</div><div class="repair-option-price">${fmtP(Math.round(car.price*.12/1000)*1000)}</div></div><div class="repair-option" onclick="repairCar('${car.id}','major')"><div class="repair-option-title">🏗 Капитальный ремонт</div><div class="repair-option-desc">Полное восстановление</div><div class="repair-option-price">${fmtP(Math.round(car.price*.25/1000)*1000)}</div></div></div>`;
    document.getElementById('modalOverlay').classList.add('active');
}
function repairCar(carId,level){
    const car=GS.garage.find(c=>c.id==carId);if(!car)return;
    let cost,nc;
    if(level==='minor'){cost=Math.round(car.price*.05/1000)*1000;nc=car.condition==='Требует ремонта'?'Хорошее':car.condition}
    else if(level==='medium'){cost=Math.round(car.price*.12/1000)*1000;nc=car.condition==='Требует ремонта'?'Хорошее':'В идеале'}
    else{cost=Math.round(car.price*.25/1000)*1000;nc='В идеале'}
    if(GS.balance<cost){showToast('Недостаточно средств!','error');return}
    GS.balance-=cost;car.condition=nc;car.price=Math.round(car.price*(level==='minor'?1.08:level==='medium'?1.18:1.3)/1000)*1000;
    GS.transactions.unshift({id:Date.now(),type:'expense',name:`Ремонт: ${car.brand} ${car.model}`,amount:cost,date:new Date().toISOString(),icon:'🔧'});
    saveGame();closeModal();renderGarage();updateBalance();renderTransactions();showToast(`Ремонт завершён! Состояние: ${nc}`,'success');
}

// ===================== GARAGE =====================
function renderGarage(){
    const c=document.getElementById('garageList');if(!c)return;
    const si=document.getElementById('garageSlotsInfo');
    const cs=document.getElementById('garageCitySelector');
    
    // Инициализация currentGarageCity если нет
    if(!GS.currentGarageCity)GS.currentGarageCity='Москва';
    if(!GS.activeGarageTab)GS.activeGarageTab='myCars';
    
    // Обновление информации о местах (без кнопки покупки)
    if(si)si.innerHTML=`<span>Мест: <strong>${GS.garage.length}/${GS.maxGarageSlots}</strong></span>`;
    
    // Рендер селектора городов
    if(cs){
        const citiesWithCars=[...new Set(GS.garage.map(c=>c.garageCity||'Москва'))];
        if(!citiesWithCars.includes('Москва'))citiesWithCars.unshift('Москва');
        cs.innerHTML=citiesWithCars.map(city=>`<button class="garage-city-btn ${city===GS.currentGarageCity?'active':''}" onclick="changeGarageCity('${city}')">${city}</button>`).join('');
    }
    
    // Рендер в зависимости от активной вкладки
    if(GS.activeGarageTab==='myCars'){
        renderMyCarsTab(c);
    }else{
        renderParkingSlotsTab(c);
    }
}

function switchGarageTab(tab){
    GS.activeGarageTab=tab;
    document.querySelectorAll('.garage-tab').forEach(t=>t.classList.remove('active'));
    event.target.classList.add('active');
    renderGarage();
}

function changeGarageCity(city){
    GS.currentGarageCity=city;
    renderGarage();
}

function getGarageSlotNumber(car){
    const idx=GS.garage.findIndex(c=>c.id===car.id);
    return `Место #${idx+1}`;
}

function renderMyCarsTab(container){
    const carsInCity=GS.garage.filter(c=>(c.garageCity||'Москва')===GS.currentGarageCity);
    
    if(!carsInCity.length){
        container.innerHTML='<div class="garage-empty"><div class="garage-empty-icon">🚗</div><div>Гараж пуст</div><div style="font-size:13px;margin-top:8px;color:#aaa">В этом городе нет машин. Купите машину на AvtoBuy или выберите другой город.</div></div>';
        return;
    }
    
    container.innerHTML=carsInCity.map((car,idx)=>{
        const cc=car.condition==='В идеале'?'condition-ideal':car.condition==='Хорошее'?'condition-good':'condition-repair';
        const slotNum=getGarageSlotNumber(car);
        return`<div class="garage-card" onclick="showCarDetail('${car.id}',true)"><div class="garage-car-photo"><img src="${car.photo}" alt="" loading="lazy"></div><div class="garage-car-info"><div class="garage-car-name">${car.brand} ${car.model}</div><div class="garage-car-details">${car.year} г. • ${car.mileage} тыс км</div><div class="garage-car-condition ${cc}">${car.condition}</div><div class="garage-slot-number">${slotNum}</div></div></div>`;
    }).join('');
}

function renderParkingSlotsTab(container){
    if(!GS.garage.length){
        container.innerHTML='<div class="garage-empty"><div class="garage-empty-icon">🚗</div><div>У вас нет автомобилей</div><div style="font-size:13px;margin-top:8px;color:#aaa">Купите машину на AvtoBuy</div></div>';
        return;
    }
    
    // Группировка по городам
    const grouped={};
    GS.garage.forEach(car=>{
        const city=car.garageCity||'Москва';
        if(!grouped[city])grouped[city]=[];
        grouped[city].push(car);
    });
    
    let html='';
    for(const city in grouped){
        const cars=grouped[city];
        html+=`<div class="garage-parking-group"><div class="garage-parking-title">📍 ${city} (${cars.length} ${cars.length===1?'машина':'машины'})</div>`;
        cars.forEach(car=>{
            const cc=car.condition==='В идеале'?'condition-ideal':car.condition==='Хорошее'?'condition-good':'condition-repair';
            const slotNum=getGarageSlotNumber(car);
            html+=`<div class="garage-card" onclick="showCarDetail('${car.id}',true)"><div class="garage-car-photo"><img src="${car.photo}" alt="" loading="lazy"></div><div class="garage-car-info"><div class="garage-car-name">${car.brand} ${car.model}</div><div class="garage-car-details">${car.year} г. • ${car.mileage} тыс км</div><div class="garage-car-condition ${cc}">${car.condition}</div><div class="garage-slot-number">${slotNum}</div></div></div>`;
        });
        html+='</div>';
    }
    container.innerHTML=html;
}
function getSlotPrice(){return 50000*GS.maxGarageSlots}
function buyGarageSlot(){
    const price=getSlotPrice();
    if(GS.balance<price){showToast('Недостаточно средств!','error');return}
    GS.balance-=price;GS.maxGarageSlots++;
    GS.transactions.unshift({id:Date.now(),type:'expense',name:'Покупка парковочного места',amount:price,date:new Date().toISOString(),icon:'🅿'});
    saveGame();renderGarage();updateBalance();renderTransactions();showToast(`Гараж расширен до ${GS.maxGarageSlots} мест!`,'success');
}

// ===================== MAPS (DRIVE) =====================
function renderMaps(){
    const c=document.getElementById('mapsCityList');if(!c)return;
    c.innerHTML=cities.map(city=>{
        const dist=cityDistances[city]||0;
        const cost=dist*5;
        const isCurrent=city===GS.currentCity;
        return`<div class="maps-city-card" onclick="${isCurrent?'':`showDriveModal('${city}',${dist},${cost})`}" style="${isCurrent?'border:2px solid #4ade80;opacity:.7':''}"><div class="maps-city-icon">🏙</div><div class="maps-city-info"><div class="maps-city-name">${city} ${isCurrent?'(вы здесь)':''}</div><div class="maps-city-desc">${dist} км от Челябинска</div></div><div class="maps-city-dist">${isCurrent?'—':fmtP(cost)}</div></div>`;
    }).join('');
}
function showDriveModal(city,dist,cost){
    if(!GS.garage.length){showToast('Нет машин для перегона','error');return}
    const m=document.getElementById('modalContent');m.className='modal-content dark';
    m.innerHTML=`<div class="modal-header dark"><span style="font-weight:700">Перегон в ${city}</span><div class="modal-close dark" onclick="closeModal()">✕</div></div><div class="modal-body"><p style="font-size:13px;color:#aaa;margin-bottom:16px">Расстояние: ${dist} км • Стоимость: ${fmtP(cost)}<br>Риск поломки: ${Math.min(dist/10,30).toFixed(0)}%</p><label style="font-size:13px;color:#888;display:block;margin-bottom:6px">Выберите авто:</label><select id="driveCarSelect" style="width:100%;padding:10px;border-radius:10px;background:#2a2a2a;color:#fff;border:1px solid #444;margin-bottom:16px">${GS.garage.map(c=>`<option value="${c.id}">${c.brand} ${c.model} ${c.year}</option>`).join('')}</select><button class="btn btn-primary" onclick="driveCar('${city}',${cost})" style="width:100%">Перегнать</button></div>`;
    document.getElementById('modalOverlay').classList.add('active');
}
function driveCar(city,cost){
    if(GS.balance<cost){showToast('Недостаточно средств!','error');return}
    const carId=document.getElementById('driveCarSelect').value;
    const car=GS.garage.find(c=>c.id==carId);if(!car)return;
    GS.balance-=cost;
    const breakdownChance=Math.min(cityDistances[city]/1000,0.3);
    if(Math.random()<breakdownChance&&car.condition!=='В идеале'){
        car.condition=car.condition==='Хорошее'?'Требует ремонта':'Требует ремонта';
        GS.transactions.unshift({id:Date.now(),type:'expense',name:`Перегон: ${car.brand} ${car.model} → ${city} (поломка!)`,amount:cost,date:new Date().toISOString(),icon:'🚗'});
        showToast(`Машина доехала, но сломалась в дороге! 😰`,'error');
    }else{
        GS.transactions.unshift({id:Date.now(),type:'expense',name:`Перегон: ${car.brand} ${car.model} → ${city}`,amount:cost,date:new Date().toISOString(),icon:'🚗'});
        showToast(`${car.brand} ${car.model} доставлен в ${city}! ✅`,'success');
    }
    car.city=city;car.garageCity=city;GS.currentCity=city;
    document.getElementById('currentCity').textContent=city;
    saveGame();closeModal();renderGarage();renderMaps();updateBalance();renderTransactions();
}

// ===================== BANK / CREDITS =====================
function updateBalance(){const el=document.getElementById('balanceDisplay');if(el)el.textContent=fmtP(GS.balance)}
function renderTransactions(){
    const c=document.getElementById('transactionsList');if(!c)return;
    if(!GS.transactions.length){c.innerHTML='<div style="text-align:center;padding:30px;color:#999">Нет операций</div>';return}
    c.innerHTML=GS.transactions.slice(0,50).map(t=>{const d=new Date(t.date);return`<div class="transaction-card"><div class="transaction-icon ${t.type==='income'?'income':'expense'}">${t.icon||(t.type==='income'?'🚗':'🚂')}</div><div class="transaction-info"><div class="transaction-name">${t.name}</div><div class="transaction-date">${d.toLocaleDateString('ru-RU',{day:'numeric',month:'short'})}, ${d.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})}</div></div><div class="transaction-amount ${t.type==='income'?'positive':'negative'}">${t.type==='income'?'+':'-'}${fmtP(t.amount)}</div></div>`}).join('');
}
function showCreditCalc(){
    const m=document.getElementById('modalContent');m.className='modal-content';
    m.innerHTML=`<div class="modal-header"><span style="font-weight:700">Автокредит</span><div class="modal-close" onclick="closeModal()">✕</div></div><div class="credit-calc"><label>Сумма кредита (₽)</label><input type="number" id="creditAmount" value="500000" oninput="calcCredit()"><label>Срок (месяцев)</label><select id="creditTerm" onchange="calcCredit()"><option value="3">3 мес. (5%)</option><option value="6">6 мес. (8%)</option><option value="12" selected>12 мес. (12%)</option><option value="24">24 мес. (18%)</option><option value="36">36 мес. (24%)</option></select><div class="credit-result" id="creditResult"></div><button class="btn btn-warning" onclick="takeCredit()" style="width:100%;margin-top:12px">Взять кредит</button></div>`;
    document.getElementById('modalOverlay').classList.add('active');
    calcCredit();
}
function calcCredit(){
    const amount=parseInt(document.getElementById('creditAmount')?.value)||0;
    const term=parseInt(document.getElementById('creditTerm')?.value)||12;
    const rates={3:5,6:8,12:12,24:18,36:24};
    const rate=rates[term]||12;
    const total=Math.round(amount*(1+rate/100));
    const monthly=Math.round(total/term);
    const overpay=total-amount;
    const r=document.getElementById('creditResult');if(!r)return;
    r.innerHTML=`<div class="credit-result-row"><span>Сумма:</span><span>${fmtP(amount)}</span></div><div class="credit-result-row"><span>Ставка:</span><span>${rate}%</span></div><div class="credit-result-row"><span>Ежемесячно:</span><span>${fmtP(monthly)}</span></div><div class="credit-result-row"><span>Переплата:</span><span style="color:#ef4444">${fmtP(overpay)}</span></div><div class="credit-result-row total"><span>Итого к возврату:</span><span>${fmtP(total)}</span></div>`;
}
function takeCredit(){
    const amount=parseInt(document.getElementById('creditAmount').value)||0;
    const term=parseInt(document.getElementById('creditTerm').value)||12;
    const rates={3:5,6:8,12:12,24:18,36:24};
    const rate=rates[term]||12;
    const total=Math.round(amount*(1+rate/100));
    if(amount<10000){showToast('Минимальная сумма: 10 000 ₽','error');return}
    GS.balance+=amount;
    GS.credits.push({id:Date.now(),amount,total,term,remaining:total,monthlyPayment:Math.round(total/term),monthsLeft:term});
    GS.transactions.unshift({id:Date.now(),type:'income',name:`Кредит: ${fmtP(amount)} на ${term} мес.`,amount,date:new Date().toISOString(),icon:'💳'});
    saveGame();closeModal();updateBalance();renderTransactions();showToast(`Кредит одобрен! +${fmtP(amount)} на счёт`,'success');
}

// ===================== NEWS =====================
function generateNews(){
    if(GS.news.length===0){
        for(let i=0;i<3;i++){
            const ev=newsEvents[Math.random()*newsEvents.length|0];
            GS.news.unshift({...ev,id:Date.now()+Math.random(),day:GS.gameDay,date:new Date().toISOString()});
        }
    }
}
function renderNews(){
    generateNews();
    const c=document.getElementById('newsList');if(!c)return;
    if(!GS.news.length){c.innerHTML='<div style="text-align:center;padding:40px;color:#999">Нет новостей</div>';return}
    c.innerHTML=GS.news.map(n=>`<div class="news-card"><div class="news-card-header"><span class="news-badge ${n.badge}">${n.badge==='important'?'ВАЖНО':n.badge==='positive'?'ПОЗИТИВ':'ИНФО'}</span><span class="news-date">День ${n.day}</span></div><div class="news-title">${n.title}</div><div class="news-text">${n.text}</div></div>`).join('');
}

// ===================== TIME =====================
let gameTimerInterval=null;

function advanceTime(){
    GS.gameDay++;
    GS.gameDate=new Date(new Date(GS.gameDate).getTime()+86400000).toISOString();
    processSales();processCredits();
    // Refresh listings
    if(GS.listings.filter(l=>!l.isOwn).length<8)for(let i=0;i<5;i++)GS.listings.push(generateCar());
    // Random news event
    if(Math.random()<0.35){
        const ev=newsEvents[Math.random()*newsEvents.length|0];
        GS.news.unshift({...ev,id:Date.now(),day:GS.gameDay,date:new Date().toISOString()});
        if(ev.effect)GS.activeEffects.push({...ev.effect,expiresDay:GS.gameDay+5});
        showToast(`📰 ${ev.title}`,'');
    }
    // Clean expired effects
    GS.activeEffects=GS.activeEffects.filter(e=>!e.expiresDay||e.expiresDay>GS.gameDay);
    saveGame();renderListings();renderGarage();renderTransactions();updateBalance();renderNews();
    const d=new Date(GS.gameDate);
    const dn=['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
    const mn=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
    const cd=document.getElementById('calendarDate');if(cd)cd.textContent=`${dn[d.getDay()]}, ${d.getDate()} ${mn[d.getMonth()]} ${d.getFullYear()}`;
    showToast(`День ${GS.gameDay} начался! ⏩`,'success');
}

function startGameTimer(){
    if(gameTimerInterval)clearInterval(gameTimerInterval);
    gameTimerInterval=setInterval(()=>{
        GS.gameTimeSeconds+=60; // +60 игровых секунд (1 игровая минута) каждую секунду реального времени (Time Scale = 60)
        if(GS.gameTimeSeconds>=24*3600){ // 24 игровых часа = новый день
            GS.gameTimeSeconds=GS.gameTimeSeconds%(24*3600);
            advanceTime();
        }
        updateGameTimeDisplay();
    },1000); // Каждую секунду реального времени
}

function updateGameTimeDisplay(){
    const totalSeconds=GS.gameTimeSeconds;
    const hours=Math.floor(totalSeconds/3600)%24;
    const minutes=Math.floor((totalSeconds%3600)/60);
    const timeStr=`${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`;
    const e1=document.getElementById('statusTime');if(e1)e1.textContent=timeStr;
    const e2=document.getElementById('macosTime');if(e2)e2.textContent=timeStr;
}
function processSales(){
    const rm=[];
    GS.myListings.forEach((ml,idx)=>{
        const li=GS.listings.findIndex(l=>l.id==ml.listingId);if(li<0){rm.push(idx);return}
        const listing=GS.listings[li];listing.views+=(Math.random()*50|0)+5;listing.daysAgo++;
        const fairPrice=listing.purchasePrice||listing.price;
        const ratio=listing.price/fairPrice;
        let sc=ratio<.9?.7:ratio<1?.5:ratio<1.1?.35:ratio<1.2?.2:ratio<1.3?.1:.05;
        if(Math.random()<sc){
            GS.balance+=listing.price;
            GS.transactions.unshift({id:Date.now()+Math.random(),type:'income',name:`Продажа: ${listing.brand} ${listing.model}`,amount:listing.price,date:new Date().toISOString(),icon:'💰'});
            GS.listings.splice(li,1);rm.push(idx);
            showToast(`${listing.brand} ${listing.model} продан за ${fmtP(listing.price)}! 💰`,'success');
        }
    });
    rm.reverse().forEach(i=>GS.myListings.splice(i,1));saveGame();
}
function processCredits(){
    GS.credits.forEach(cr=>{
        if(cr.monthsLeft>0){
            const payment=Math.min(cr.monthlyPayment,cr.remaining);
            if(GS.balance>=payment){
                GS.balance-=payment;cr.remaining-=payment;cr.monthsLeft--;
                GS.transactions.unshift({id:Date.now()+Math.random(),type:'expense',name:`Платёж по кредиту (ост. ${cr.monthsLeft} мес.)`,amount:payment,date:new Date().toISOString(),icon:'💳'});
            }else{
                GS.balance-=GS.balance;cr.monthsLeft--;
                GS.transactions.unshift({id:Date.now()+Math.random(),type:'expense',name:'Просрочка по кредиту!',amount:payment,date:new Date().toISOString(),icon:'⚠️'});
            }
        }
    });
    GS.credits=GS.credits.filter(cr=>cr.monthsLeft>0&&cr.remaining>0);saveGame();
}
function sleepAction(){advanceTime();closeApp('sleep')}

// ===================== FILTERS / CITY =====================
function showCityFilter(){
    const m=document.getElementById('modalContent');m.className='modal-content';
    m.innerHTML=`<div class="modal-header"><span style="font-weight:700">Выбор города</span><div class="modal-close" onclick="closeModal()">✕</div></div><div class="filter-panel">${cities.map(c=>`<div class="repair-option" onclick="GS.currentCity='${c}';document.getElementById('currentCity').textContent='${c}';closeModal();showToast('Город: ${c}')"><div class="repair-option-title">📍 ${c}</div></div>`).join('')}</div>`;
    document.getElementById('modalOverlay').classList.add('active');
}
function showFilters(){
    const m=document.getElementById('modalContent');m.className='modal-content dark';
    m.innerHTML=`<div class="modal-header dark"><span style="font-weight:700">Фильтры</span><div class="modal-close dark" onclick="closeModal()">✕</div></div><div class="filter-panel"><div class="filter-group dark"><label>Марка</label><select id="filterBrand"><option value="">Все</option>${carBrands.map(b=>`<option value="${b.brand}">${b.brand}</option>`).join('')}</select></div><div class="filter-group dark"><label>Цена от</label><input type="number" id="filterPriceMin" placeholder="0"></div><div class="filter-group dark"><label>Цена до</label><input type="number" id="filterPriceMax" placeholder="10000000"></div><button class="btn btn-primary" onclick="applyFilters()" style="width:100%;margin-top:12px">Применить</button></div>`;
    document.getElementById('modalOverlay').classList.add('active');
}
function applyFilters(){
    const brand=document.getElementById('filterBrand').value;
    const pMin=parseInt(document.getElementById('filterPriceMin').value)||0;
    const pMax=parseInt(document.getElementById('filterPriceMax').value)||Infinity;
    let f=GS.listings.filter(l=>!l.isOwn);
    if(brand)f=f.filter(l=>l.brand===brand);
    f=f.filter(l=>l.price>=pMin&&l.price<=pMax);
    const c=document.getElementById('listingsContainer');
    c.innerHTML=f.map(car=>`<div class="listing-card" onclick="showCarDetail('${car.id}',false)"><div class="listing-photo"><img src="${car.photo}" alt="" loading="lazy"><div class="listing-photo-count">📷 ${car.photoCount}</div></div><div class="listing-info"><div class="listing-price">${fmtP(car.price)}</div><div class="listing-title">${car.brand} ${car.model}</div><div class="listing-details">${car.year} г. • ${car.mileage} тыс км</div><div class="listing-location">📍 ${car.city}</div></div></div>`).join('')||'<div style="text-align:center;padding:40px;color:#666">Ничего не найдено</div>';
    closeModal();
}

// ===================== BATTERY API =====================
let currentBatteryLevel = 66;
let isCharging = false;

function updateBatteryUI(level, charging) {
    currentBatteryLevel = Math.round(level);
    isCharging = charging;
    
    // Phone mode battery
    const phoneLevelEl = document.getElementById('phoneBatteryLevel');
    const phoneTextEl = document.getElementById('phoneBatteryText');
    if (phoneLevelEl) {
        phoneLevelEl.style.width = `${currentBatteryLevel}%`;
        if (currentBatteryLevel > 50) {
            phoneLevelEl.style.backgroundColor = '#22c55e';
        } else if (currentBatteryLevel >= 20) {
            phoneLevelEl.style.backgroundColor = '#fbbf24';
        } else {
            phoneLevelEl.style.backgroundColor = '#ef4444';
        }
        if (charging) {
            phoneLevelEl.parentElement.classList.add('battery-charging');
        } else {
            phoneLevelEl.parentElement.classList.remove('battery-charging');
        }
    }
    if (phoneTextEl) {
        phoneTextEl.textContent = `${currentBatteryLevel}%${charging ? ' ⚡' : ''}`;
    }
    
    // macOS mode battery
    const macosBatteryEl = document.getElementById('macosBattery');
    if (macosBatteryEl) {
        macosBatteryEl.textContent = `🔋 ${currentBatteryLevel}%${charging ? ' ⚡' : ''}`;
        if (currentBatteryLevel > 50) {
            macosBatteryEl.style.color = '#22c55e';
        } else if (currentBatteryLevel >= 20) {
            macosBatteryEl.style.color = '#fbbf24';
        } else {
            macosBatteryEl.style.color = '#ef4444';
        }
    }
}

function initBatteryAPI() {
    if (!navigator.getBattery) {
        console.log('Battery API not supported');
        updateBatteryUI(100, false);
        return;
    }
    
    try {
        navigator.getBattery().then(battery => {
            updateBatteryUI(battery.level * 100, battery.charging);
            
            battery.addEventListener('levelchange', () => {
                updateBatteryUI(battery.level * 100, battery.charging);
            });
            
            battery.addEventListener('chargingchange', () => {
                updateBatteryUI(battery.level * 100, battery.charging);
            });
            
            battery.addEventListener('chargingtimechange', () => {
                updateBatteryUI(battery.level * 100, battery.charging);
            });
            
            battery.addEventListener('dischargingtimechange', () => {
                updateBatteryUI(battery.level * 100, battery.charging);
            });
        }).catch(err => {
            console.log('Battery API error:', err);
            updateBatteryUI(100, false);
        });
    } catch (err) {
        console.log('Battery API error:', err);
        updateBatteryUI(100, false);
    }
}

// ===================== UTILS =====================
function fmtP(p){return p.toLocaleString('ru-RU')+' ₽'}
function showToast(msg,type=''){
    const t=document.getElementById(currentMode==='desktop'?'toastDesktop':'toast');
    t.textContent=msg;t.className=`toast ${type} show`;
    setTimeout(()=>t.classList.remove('show'),3000);
}
function updateTime(){const n=new Date();const s=`${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`;const e1=document.getElementById('statusTime');if(e1)e1.textContent=s;const e2=document.getElementById('macosTime');if(e2)e2.textContent=s}
function resetGame(){
    if(confirm('Сбросить весь прогресс?')){
        localStorage.removeItem('carFlipGame2');location.reload();
    }
}

// ===================== INIT =====================
function init(){
    loadGame();
    if(!GS.listings.length)generateListings();
    if(!GS.maxGarageSlots)GS.maxGarageSlots=3;
    if(!GS.chats)GS.chats=[];
    if(!GS.news)GS.news=[];
    if(!GS.activeEffects)GS.activeEffects=[];
    if(!GS.credits)GS.credits=[];
    if(GS.gameTimeSeconds===undefined)GS.gameTimeSeconds=0;
    if(!GS.currentGarageCity)GS.currentGarageCity='Москва';
    if(!GS.activeGarageTab)GS.activeGarageTab='myCars';
    buildPhoneGrid();
    detectMode();
    if(currentMode==='desktop')buildDesktopUI();
    renderListings();renderGarage();renderTransactions();updateBalance();
    updateGameTimeDisplay();
    startGameTimer();
    document.getElementById('currentCity').textContent=GS.currentCity||'Челябинск';
    initBatteryAPI();
}
init();
