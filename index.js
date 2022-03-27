const puppeteer = require('puppeteer');
const args = process.argv.slice(2);
const debug = parseInt(args[0]);

(async () => {
    // 1. LAUNCH BROWSER
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 2. GO TO PAGE
    await page.goto('https://act.ucsd.edu/scheduleOfClasses/scheduleOfClassesStudent.htm', {waitUntil: 'networkidle0'});
    if(debug){
        await page.screenshot({ path: './screenshots/landedatpage.png' });
    }

    // SIDE NOTE FIND OUT HOW MANY QUARTERS HAVE AVAILABLE DATA
    const num_of_quarters = await page.$eval('#selectedTerm', select=>select.length);
    console.log(num_of_quarters);

    // 3.1 SELECT ALL THE CLASSES
    const subjectlist = await page.$eval('#selectedSubjects', select=>select.options[0].selected);
    console.log(subjectlist);

    await browser.close();
})();