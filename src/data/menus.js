// Меню для ресторанов
export const restaurantMenus = {
  1: {
    // Ресторан "Восточная кухня"
    categories: [
      {
        name: 'Первые блюда',
        items: [
          { id: 101, name: 'Лагман', description: 'Домашняя лапша с мясом и овощами', price: 35000, image: '🍜' },
          { id: 102, name: 'Шурпа', description: 'Наваристый суп с бараниной', price: 30000, image: '🍲' },
          { id: 103, name: 'Манты', description: 'Парные манты с мясом', price: 40000, image: '🥟' },
        ]
      },
      {
        name: 'Вторые блюда',
        items: [
          { id: 104, name: 'Плов', description: 'Узбекский плов с бараниной', price: 45000, image: '🍛' },
          { id: 105, name: 'Шашлык', description: 'Шашлык из баранины (5 шт)', price: 50000, image: '🍢' },
          { id: 106, name: 'Самса', description: 'Самса с мясом (3 шт)', price: 25000, image: '🥐' },
        ]
      },
      {
        name: 'Напитки',
        items: [
          { id: 107, name: 'Чай зеленый', description: 'Традиционный зеленый чай', price: 5000, image: '🍵' },
          { id: 108, name: 'Компот', description: 'Домашний компот', price: 8000, image: '🥤' },
        ]
      }
    ]
  },
  2: {
    // Pizza House
    categories: [
      {
        name: 'Пицца',
        items: [
          { id: 201, name: 'Маргарита', description: 'Томаты, моцарелла, базилик', price: 60000, image: '🍕' },
          { id: 202, name: 'Пепперони', description: 'Пепперони, моцарелла, томатный соус', price: 70000, image: '🍕' },
          { id: 203, name: 'Четыре сыра', description: 'Моцарелла, горгонзола, пармезан, чеддер', price: 75000, image: '🍕' },
          { id: 204, name: 'Гавайская', description: 'Ветчина, ананасы, моцарелла', price: 72000, image: '🍕' },
        ]
      },
      {
        name: 'Паста',
        items: [
          { id: 205, name: 'Карбонара', description: 'Спагетти с беконом и сливками', price: 55000, image: '🍝' },
          { id: 206, name: 'Болоньезе', description: 'Спагетти с мясным соусом', price: 58000, image: '🍝' },
        ]
      },
      {
        name: 'Напитки',
        items: [
          { id: 207, name: 'Кола', description: 'Coca-Cola 0.5л', price: 12000, image: '🥤' },
          { id: 208, name: 'Сок', description: 'Апельсиновый сок 0.3л', price: 15000, image: '🧃' },
        ]
      }
    ]
  },
  3: {
    // Sushi Bar
    categories: [
      {
        name: 'Роллы',
        items: [
          { id: 301, name: 'Калифорния', description: 'Краб, авокадо, огурец', price: 45000, image: '🍣' },
          { id: 302, name: 'Филадельфия', description: 'Лосось, сыр, огурец', price: 50000, image: '🍣' },
          { id: 303, name: 'Дракон', description: 'Угорь, авокадо, огурец', price: 55000, image: '🍣' },
          { id: 304, name: 'Сет "Семейный"', description: '20 роллов (ассорти)', price: 180000, image: '🍱' },
        ]
      },
      {
        name: 'Суши',
        items: [
          { id: 305, name: 'Лосось', description: '2 шт', price: 25000, image: '🍣' },
          { id: 306, name: 'Тунец', description: '2 шт', price: 28000, image: '🍣' },
          { id: 307, name: 'Угорь', description: '2 шт', price: 30000, image: '🍣' },
        ]
      },
      {
        name: 'Напитки',
        items: [
          { id: 308, name: 'Зеленый чай', description: 'Японский зеленый чай', price: 8000, image: '🍵' },
          { id: 309, name: 'Саке', description: 'Японское рисовое вино', price: 40000, image: '🍶' },
        ]
      }
    ]
  },
  4: {
    // Burger King
    categories: [
      {
        name: 'Бургеры',
        items: [
          { id: 401, name: 'Чизбургер', description: 'Котлета, сыр, овощи', price: 35000, image: '🍔' },
          { id: 402, name: 'Биг Кинг', description: 'Двойная котлета, сыр, соус', price: 50000, image: '🍔' },
          { id: 403, name: 'Воппер', description: 'Большой бургер с овощами', price: 55000, image: '🍔' },
        ]
      },
      {
        name: 'Картофель фри',
        items: [
          { id: 404, name: 'Маленькая порция', description: '100г', price: 15000, image: '🍟' },
          { id: 405, name: 'Большая порция', description: '200г', price: 25000, image: '🍟' },
        ]
      },
      {
        name: 'Напитки',
        items: [
          { id: 406, name: 'Кола', description: '0.5л', price: 12000, image: '🥤' },
          { id: 407, name: 'Молочный коктейль', description: 'Ванильный 0.3л', price: 20000, image: '🥤' },
        ]
      }
    ]
  }
}

// Функция для получения меню ресторана
export function getRestaurantMenu(restaurantId) {
  return restaurantMenus[restaurantId] || null
}
