// ===================== DATA =====================
const carBrands = [
    { brand: 'TOYOTA', models: ['CARINA', 'CAMRY', 'COROLLA', 'MARK II', 'CELICA'] },
    { brand: 'BMW', models: ['X5', 'E34', 'E39', 'E46', 'E60'] },
    { brand: 'MERCEDES', models: ['E-CLASS', 'C-CLASS', 'S-CLASS', 'GLE', 'CLK'] },
    { brand: 'ЛАДА', models: ['ПРИОРА', 'ГРАНТА', 'КАЛИНА', 'ВАЗ 2107', 'ВЕСТА'] },
    { brand: 'AUDI', models: ['A4', 'A6', 'A3', 'Q5', 'A8'] },
    { brand: 'VOLKSWAGEN', models: ['PASSAT', 'GOLF', 'POLO', 'JETTA', 'TIGUAN'] },
    { brand: 'HONDA', models: ['ACCORD', 'CIVIC', 'CR-V', 'FIT', 'LEGEND'] },
    { brand: 'MAZDA', models: ['3', '6', 'CX-5', 'RX-7', 'CX-3'] },
    { brand: 'NISSAN', models: ['ALMERA', 'TEANA', 'X-TRAIL', 'SKYLINE', 'PATROL'] },
    { brand: 'FORD', models: ['FOCUS', 'MONDEO', 'FIESTA', 'KUGA', 'EXPLORER'] },
    { brand: 'HYUNDAI', models: ['SOLARIS', 'TUCSON', 'SONATA', 'CRETA', 'ELANTRA'] },
    { brand: 'KIA', models: ['RIO', 'SPORTAGE', 'CERATO', 'OPTIMA', 'SORENTO'] },
    { brand: 'MITSUBISHI', models: ['LANCER', 'OUTLANDER', 'PAJERO', 'ECLIPSE', 'ASX'] },
    { brand: 'SUBARU', models: ['IMPREZA', 'FORESTER', 'LEGACY', 'OUTBACK', 'WRX'] },
    { brand: 'OPEL', models: ['ASTRA', 'VECTRA', 'INSIGNIA', 'CORSA', 'MOKKA'] }
];
const cities = ['Челябинск', 'Уфа', 'Екатеринбург', 'Москва', 'Казань', 'Новосибирск', 'Самара', 'Пермь', 'Тюмень', 'Омск'];
const cityDistances = { 'Челябинск': 0, 'Уфа': 420, 'Екатеринбург': 210, 'Москва': 1780, 'Казань': 950, 'Новосибирск': 1550, 'Самара': 880, 'Пермь': 560, 'Тюмень': 340, 'Омск': 920 };
const sellers = ['Алексей', 'Дмитрий', 'Сергей', 'Иван', 'Михаил', 'Андрей', 'Николай', 'Владимир', 'Олег', 'Артём'];
const conditions = ['Требует ремонта', 'Хорошее', 'В идеале'];
const carPhotos = ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop', 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=250&fit=crop', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=250&fit=crop', 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=250&fit=crop', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=250&fit=crop', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=250&fit=crop', 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=250&fit=crop', 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop'];

