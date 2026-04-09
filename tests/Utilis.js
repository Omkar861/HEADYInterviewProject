function getFutureDates(daysFromToday = 7, Totalnights = 5) {
  const checkIn = new Date();
  checkIn.setDate(checkIn.getDate() + daysFromToday);

  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + Totalnights);

  return { checkIn, checkOut };
}

function formatBookingDate(date) {
  return date.toISOString().split('T')[0];
}

function formatAgodaDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit'
  }).replace(',', '');
}


module.exports = {
  getFutureDates,
  formatBookingDate,
  formatAgodaDate
};
