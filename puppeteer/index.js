const xsmb = require('./xsmb-puppeteer');

(async () => {
    await xsmb.initialize();
    let data = await xsmb.get_data();
    console.log(data);
    await xsmb.end();
})();