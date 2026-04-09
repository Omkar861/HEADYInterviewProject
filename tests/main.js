const { getTopHotel } = require('./booking');
const { getPriceFromAgoda } = require('./agoda');
const { getPriceFromEasyTrip } = require('./easymytrip');
const {getFutureDates} = require('./Utilis')
const { checkIn, checkOut } = getFutureDates(7, 5);

(async () => {
  const city = "bengaluru";

  const bookingResult = await getTopHotel(city,checkIn,checkOut);
   const agodaResult = await getPriceFromAgoda(bookingResult.hotelName,checkIn,checkOut);
  const EasyMytripResult = await getPriceFromEasyTrip(bookingResult.hotelName,checkIn,checkOut);

  const results = [bookingResult, agodaResult, EasyMytripResult];

  console.log(results);

  let lowest = results[0];

  for (let i = 1; i < results.length; i++) {
  const currentPrice = getNumber(results[i].price);
  const lowestPrice = getNumber(lowest.price);

  if (currentPrice < lowestPrice) {
    lowest = results[i];
  }
}

  console.log("Hotel:", bookingResult.hotelName);

  results.forEach(r => {
    console.log(`${r.site} → ${r.price}`);
  });

  console.log("Lowest Price:");
  console.log("Website:", lowest.site);
  console.log("Price:", lowest.price);
})();


function getNumber(price) {
  return Number(price.replace(/[^\d]/g, ""));
}