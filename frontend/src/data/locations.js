// Координаты города: 40°59′52″ с. ш. 71°14′25″ в. д. (Ташкент)
// Базовые данные для тестирования

export const locations = [
  // Рестораны
  {
    id: 1,
    name: 'Ресторан "Восточная кухня"',
    category: 'restaurants',
    lat: 41.008,
    lng: 71.240,
    description: 'Традиционная узбекская кухня',
    address: 'ул. Навои, 15',
    phone: '+998 71 123-45-67'
  },
  {
    id: 2,
    name: 'Pizza House',
    category: 'restaurants',
    lat: 41.002,
    lng: 71.235,
    description: 'Итальянская пицца и паста',
    address: 'пр. Амира Темура, 45',
    phone: '+998 71 234-56-78'
  },
  {
    id: 3,
    name: 'Sushi Bar',
    category: 'restaurants',
    lat: 40.995,
    lng: 71.245,
    description: 'Японская кухня и суши',
    address: 'ул. Университетская, 12',
    phone: '+998 71 345-67-89'
  },
  {
    id: 4,
    name: 'Burger King',
    category: 'restaurants',
    lat: 41.005,
    lng: 71.250,
    description: 'Фастфуд и бургеры',
    address: 'ТЦ "Самарканд Дарвоза", 2 этаж',
    phone: '+998 71 456-78-90'
  },
  // Магазины
  {
    id: 5,
    name: 'Супермаркет "Макро"',
    category: 'shops',
    lat: 41.010,
    lng: 71.230,
    description: 'Продукты и товары повседневного спроса',
    address: 'ул. Чилонзар, 8',
    phone: '+998 71 567-89-01'
  },
  {
    id: 6,
    name: 'Магазин "Фрукты и овощи"',
    category: 'shops',
    lat: 40.990,
    lng: 71.240,
    description: 'Свежие фрукты и овощи',
    address: 'ул. Абдуллы Кадыри, 25',
    phone: '+998 71 678-90-12'
  },
  {
    id: 7,
    name: 'Мясной магазин "Дилшод"',
    category: 'shops',
    lat: 41.000,
    lng: 71.255,
    description: 'Свежее мясо и мясные продукты',
    address: 'ул. Шахрисабз, 30',
    phone: '+998 71 789-01-23'
  },
  {
    id: 8,
    name: 'Кондитерская "Сладости"',
    category: 'shops',
    lat: 40.998,
    lng: 71.235,
    description: 'Свежая выпечка и кондитерские изделия',
    address: 'пр. Бунёдкор, 18',
    phone: '+998 71 890-12-34'
  },
  // Объявления
  {
    id: 9,
    name: 'Сдам квартиру',
    category: 'ads',
    lat: 41.003,
    lng: 71.242,
    description: '2-комнатная квартира, центр города',
    address: 'ул. Навруз, 10',
    phone: '+998 90 123-45-67',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    price: '500 USD/месяц'
  },
  {
    id: 10,
    name: 'Продам автомобиль',
    category: 'ads',
    lat: 40.992,
    lng: 71.238,
    description: 'Toyota Camry 2018, отличное состояние',
    address: 'ул. Фараби, 5',
    phone: '+998 90 234-56-78',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800'
    ],
    price: '25000 USD'
  },
  {
    id: 11,
    name: 'Ищу работу',
    category: 'ads',
    lat: 41.006,
    lng: 71.248,
    description: 'Веб-разработчик, опыт 3 года',
    address: 'ул. Алишера Навои, 20',
    phone: '+998 90 345-67-89',
    images: [
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800'
    ]
  },
  {
    id: 12,
    name: 'Услуги ремонта',
    category: 'ads',
    lat: 40.997,
    lng: 71.232,
    description: 'Ремонт квартир и офисов под ключ',
    address: 'ул. Бабура, 15',
    phone: '+998 90 456-78-90',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    ]
  },
]
