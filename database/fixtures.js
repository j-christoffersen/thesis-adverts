module.exports = {
  advertisers: [
    { name: 'coke' },
    { name: 'apple' },
    { name: 'orbitz' },
    { name: 'totinos' },
    { name: 'ableton' },
  ],

  adverts: [
    { advertiserId: 1, body: 'Drink Coca-Cola' },
    { advertiserId: 1, body: 'Vince Staples says Drink Sprite' },
    { advertiserId: 2, body: 'iPhone X2 starting at $1,000,000' },
    { advertiserId: 2, body: 'capture memories with iPhone X\'s new camera' },
    { advertiserId: 3, body: 'save on flights with Orbitz' },
    { advertiserId: 3, body: 'fly to the midwest and come see all the cows' },
    { advertiserId: 4, body: 'shred some gnar with totinos' },
    { advertiserId: 4, body: 'ranch it up with totinos' },
    { advertiserId: 5, body: 'check out abletons new thing' },
    { advertiserId: 5, body: 'make some music dude' },
  ],

  categories: [
    { name: 'food' },
    { name: 'technology' },
    { name: 'cattle' },
    { name: 'music' },
    { name: 'travel' },
  ],

  categorizations: [
    { advertId: 1, categoryId: 1 },
    { advertId: 2, categoryId: 1 },
    { advertId: 2, categoryId: 4 },
    { advertId: 3, categoryId: 2 },
    { advertId: 4, categoryId: 2 },
    { advertId: 4, categoryId: 5 },
    { advertId: 5, categoryId: 5 },
    { advertId: 6, categoryId: 5 },
    { advertId: 6, categoryId: 3 },
    { advertId: 7, categoryId: 1 },
    { advertId: 8, categoryId: 1 },
    { advertId: 9, categoryId: 4 },
    { advertId: 9, categoryId: 2 },
    { advertId: 10, categoryId: 4 },
  ],

  likes: [
    { userId: 1, advertId: 1 },
    { userId: 1, advertId: 2 },
    { userId: 2, advertId: 3 },
    { userId: 2, advertId: 1 },
    { userId: 3, advertId: 3 },
    { userId: 3, advertId: 4 },
  ],

};
