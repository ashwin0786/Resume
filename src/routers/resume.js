const express = require('express');
const puppeteer = require('puppeteer');
const hbs = require('hbs');

const router = express.Router();

router.get('/resume-pdf', async (req, res) => {
    res.render('resume-pdf');
});

router.get('/resume', async (req, res) => {
    try{
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.goto('http://localhost:3001/resume-pdf', { waitUntil: 'networkidle0', timeout: 10000});
        const pdf = await page.pdf({
            format: 'A4',
            margin: { top: 50, bottom: 50, left: 30, right: 30 }
        });

        await browser.close();
        res.set({ 'Content-Length': pdf.length});
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'filename=Resume.pdf');
        return res.send(pdf);
    } catch(error){
        console.log(error);
        res.status(400).send();
    }
});

router.get('/cover-letter-pdf', async (req, res) => {
    res.render('cover-pdf');
});

router.get('/cover-letter', async (req, res) => {
    try{
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.goto('http://localhost:3001/cover-letter-pdf', { waitUntil: 'networkidle0', timeout: 10000});
        const pdf = await page.pdf({
            format: 'A4',
            margin: { top: 50, bottom: 50, left: 30, right: 30 }
        });

        await browser.close();
        res.set({ 'Content-Length': pdf.length});
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'filename=Cover-letter.pdf');
        return res.send(pdf);
    } catch(error){
        console.log(error);
        res.status(400).send();
    }
});

module.exports = router;