const newsEvents = [
    { title: 'Бензин подорожал на 15%', text: 'Цены на топливо резко выросли. Спрос на малолитражки и экономичные авто увеличился.', badge: 'important', effect: { type: 'demand', brands: ['ЛАДА', 'KIA', 'HYUNDAI'], multiplier: 1.2 } },
    { title: 'Новый налог на старые авто', text: 'Правительство ввело повышенный налог на автомобили старше 20 лет. Цены на классику падают.', badge: 'important', effect: { type: 'price', maxYear: 2006, multiplier: 0.8 } },
    { title: 'Курс доллара упал', text: 'Иномарки стали доступнее. Ожидается снижение цен на BMW, Mercedes и Audi.', badge: 'positive', effect: { type: 'price', brands: ['BMW', 'MERCEDES', 'AUDI'], multiplier: 0.85 } },
    { title: 'Зима близко: спрос на кроссоверы', text: 'Сезонный рост спроса на полноприводные автомобили и кроссоверы.', badge: 'info', effect: { type: 'demand', models: ['X5', 'CX-5', 'TUCSON', 'SPORTAGE', 'OUTLANDER', 'CR-V', 'PATROL', 'FORESTER'], multiplier: 1.25 } },
    { title: 'Такси-агрегатор расширяется', text: 'Крупная компания закупает бюджетные авто. Спрос на Solaris, Rio, Polo вырос.', badge: 'positive', effect: { type: 'demand', models: ['SOLARIS', 'RIO', 'POLO', 'GRANTA', 'LOGAN'], multiplier: 1.3 } },
    { title: 'Дефицит запчастей из-за санкций', text: 'Цены на ремонт иномарок выросли. Состояние авто теперь важнее.', badge: 'important', effect: { type: 'condition_bonus', multiplier: 1.15 } },
    { title: 'Автосалон закрылся в Екатеринбурге', text: 'Крупный дилер обанкротился. На рынок выброшено 200 авто — цены в регионе упали.', badge: 'info', effect: { type: 'city_price', city: 'Екатеринбург', multiplier: 0.8 } },
    { title: 'Мода на JDM возвращается', text: 'Праворульные японские авто снова в тренде. Toyota Mark II и Nissan Skyline дорожают.', badge: 'positive', effect: { type: 'demand', models: ['MARK II', 'SKYLINE', 'CELICA', 'RX-7', 'IMPREZA', 'WRX', 'LEGEND'], multiplier: 1.35 } }
];

const appDefs = [
    { id: 'avtobuy', icon: '🚗', iconImg: 'CarGO-icon.png', label: 'CarGO', bg: 'linear-gradient(135deg,#1a1a2e,#2d2d5e)' },
    { id: 'maps', icon: '📍', iconImg: 'maps-icon.png', label: 'Карты', bg: 'linear-gradient(135deg,#22c55e,#16a34a)' },
    { id: 'garage', icon: '🏠', iconImg: 'garage-icon.png', label: 'Гараж', bg: 'linear-gradient(135deg,#4a9eff,#2563eb)' },
    { id: 'bank', icon: '🟠', iconImg: 'bank-icon.png', label: 'ФинкБанк', bg: 'linear-gradient(135deg,#ff8c00,#ea580c)' },
    { id: 'news', icon: '📰', iconImg: 'news-icon.png', label: 'Новости', bg: 'linear-gradient(135deg,#dc2626,#b91c1c)' },
    { id: 'sleep', icon: '😴', iconImg: 'sleep-icon.png', label: 'Сон', bg: 'linear-gradient(135deg,#6366f1,#4338ca)' },
    { id: 'calendar', icon: '📅', iconImg: 'calendare-icon.png', label: 'Календарь', bg: 'white' },
    { id: 'realtor', icon: '📞', iconImg: 'sobolev-house-icon.png', label: 'Риелтор', bg: 'linear-gradient(135deg,#06b6d4,#0891b2)' },
    { id: 'settings', icon: '⚙️', iconImg: 'setting-icon.png', label: 'Настройки', bg: 'linear-gradient(135deg,#6b7280,#374151)' },
    { id: 'vpn', icon: '🌐', iconImg: 'vpn-icon.png', label: 'VPN', bg: 'linear-gradient(135deg,#10b981,#059669)' },
    { id: 'notepad', icon: '💡', iconImg: 'tips-icon.png', label: 'Заметки', bg: 'linear-gradient(135deg,#fbbf24,#f59e0b)' },
    { id: 'blocks', icon: '🧱', label: 'В разработке', bg: 'linear-gradient(135deg,#a855f7,#7c3aed)' }
];
