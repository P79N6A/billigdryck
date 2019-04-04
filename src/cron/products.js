const request = require('request');
const { CronJob } = require('cron');
const utils = require('../utils');

const getAndDownloadProducts = (callback) => {
  const URL = 'https://www.systembolaget.se/api/assortment/products/xml';
  try {
    request(URL, (err, res, body) => {
      if (err) {
        throw err;
      }
      const { name, converted } = utils.convert(body);
      utils.saveRawFile(name, converted);

      const diff = utils.compare();
      callback(diff);
    });
  } catch (error) {
    // TODO: Log...
    console.log(' error - ', error);
  }
};

/**
Seconds: 0-59
Minutes: 0-59
Hours: 0-23
Day of Month: 1-31
Months: 0-11 (Jan-Dec)
Day of Week: 0-6 (Sun-Sat)
 */

// Run this every hour
const job = new CronJob('* * 1 * * *', (() => {
  console.log(`${new Date().toISOString()} You will see this message every hour`);
  getAndDownloadProducts((delta) => {
    console.log('Download success ', delta);
    const filename = `${+new Date()}.json`;
    utils.saveDelta(filename, JSON.stringify(delta, null, 2));
  });
}), null, false, null, null, true);

job.start();
