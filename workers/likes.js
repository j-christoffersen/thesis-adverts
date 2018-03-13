/* eslint-disable no-new, prefer-destructuring */

const util = require('util');
const qs = require('querystring');
const cron = require('cron');
const got = require('got');
const parseString = util.promisify(require('xml2js').parseString);

const model = require('../database/models');

new cron.CronJob('*/10 * * * * *', () => {
  let receiptHandle;
  got('https://sqs.us-west-1.amazonaws.com/952037103357/adverts-likes/?Action=ReceiveMessage&MaxNumberOfMessages=5&Version=2012-11-05')
    .then(response => parseString(response.body))
    .then((data) => {
      if (
        !data
          .ReceiveMessageResponse
          .ReceiveMessageResult[0]
      ) {
        console.log('queue empty');
        return null;
      }

      receiptHandle = data
        .ReceiveMessageResponse
        .ReceiveMessageResult[0]
        .Message[0]
        .ReceiptHandle[0];

      console.log('message', data
        .ReceiveMessageResponse
        .ReceiveMessageResult[0]
        .Message[0]
        .Body[0]);

      let writeToDB;
      try {
        const like = JSON.parse(data
          .ReceiveMessageResponse
          .ReceiveMessageResult[0]
          .Message[0]
          .Body[0]);

        writeToDB = model.Like.create(like)
          .catch(() => {
            console.log('could not write to db');
          });
      } catch (error) {
        if (error instanceof SyntaxError) {
          writeToDB = Promise.resolve(null);
        } else {
          throw error;
        }
      }

      return writeToDB
        .then(() => got(`https://sqs.us-west-1.amazonaws.com/952037103357/adverts-likes/?Action=DeleteMessage&Version=2012-11-05&ReceiptHandle=${qs.escape(receiptHandle)}`));
    })
    .then(() => {
      console.log('done');
    });
}, null, true, 'America/Los_Angeles');
