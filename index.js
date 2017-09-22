const CoinHive = require('coin-hive');
const SITE_KEY = 'NE8dgkNsooD01DR7LxSxR3NV8Sn0VS8z';
const ONE_MINUTE = 60000;

(async () => {
  // Create miner
  const miner = await CoinHive(SITE_KEY, {
    // interval for "update"
    interval: 1000,
    // puppeteer port
    port: 3002,
    // puppeteer host,
    host: 'localhost',
    // number of threads to start with, defaults to navigator.
    // hardwareConcurrency see https://coin-hive.com/documentation/miner#constructor-options
    threads: -1
  });
  
  // Start miner
  await miner.start();
  
  // Listen on events
  miner.on('found', () => console.log('Found!'));
  miner.on('accepted', () => console.log('Accepted!'));
  miner.on('update', data => console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `));
    
  // Stop miner
  setTimeout(async () => await miner.stop(), ONE_MINUTE);
})();