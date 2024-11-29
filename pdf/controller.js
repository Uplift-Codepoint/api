import puppeteer from "puppeteer"

const webURL = "http://localhost:3000/downloads/s001";

const optionsPDF = {width: 793.7, height: 1122.52};

async function puppeteerPDF (webURL, optionsPDF){

    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-infobars', 
            '--window-position=0,0',
            '--ignore-certifcate-errors', 
            '--ignore-certifcate-errors-spki-list', 
            '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36',
            '--disable-features=HttpsUpgrades']
    })

    const coverpage = await browser.newPage();

    await coverpage.goto(webURL);

    const pdfbuffer = await coverpage.pdf({
        printBackground: true,
        width: optionsPDF.width,
        height: optionsPDF.height
    });

    return pdfbuffer;
}

async function createPDF(req, res){

    await puppeteerPDF(webURL, optionsPDF).then((pdfdata) => {
        res.set({
        'Content-Type': 'application/pdf'
    });
        res.status(201).send(Buffer.from(pdfdata, 'binary'));

    }).catch((error) => {
        console.log(error)
    })
}

module.exports.createPDF = createPDF;