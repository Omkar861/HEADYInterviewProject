
const {createPage} = require('./setups/broswersetup')
const {URLS} = require('./Config/urls')
const {formatBookingDate} = require('./Utilis')
async function getTopHotel(city,checkOut,checkIn) {

  const { browser, page } = await createPage();


  await page.goto(URLS.booking);

  await page.getByRole('button', { name: 'Dismiss sign in information.' }).click();
  await page.fill('input[name="ss"]', city);

  
await page.getByTestId('occupancy-config').click();

const occupancyBox = await page.getByTestId('occupancy-popup');

const childrenRow = occupancyBox.locator('div').filter({ hasText: /children/i }).first();
await childrenRow.locator('button').nth(3).click();

await page.getByLabel(/Age of child 1 on check-out/i).selectOption('1');
  await page.getByRole('button', { name: 'Done' }).click();

  const  checkInstr = formatBookingDate(checkIn);
  const checkoutstr = formatBookingDate(checkOut);
  await page.getByTestId('searchbox-dates-container').click();
  await page.locator(`[data-date="${checkoutstr}"]`).click();
  await page.locator(`[data-date="${checkInstr}"]`).click();
  
  await page.getByRole('button', { name: 'Search' }).click();
    await page.waitForTimeout(5000);
 const fiveStarFilter = page.locator('[id*="filter_group_class_"]').getByText('5 stars', { exact: true });
await fiveStarFilter.click();
  await page.getByText(/Sort by:/i).click();
  await page.getByText('Property rating (high to low)', { exact: true }).click();


    const hotelCard = page.locator('[data-testid="property-card"]').first();
  const hotelName = await hotelCard.locator('[data-testid="title"]').innerText(); 
  const rawRating = await hotelCard.locator('[data-testid="review-score"]').innerText();
  
  
  const Price = await hotelCard.locator('[data-testid="price-and-discounted-price"]').innerText();

  console.log("Top Hotel Found:");
  console.log("Hotel:", hotelName);
  console.log("Price:", Price);

  await browser.close();
  return {
  site: 'Booking',
  hotelName,
  price: Price
  };
}
module.exports = { getTopHotel };