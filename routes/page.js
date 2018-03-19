var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
const logger = require("../log").logger;

/* GET users listing. */
router.get('/:url', function (req, res, next) {
    try{
        var url = req.params.url;
        logger.info("function begin");
        (async () => {
            const browser = await puppeteer.launch();
            logger.info("puppeteer.launch()");
            const page = await browser.newPage();
            await page.goto(url);
            logger.info("page.goto(%s)", url);
            const textContent = await page.evaluate(() => {
                var page_content =  document.querySelector('html').innerHTML;
                //logger.info("get url content ok");
                return page_content;
            });
            logger.info("browser.close() begin");
            await browser.close();
            logger.info("send response");
            res.send(textContent);
        })();
        logger.info("function end");
    }catch(err){
        logger.info("function error %s", err)
        res.statusCode = 500
        res.send("");
    }

});

module.exports = router;