const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');
require('dotenv').config();

const model = require('../database/models');

AWS.config.update({
  region: 'us-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// TESTING
let messages = 0;
const totalMessages = 100;
const t0 = process.hrtime();

const testCB = () => {
  messages++;
  if (messages >= totalMessages) {
    const t1 = process.hrtime();
    console.log('total time:', t1[0] - t0[0]);
    console.log('wps:', totalMessages / (t1[0] - t0[0]));
    app.stop();
  }
};

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-1.amazonaws.com/952037103357/adverts-likes',
  handleMessage: (message, done) => {
    console.log('1');
    let like;
    try {
      like = JSON.parse(message.Body);
    } catch (error) {
      if (error instanceof SyntaxError) {
        done();
        return;
      }

      throw error;
    }

    model.Like.create(like)
      .catch((error) => {
        console.log('cant enter', error);
      })
      .then(() => {
        testCB();
        console.log('i did it');
        done();
      });
  },
  sqs: new AWS.SQS(),
});

app.on('error', (err) => {
  console.log('err', err.message);
});

app.start();
