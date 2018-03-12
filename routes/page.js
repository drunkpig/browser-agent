var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

/* GET users listing. */
router.get('/:url', function (req, res, next) {
    var url = req.params.url;
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);
        const textContent = await page.evaluate(() => {
            return document.querySelector('html').innerHTML
        });
        await browser.close();
        res.send(textContent);
    })();

});

module.exports = router;