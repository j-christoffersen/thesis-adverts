/* eslint-disable no-new, prefer-destructuring */

const util = require('util');
const qs = require('querystring');
const cron = require('cron');
const got = require('got');
const axios = require('axios');
const request = util.promisify(require('request'));
const parseString = util.promisify(require('xml2js').parseString);

const model = require('../database/models');

let emptyResponse = false;

// speed testing
let entriesAdded = 0;
let messageNumCounter = 0;
let t0;

const poll = () => {
  let receiptHandle;

  const query = qs.stringify({
    Action: 'ReceiveMessage',
    MaxNumberOfMessages: '1',
    Version: '2012-11-05',
  });

  return request(`https://sqs.us-west-1.amazonaws.com/952037103357/adverts-likes/?${query}`)
    .then(response => parseString(response.body))
    .then((data) => {
      const messageNum = messageNumCounter++;

      if (
        !data
          .ReceiveMessageResponse
          .ReceiveMessageResult[0]
      ) {
        console.log('no data');
        emptyResponse = true;
        return null;
      }

      const stopCount = 100;
      if (entriesAdded > stopCount) {
        const t1 = process.hrtime();
        console.log('total time:', t1[0] - t0[0]);
        console.log('wps:', stopCount / (t1[0] - t0[0]));
        return null;
      }

      if (!emptyResponse) {
        poll();
      }

      receiptHandle = data
        .ReceiveMessageResponse
        .ReceiveMessageResult[0]
        .Message[0]
        .ReceiptHandle[0];

      console.log('message', messageNum, data
        .ReceiveMessageResponse
        .ReceiveMessageResult[0]
        .Message[0]
        .Body[0]);

      // let writeToDB;
      // try {
      //   const like = JSON.parse(data
      //     .ReceiveMessageResponse
      //     .ReceiveMessageResult[0]
      //     .Message[0]
      //     .Body[0]);

      //   writeToDB = model.Like.create(like)
      //     .catch(() => {
      //       console.log('could not write to db');
      //     });
      // } catch (error) {
      //   if (error instanceof SyntaxError) {
      //     writeToDB = Promise.resolve(null);
      //   } else {
      //     throw error;
      //   }
      // }

      // console.log('writing...', messageNum);
      // return writeToDB
      //   .then(() => {
      //     console.log('written', messageNum);
      //     const deleteQuery = qs.stringify({
      //       Action: 'DeleteMessage',
      //       Version: '2012-11-05',
      //       ReceiptHandle: receiptHandle,
      //     });

      //     console.log('deleting...', messageNum);
      //     return got(`https://sqs.us-west-1.amazonaws.com/952037103357/adverts-likes/?${deleteQuery}`);
      //   })
      //   .then(() => {
      //     console.log('deleted', messageNum);
      //     // speed testing
      //     entriesAdded += 1;
      //     console.log(entriesAdded);

      //     // poll();
      //   });
    })
    .catch((error) => {
      if (error.code === 'ETIMEDOUT') {
        console.log('err', Math.random());
        poll();
      } else {
        throw error;
      }
    });
};

const poolSize = 10;
t0 = process.hrtime();
for (let i = 0; i < poolSize; i++) {
  poll();
}

// new cron.CronJob('*/10 * * * * *', () => {
//   if (!polling) {
//     poll();
//   }
// }, null, true, 'America/Los_Angeles');
