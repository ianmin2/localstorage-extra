type TBaseItem = {
  id: number;
};

type TBaseFoodItem = TBaseItem & {
  name: string;
  type: string;
  ingredients: string[];
  price: number;
};

type TCategorisation = {
  type: string;
  subkeys: string[];
};

export type TCafeteriaItem = TBaseFoodItem;

export type TBarItem = TBaseFoodItem;

export type TTodoItem = TBaseItem & {
  content: string;
  notes: string;
  categorisation: TCategorisation;
};

type TDataSet = {
  apps: {
    cafeteria: TCafeteriaItem[];
    bar: TBarItem[];
    todo: TTodoItem[];
  };
};

const data: TDataSet = {
  apps: {
    cafeteria: [
      {
        id: 1,
        name: 'Grilled Chicken Sandwich',
        type: 'food',
        ingredients: ['grilled chicken', 'lettuce', 'tomato', 'mayonnaise'],
        price: 5.99,
      },
      {
        id: 2,
        name: 'Margherita Pizza',
        type: 'food',
        ingredients: [
          'pizza dough',
          'tomato sauce',
          'mozzarella cheese',
          'fresh basil',
        ],
        price: 7.99,
      },
      {
        id: 3,
        name: 'Vegetable Lasagna',
        type: 'food',
        ingredients: [
          'lasagna noodles',
          'ricotta cheese',
          'spinach',
          'tomato sauce',
        ],
        price: 8.99,
      },
      {
        id: 4,
        name: 'Beef Tacos',
        type: 'food',
        ingredients: [
          'taco shells',
          'ground beef',
          'lettuce',
          'tomatoes',
          'cheese',
        ],
        price: 6.99,
      },
      {
        id: 5,
        name: 'Fish and Chips',
        type: 'food',
        ingredients: ['fish', 'fries', 'chips', 'tartar sauce'],
        price: 9.99,
      },
      {
        id: 6,
        name: 'Chicken Stir Fry',
        type: 'food',
        ingredients: ['chicken', 'vegetables', 'rice', 'soy sauce'],
        price: 9.99,
      },
      {
        id: 7,
        name: 'Sushi Rolls',
        type: 'food',
        ingredients: ['rice', 'seaweed', 'fish', 'vegetables'],
        price: 8.99,
      },
      {
        id: 8,
        name: 'Salad',
        type: 'food',
        ingredients: ['mixed greens', 'vegetables', 'salad dressing'],
        price: 6.99,
      },
      {
        id: 9,
        name: 'Soup',
        type: 'food',
        ingredients: ['vegetables', 'meat', 'broth'],
        price: 4.99,
      },
      {
        id: 10,
        name: 'Sandwich',
        type: 'food',
        ingredients: ['bread', 'meat', 'cheese', 'vegetables'],
        price: 5.99,
      },
      {
        id: 11,
        name: 'Breakfast Burrito',
        type: 'food',
        ingredients: ['tortilla', 'eggs', 'beans', 'cheese', 'salsa'],
        price: 7.99,
      },
      {
        id: 12,
        name: 'Pancakes',
        type: 'food',
        ingredients: ['flour', 'eggs', 'milk', 'butter'],
        price: 4.99,
      },
      {
        id: 13,
        name: 'Waffles',
        type: 'food',
        ingredients: ['flour', 'eggs', 'milk', 'butter'],
        price: 5.99,
      },
      {
        id: 14,
        name: 'Oatmeal',
        type: 'food',
        ingredients: ['oatmeal', 'milk', 'fruit', 'nuts'],
        price: 3.99,
      },
      {
        id: 15,
        name: 'Yogurt',
        type: 'food',
        ingredients: ['yogurt', 'fruit', 'granola'],
        price: 4.99,
      },
      {
        id: 16,
        name: 'Fruit Salad',
        type: 'food',
        ingredients: ['mixed fruits', 'honey', 'lime juice'],
        price: 3.99,
      },
      {
        id: 17,
        name: 'Smoothie',
        type: 'food',
        ingredients: ['fruit', 'yogurt', 'milk', 'ice'],
        price: 5.99,
      },
      {
        id: 18,
        name: 'Coffee',
        type: 'drink',
        ingredients: ['coffee', 'water', 'milk'],
        price: 2.99,
      },
      {
        id: 19,
        name: 'Tea',
        type: 'drink',
        ingredients: ['tea leaves', 'water'],
        price: 2.99,
      },
      {
        id: 20,
        name: 'Water',
        type: 'drink',
        ingredients: ['water'],
        price: 0.99,
      },
    ],
    bar: [
      {
        id: 1,
        name: 'Margarita',
        type: 'cocktail',
        ingredients: ['tequila', 'lime juice', 'orange liqueur'],
        price: 9.99,
      },
      {
        id: 2,
        name: 'Old Fashioned',
        type: 'cocktail',
        ingredients: ['whiskey', 'bitters', 'sugar cube'],
        price: 10.99,
      },
      {
        id: 3,
        name: 'Mojito',
        type: 'cocktail',
        ingredients: ['rum', 'mint leaves', 'lime juice', 'sugar'],
        price: 11.99,
      },
      {
        id: 4,
        name: 'Cosmopolitan',
        type: 'cocktail',
        ingredients: ['vodka', 'cranberry juice', 'lime juice', 'cointreau'],
        price: 12.99,
      },
      {
        id: 5,
        name: 'Daiquiri',
        type: 'cocktail',
        ingredients: ['rum', 'lime juice', 'sugar'],
        price: 11.99,
      },
      {
        id: 6,
        name: 'Martini',
        type: 'cocktail',
        ingredients: ['gin', 'vermouth', 'olive'],
        price: 8.99,
      },
      {
        id: 7,
        name: 'Pina Colada',
        type: 'cocktail',
        ingredients: ['rum', 'coconut cream', 'pineapple juice'],
        price: 10.99,
      },
      {
        id: 8,
        name: 'Negroni',
        type: 'cocktail',
        ingredients: ['gin', 'vermouth', 'Campari'],
        price: 9.99,
      },
      {
        id: 9,
        name: 'Whiskey Sour',
        type: 'cocktail',
        ingredients: ['whiskey', 'lemon juice', 'simple syrup'],
        price: 10.99,
      },
      {
        id: 10,
        name: 'Mai Tai',
        type: 'cocktail',
        ingredients: ['rum', 'lime juice', 'orange curaçao', 'orgeat syrup'],
        price: 11.99,
      },
      {
        id: 11,
        name: 'Moscow Mule',
        type: 'cocktail',
        ingredients: ['vodka', 'lime juice', 'ginger beer'],
        price: 9.99,
      },
      {
        id: 12,
        name: 'Bloody Mary',
        type: 'cocktail',
        ingredients: ['vodka', 'tomato juice', 'hot sauce', 'celery salt'],
        price: 10.99,
      },
      {
        id: 13,
        name: 'Sangria',
        type: 'cocktail',
        ingredients: ['red wine', 'brandy', 'orange juice', 'fruit'],
        price: 9.99,
      },
      {
        id: 14,
        name: 'Tequila Sunrise',
        type: 'cocktail',
        ingredients: ['tequila', 'orange juice', 'grenadine'],
        price: 8.99,
      },
      {
        id: 15,
        name: 'Blue Lagoon',
        type: 'cocktail',
        ingredients: ['vodka', 'blue curaçao', 'lemonade'],
        price: 9.99,
      },

      {
        id: 16,
        name: 'Amaretto Sour',
        type: 'cocktail',
        ingredients: ['amaretto', 'lemon juice', 'simple syrup'],
        price: 10.99,
      },
      {
        id: 17,
        name: 'Rum and Coke',
        type: 'cocktail',
        ingredients: ['rum', 'cola'],
        price: 7.99,
      },
      {
        id: 18,
        name: 'Screwdriver',
        type: 'cocktail',
        ingredients: ['vodka', 'orange juice'],
        price: 8.99,
      },
      {
        id: 19,
        name: 'Rum and Cola',
        type: 'cocktail',
        ingredients: ['rum', 'cola'],
        price: 4.99,
      },
      {
        id: 20,
        name: 'Vodka Cranberry',
        type: 'cocktail',
        ingredients: ['vodka', 'cranberry juice'],
        price: 3.99,
      },
      {
        id: 21,
        name: 'Gin and Tonic',
        type: 'cocktail',
        ingredients: ['gin', 'tonic water'],
        price: 4.49,
      },
      {
        id: 22,
        name: 'Rum Punch',
        type: 'cocktail',
        ingredients: ['rum', 'fruit juice', 'syrup'],
        price: 4.75,
      },
    ],
    todo: [
      {
        id: 1,
        content: 'Buy groceries',
        notes: 'Get milk, eggs, bread, and cheese.',
        categorisation: {
          type: 'shopping',
          subkeys: ['food', 'household'],
        },
      },
      {
        id: 2,
        content: 'Pay bills',
        notes: 'Pay the electric bill, water bill, and rent.',
        categorisation: {
          type: 'finance',
          subkeys: ['utilities', 'rent'],
        },
      },
      {
        id: 3,
        content: 'Clean the house',
        notes: 'Dust, vacuum, mop, and take out the trash.',
        categorisation: {
          type: 'home',
          subkeys: ['cleaning'],
        },
      },
      {
        id: 4,
        content: 'Do laundry',
        notes: 'Wash, dry, and fold your clothes.',
        categorisation: {
          type: 'home',
          subkeys: ['laundry'],
        },
      },
      {
        id: 5,
        content: 'Grocery shopping',
        notes:
          'Get more milk, eggs, bread, and cheese, as well as other items you need for the week.',
        categorisation: {
          type: 'shopping',
          subkeys: ['food', 'household'],
        },
      },
      {
        id: 6,
        content: 'Cook dinner',
        notes: 'Make a healthy and delicious meal for yourself or your family.',
        categorisation: {
          type: 'cooking',
          subkeys: ['dinner'],
        },
      },
      {
        id: 7,
        content: 'Go for a walk',
        notes: 'Get some exercise and fresh air.',
        categorisation: {
          type: 'health',
          subkeys: ['exercise'],
        },
      },
      {
        id: 8,
        content: 'Read a book',
        notes: 'Relax and escape into a good book.',
        categorisation: {
          type: 'entertainment',
          subkeys: ['books'],
        },
      },
      {
        id: 9,
        content: 'Call a friend',
        notes: "Catch up with someone you haven't talked to in a while.",
        categorisation: {
          type: 'social',
          subkeys: ['friends'],
        },
      },
      {
        id: 10,
        content: 'Plan your weekend',
        notes: 'Decide what you want to do with your free time.',
        categorisation: {
          type: 'leisure',
          subkeys: ['weekend'],
        },
      },
      {
        id: 11,
        content: 'Do some work',
        notes:
          'If you have any work to do, get it done so you can relax on the weekend.',
        categorisation: {
          type: 'work',
          subkeys: ['homework'],
        },
      },
      {
        id: 12,
        content: 'Pay bills',
        notes: 'Make sure all of your bills are paid on time.',
        categorisation: {
          type: 'finance',
          subkeys: ['utilities', 'rent'],
        },
      },
      {
        id: 13,
        content: 'Go to the doctor',
        notes:
          'Get your annual checkup or any other appointments you need to make.',
        categorisation: {
          type: 'health',
          subkeys: ['doctor'],
        },
      },
      {
        id: 14,
        content: 'Volunteer your time',
        notes: 'Help out a local charity or organization.',
        categorisation: {
          type: 'community',
          subkeys: ['volunteering'],
        },
      },
      {
        id: 15,
        content: 'Learn something new',
        notes:
          "Take a class, watch a documentary, or read a book about something you're interested in.",
        categorisation: {
          type: 'education',
          subkeys: ['learning'],
        },
      },
      {
        id: 16,
        content: 'Spend time with loved ones',
        notes: 'Make time for the people you care about.',
        categorisation: {
          type: 'social',
          subkeys: ['friends'],
        },
      },
      {
        id: 17,
        content: 'Take a break',
        notes: 'Take some time for yourself to relax and recharge.',
        categorisation: {
          type: 'self-care',
          subkeys: ['relaxation'],
        },
      },
      {
        id: 18,
        content: 'Meditate',
        notes: 'Clear your mind and focus on the present moment.',
        categorisation: {
          type: 'self-care',
          subkeys: ['meditation'],
        },
      },
      {
        id: 19,
        content: 'Journal',
        notes:
          'Write down your thoughts and feelings to help you process them.',
        categorisation: {
          type: 'self-care',
          subkeys: ['journaling'],
        },
      },
      {
        id: 20,
        content: 'Exercise',
        notes: 'Get your body moving and improve your physical health.',
        categorisation: {
          type: 'health',
          subkeys: ['exercise'],
        },
      },
      {
        id: 21,
        content: 'Eat healthy',
        notes: 'Fuel your body with nutritious foods.',
        categorisation: {
          type: 'health',
          subkeys: ['diet'],
        },
      },
      {
        id: 22,
        content: 'Get enough sleep',
        notes: 'Rest your body and mind so you can function at your best.',
        categorisation: {
          type: 'health',
          subkeys: ['sleep'],
        },
      },
      {
        id: 23,
        content: 'Set goals',
        notes: 'Define what you want to achieve and make a plan to get there.',
        categorisation: {
          type: 'personal development',
          subkeys: ['goals'],
        },
      },
      {
        id: 24,
        content: 'Take risks',
        notes: 'Step outside of your comfort zone and try new things.',
        categorisation: {
          type: 'personal development',
          subkeys: ['risk-taking'],
        },
      },
      {
        id: 25,
        content: 'Learn from your mistakes',
        notes: "Don't dwell on the past, but use it as an opportunity to grow.",
        categorisation: {
          type: 'personal development',
          subkeys: ['mistakes'],
        },
      },
      {
        id: 26,
        content: 'Be grateful',
        notes:
          'Take some time each day to appreciate the good things in your life.',
        categorisation: {
          type: 'personal development',
          subkeys: ['gratitude'],
        },
      },
      {
        id: 27,
        content: 'Help others',
        notes: 'Make a difference in the world by helping others.',
        categorisation: {
          type: 'community',
          subkeys: ['helping others'],
        },
      },
    ],
  },
};

export default data;
