module.exports = {
  advertisers: [
    { id: 1, name: 'coke' },
    { id: 2, name: 'apple' },
    { id: 3, name: 'orbitz' },
    { id: 4, name: 'totinos' },
    { id: 5, name: 'ableton' },
  ],

  adverts: [
    { id: 1, advertiserId: 1, body: 'Drink Coca-Cola' },
    { id: 2, advertiserId: 1, body: 'Vince Staples says Drink Sprite' },
    { id: 3, advertiserId: 2, body: 'iPhone X2 starting at $1,000,000' },
    { id: 4, advertiserId: 2, body: 'capture memories with iPhone X\'s new camera' },
    { id: 5, advertiserId: 3, body: 'save on flights with Orbitz' },
    { id: 6, advertiserId: 3, body: 'fly to the midwest and come see all the cows' },
    { id: 7, advertiserId: 4, body: 'shred some gnar with totinos' },
    { id: 8, advertiserId: 4, body: 'ranch it up with totinos' },
    { id: 9, advertiserId: 5, body: 'check out abletons new thing' },
    { id: 10, advertiserId: 5, body: 'make some music dude' },
  ],

  categories: [
    { id: 1, name: 'food' },
    { id: 2, name: 'technology' },
    { id: 3, name: 'cattle' },
    { id: 4, name: 'music' },
    { id: 5, name: 'travel' },
  ],

  categorizations: [
    { id: 1, advertId: 1, categoryId: 1 },
    { id: 2, advertId: 2, categoryId: 1 },
    { id: 3, advertId: 2, categoryId: 4 },
    { id: 4, advertId: 3, categoryId: 2 },
    { id: 5, advertId: 4, categoryId: 2 },
    { id: 6, advertId: 4, categoryId: 5 },
    { id: 7, advertId: 5, categoryId: 5 },
    { id: 8, advertId: 6, categoryId: 5 },
    { id: 9, advertId: 6, categoryId: 3 },
    { id: 10, advertId: 7, categoryId: 1 },
    { id: 11, advertId: 8, categoryId: 1 },
    { id: 12, advertId: 9, categoryId: 4 },
    { id: 13, advertId: 9, categoryId: 2 },
    { id: 14, advertId: 10, categoryId: 4 },
  ],

  likes: [
    { id: 1, userId: 1, advertId: 1 },
    { id: 2, userId: 1, advertId: 2 },
    { id: 3, userId: 2, advertId: 3 },
    { id: 4, userId: 2, advertId: 1 },
    { id: 5, userId: 3, advertId: 3 },
    { id: 6, userId: 3, advertId: 4 },
  ],

};
