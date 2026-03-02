// Товары для магазинов
export const shopProducts = {
  5: {
    // Супермаркет "Макро"
    categories: [
      {
        name: 'Молочные продукты',
        items: [
          { id: 501, name: 'Молоко', description: 'Молоко 1л, 3.2%', price: 12000, image: '🥛' },
          { id: 502, name: 'Йогурт', description: 'Йогурт натуральный 500г', price: 15000, image: '🥛' },
          { id: 503, name: 'Сыр', description: 'Сыр твердый 200г', price: 25000, image: '🧀' },
          { id: 504, name: 'Творог', description: 'Творог 9% 400г', price: 18000, image: '🧀' },
        ]
      },
      {
        name: 'Хлеб и выпечка',
        items: [
          { id: 505, name: 'Хлеб белый', description: 'Хлеб нарезной 500г', price: 5000, image: '🍞' },
          { id: 506, name: 'Булочки', description: 'Булочки сдобные 4 шт', price: 8000, image: '🥖' },
          { id: 507, name: 'Печенье', description: 'Печенье овсяное 300г', price: 12000, image: '🍪' },
        ]
      },
      {
        name: 'Бакалея',
        items: [
          { id: 508, name: 'Рис', description: 'Рис длиннозерный 1кг', price: 18000, image: '🌾' },
          { id: 509, name: 'Макароны', description: 'Макароны 500г', price: 8000, image: '🍝' },
          { id: 510, name: 'Масло подсолнечное', description: 'Масло рафинированное 1л', price: 22000, image: '🫒' },
        ]
      }
    ]
  },
  6: {
    // Магазин "Фрукты и овощи"
    categories: [
      {
        name: 'Фрукты',
        items: [
          { id: 601, name: 'Яблоки', description: 'Яблоки красные 1кг', price: 15000, image: '🍎' },
          { id: 602, name: 'Бананы', description: 'Бананы спелые 1кг', price: 20000, image: '🍌' },
          { id: 603, name: 'Апельсины', description: 'Апельсины 1кг', price: 18000, image: '🍊' },
          { id: 604, name: 'Виноград', description: 'Виноград белый 1кг', price: 30000, image: '🍇' },
        ]
      },
      {
        name: 'Овощи',
        items: [
          { id: 605, name: 'Помидоры', description: 'Помидоры свежие 1кг', price: 12000, image: '🍅' },
          { id: 606, name: 'Огурцы', description: 'Огурцы 1кг', price: 10000, image: '🥒' },
          { id: 607, name: 'Картофель', description: 'Картофель 1кг', price: 8000, image: '🥔' },
          { id: 608, name: 'Морковь', description: 'Морковь 1кг', price: 7000, image: '🥕' },
        ]
      },
      {
        name: 'Зелень',
        items: [
          { id: 609, name: 'Укроп', description: 'Укроп свежий пучок', price: 3000, image: '🌿' },
          { id: 610, name: 'Петрушка', description: 'Петрушка свежая пучок', price: 3000, image: '🌿' },
          { id: 611, name: 'Лук зеленый', description: 'Лук зеленый пучок', price: 4000, image: '🧅' },
        ]
      }
    ]
  },
  7: {
    // Мясной магазин "Дилшод"
    categories: [
      {
        name: 'Мясо',
        items: [
          { id: 701, name: 'Говядина', description: 'Говядина вырезка 1кг', price: 120000, image: '🥩' },
          { id: 702, name: 'Баранина', description: 'Баранина 1кг', price: 110000, image: '🥩' },
          { id: 703, name: 'Курица', description: 'Курица целая 1.5кг', price: 45000, image: '🍗' },
          { id: 704, name: 'Фарш говяжий', description: 'Фарш говяжий 500г', price: 60000, image: '🥩' },
        ]
      },
      {
        name: 'Колбасы',
        items: [
          { id: 705, name: 'Колбаса вареная', description: 'Колбаса докторская 300г', price: 35000, image: '🌭' },
          { id: 706, name: 'Сардельки', description: 'Сардельки 400г', price: 30000, image: '🌭' },
          { id: 707, name: 'Колбаса копченая', description: 'Колбаса сервелат 300г', price: 45000, image: '🌭' },
        ]
      }
    ]
  },
  8: {
    // Кондитерская "Сладости"
    categories: [
      {
        name: 'Торты',
        items: [
          { id: 801, name: 'Торт шоколадный', description: 'Торт шоколадный 1кг', price: 80000, image: '🎂' },
          { id: 802, name: 'Торт фруктовый', description: 'Торт с фруктами 1кг', price: 75000, image: '🎂' },
          { id: 803, name: 'Торт Наполеон', description: 'Торт Наполеон 1кг', price: 85000, image: '🎂' },
        ]
      },
      {
        name: 'Пирожные',
        items: [
          { id: 804, name: 'Эклер', description: 'Эклер с кремом 1 шт', price: 8000, image: '🧁' },
          { id: 805, name: 'Пирожное картошка', description: 'Пирожное картошка 1 шт', price: 6000, image: '🧁' },
          { id: 806, name: 'Пирожное наполеон', description: 'Пирожное наполеон 1 шт', price: 10000, image: '🧁' },
        ]
      },
      {
        name: 'Печенье и сладости',
        items: [
          { id: 807, name: 'Печенье овсяное', description: 'Печенье домашнее 300г', price: 15000, image: '🍪' },
          { id: 808, name: 'Пряники', description: 'Пряники медовые 300г', price: 18000, image: '🍪' },
          { id: 809, name: 'Халва', description: 'Халва подсолнечная 400г', price: 20000, image: '🍬' },
        ]
      }
    ]
  }
}

// Функция для получения товаров магазина
export function getShopProducts(shopId) {
  return shopProducts[shopId] || null
}
