const qs = require('querystring');
const got = require('got');

function randomRange(beg, end) {
  return Math.floor(Math.random() * (end - beg)) + beg;
}

const pushes = [];

for (let i = 0; i < 100; i++) {
  const query = qs.stringify({
    Action: 'SendMessage',
    Version: '2012-11-05',
    MessageBody: JSON.stringify({
      userId: randomRange(1, 100),
      advertId: randomRange(1, 100),
    }),
  });
  got(`https://sqs.us-west-1.amazonaws.com/952037103357/adverts-likes/?${query}`);
}

Promise.all(pushes);
