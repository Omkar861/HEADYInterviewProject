
const {createPage} = require('./setups/broswersetup')
const {URLS} = require('./Config/urls')
const {formatAgodaDate} = require('./Utilis')

 async function getPriceFromAgoda(hotelName,checkIn,checkOut) {
//(async () => {
    const { browser, page } = await createPage();

    await page.goto(URLS.agoda);

    const cleanedName = hotelName.split(',')[0].trim();

  await page.getByRole('combobox', { name: 'Enter a destination or' }).fill(cleanedName);


  await page.locator('[data-testid="topDestinationListItem"]').first().click();
  
  const  checkInstr = formatAgodaDate(checkIn);
  const checkoutstr = formatAgodaDate(checkOut);

  await page.getByRole('button', { name: checkInstr }).click();
  await page.getByRole('button', { name: checkoutstr }).click();
    await page.getByRole('button', { name: 'Add Children' }).click();
  await page.getByLabel('', { exact: true }).click();
  await page.getByTestId('child-ages-dropdown-0-1').getByTestId('title').click();
  await page.getByRole('button', { name: 'SEARCH' }).click();


  const hotelCard = await page.locator('[data-element-name="property-card-info"]').first();
   const hotelname = await hotelCard.locator('[data-selenium="hotel-name"]').innerText();
   const priceBlock = page.locator('[data-element-name="fpc-room-price"]').first();
  const currency = await priceBlock.locator('[data-selenium="hotel-currency"]').innerText();
  const amount = await priceBlock.locator('[data-selenium="display-price"]').innerText();

const rawPrice = `${currency} ${amount}`;
console.log(rawPrice);

   console.log(" Top Hotel Found:");
   console.log("Hotel:", hotelname);
   console.log("Price:", rawPrice);



   await browser.close();

   return {
     site: 'Agoda',
     hotelname,
     price:rawPrice
   };
}
module.exports = { getPriceFromAgoda };
//})();
