# Introduction 

Hello My name is Omkar Dalvi. I built an automation script using Playwright to compare hotel prices across multiple platforms like Booking.com, Agoda, and EaseMyTrip.

The goal was to find the lowest price for a 5-night stay for a given city. I first used Booking.com to identify the top-rated 5-star hotel, then searched for the same hotel on other platforms and extracted their prices.

Since each website has a different UI and structure, I handled them separately using modular functions. I also implemented dynamic date selection and handled autosuggest dropdowns by matching hotel names instead of relying on fixed positions.

Finally, I compared the extracted prices and returned the platform offering the lowest price.


# Objective

Find the **lowest listing price** for a 5-night stay (future dates) for:
- 2 adults
- 1 infant (age < 2)

for the **highest-rated 5-star hotel** in a given city.

---

# Websites Used

- Booking.com → To identify the top-rated hotel  
- Agoda → To fetch price  
- EaseMyTrip → To fetch price  

---

## Tech Stack

- JavaScript
- Node.js
- Playwright

---

## How It Works
1. Set city name in main file.
2. Search city on Booking.com  
3. Apply filters (5-star, top-rated)  
4. Extract hotel name  
5. Search same hotel on other platforms  
6. Fetch prices from each site  
7. Compare and print lowest price  

---

## Dynamic Handling

- Dates are generated dynamically (future + 5 nights)
- Handles autosuggest dropdown using text matching
- Works across different cities (e.g., Mumbai, Delhi)

---

## Project Structure
tests/
│── booking.js
│── agoda.js
│── easymytrip.js
│── main.js
│── utils.js
│── setups/
│ └── browsersetup.js
│── Config/
│ └── urls.js


---

## Run the Project

----bash-----
node tests/main.js


## Sample Output
Hotel: Hyatt Centric MG Road Bangalore
Booking → ₹ 53,250
Agoda → Rs. 10,650
EasymyTrip → ₹ 21,266
Lowest Price:
Website: Agoda
Price: Rs. 10,650