
const {createPage} = require('./setups/broswersetup')
const {URLS} = require('./Config/urls')
const {formatBookingDate} = require('./Utilis')
async function getPriceFromEasyTrip(hotelName,checkIn,checkOut) {
  const { browser, page } = await createPage();


  await page.goto(URLS.easemytrip);
  await page.locator('#homepagemenuUL').getByRole('link', { name: 'Hotels' }).click();
  await page.locator('span').filter({ hasText: 'Bangalore' }).click();
  //await page.getByRole('textbox', { name: 'Enter City Name, Location, or' }).click();
  const cleanedName = hotelName.split(',')[0].trim();
  await page.getByRole('textbox', { name: 'Enter City Name, Location, or' }).type(cleanedName);
  await page.getByText(cleanedName).click();
  await page.locator('#htl_dates').click();
  //  const  checkInstr = formatBookingDate(checkIn);
  // const checkoutstr = formatBookingDate(checkOut);

  const checkInDay = String(checkIn.getDate());
const checkOutDay = String(checkOut.getDate());

await page.getByRole('link', { name: checkInDay }).nth(1).click();
await page.getByRole('link', { name: checkOutDay }).first().click();
 
  await page.locator('#Children_room_1_1_plus').click();
  await page.getByRole('link', { name: 'Done' }).click();
  await page.getByRole('button', { name: 'Search' }).click();

   const hotelCard = page.locator('.listing-cvr').first();
   const hotelname = await hotelCard.getByText(hotelName).innerText();
   const hotelpricecard = await hotelCard.locator('.htlprcing');
   const price = await hotelpricecard.locator('.htlprc').first().innerText();

   console.log(" Top Hotel Found:");
   console.log("Hotel:", hotelname);
   console.log("Price:", price);
  
    await page.waitForTimeout(5000);
   await browser.close();

  return {
    site: 'EasymyTrip',
    hotelName,
    price: price
  };
}

module.exports = { getPriceFromEasyTrip };