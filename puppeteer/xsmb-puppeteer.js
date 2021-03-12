const puppeteer = require("puppeteer");

let browser;
let page;

const xsmb = {
  initialize: async (data) => {
    const url = `http://ketqua.net/xo-so-truyen-thong.php?ngay=${data.date}`;
    browser = await puppeteer.launch({
      headless: true,
    });
    page = await browser.newPage();
    page.setViewport({ width: 1000, height:560 });
    await page.goto(url);
    page.evaluate(_ => {
        window.scrollBy(0, window.innerHeight);
      });
    await page.screenshot({
        type: 'png',
        path: './puppeteer/screenshot.png',
        fullPage: true,
    })
  },
  get_data: async () => {
    let result = await page.evaluate(()=>{
        return {
            date: document.querySelector('#result_date').innerText,
            ki_tu: document.querySelector('#rs_8_0').innerText,
            dac_biet: document.querySelector('#rs_0_0').innerText,
            giai_nhat: document.querySelector('#rs_1_0').innerText,
            giai_hai: [
                document.querySelector('#rs_2_0').innerText,
                document.querySelector('#rs_2_1').innerText
            ],
            giai_ba: [
                document.querySelector('#rs_3_0').innerText,
                document.querySelector('#rs_3_1').innerText,
                document.querySelector('#rs_3_2').innerText,
                document.querySelector('#rs_3_3').innerText,
                document.querySelector('#rs_3_4').innerText,
                document.querySelector('#rs_3_5').innerText,
            ],
            giai_tu: [
                document.querySelector('#rs_4_0').innerText,
                document.querySelector('#rs_4_1').innerText,
                document.querySelector('#rs_4_2').innerText,
                document.querySelector('#rs_4_3').innerText,
            ],
            giai_nam: [
                document.querySelector('#rs_5_0').innerText,
                document.querySelector('#rs_5_1').innerText,
                document.querySelector('#rs_5_2').innerText,
                document.querySelector('#rs_5_3').innerText,
                document.querySelector('#rs_5_4').innerText,
                document.querySelector('#rs_5_5').innerText,
            ],
            giai_sau: [
                document.querySelector('#rs_6_0').innerText,
                document.querySelector('#rs_6_1').innerText,
                document.querySelector('#rs_6_2').innerText,
            ],
            giai_bay: [
                document.querySelector('#rs_7_0').innerText,
                document.querySelector('#rs_7_1').innerText,
                document.querySelector('#rs_7_2').innerText,
                document.querySelector('#rs_7_3').innerText,
            ],
        }
    })
    await page.waitForTimeout(5000);
    return result;
  },
  end: async () => {
      await browser.close();
  }
};
module.exports = xsmb;