This is JetPackers, an application to provide another way of international delivery by enabling travelers to transport items while they are already 
traveling.
---

**INSTALLATION GUIDE**  
requirement: node needs to be installed (v.16.14.0)
1. Install & Run Backend
   1. `cd ./backend/`
   2. `npm i`
   3. `npm start`
1. Install & Run Frontend
   1. `cd ./frontend/`
   2. `npm i`
   3. `npm start`
4. open [localhost:4000](http://localhost:4000/)
5. open the admin page and use buttons to
    1. initialize the db
    2. load sample data into the db (click only once)
---
**USER STORIES**   
++ *To follow a more user-centered approach I created user stories for a better understanding of the needs and desires of users from my app.* ++
1. As a user I want to search for possible trips so that I can find a fitting trip to my desired location in order to let another person transport my item.
2. As a user I want to see all important information about a trip so that I can decide if it matches with what I need
3. As a user I want to create an item so that I can add it to a trip.
4. As a user I want to edit or delete the item that I previously created so that I can make changes, fix mistakes or remove items that I no longer need.
5. As a user I want to see the trips that I have booked so that I have a better overview about my bookings.

specifically for trip providers:
1. As a user I want to create trips so that people can see from where to where I am going and so that others can add items for delivery.
2. As a user I want to add a price to my trip so that I can specify how much money I want to get paid for a delivery
3. As a user I want to edit or delete the trip that I previously created so that I can make changes, fix mistakes or remove the trip if my plans changed.
---
**USER FLOW**  
++ *These are most of the functionalities and how a user would navigate through the app.* ++
- sign up/sign in to the page
    - use “Sign Up”/”Sign In” tab
    - when signed in, the tabs "Account" and "Sign Out" are visible
    - *note: if a user is not signed in, they can only search for trips and nothing else.*
    - *note: if a user is not signed in and clicks on "Requested Trips" or "Provided Trips" they will be redirected to the "Sign Up" page*
- view user account in the “Account” tab
    - the user can also update the payment method here
- click on Jetpackers logo to redirect to main page (http://localhost:4000/)
- user searches for trips on the main page
    - e.g. Berlin - Frankfurt, 15/03/2024
    - e.g. Hamburg - London, 17/03/2024
- redirect to booking page
    - shows all entries according to search parameters
    - *note: the booking page will not show your own created trips*
- user clicks on a trip
    - opens a dialog where the user can add an item
    - user can request the transaction, only if an item was added
- view all requested trips
    - user clicks on the “Requested Trips” tab in header
    - shows the state of all your requested trips
  
additional features for trip providers:
- open “Provided Trips” tab
    - view all your provided trips
    - if there is a request, click “view requests” button to manage user requests
    - change state of the request (pending(default), accepted, rejected)
    - the user can deactivate a trip by clicking the "deactivate trip" button
      - deactivated trips will no longer accept new user requests
      - past requests can still be viewed
    - create new trip by clicking the "offer a new trip" button
 ---
**TEST USERS**  
++ *You can sign in as a test user to test more features. Use email and password123 to sign in.* ++
- Smith, John - smith.john@example.com - password123
- Doe, Jane - doe.jane@example.com - password123
- Brown, Michael - brown.michael@example.com - password123
- Davis, Jessica - davis.jessica@example.com - password123
- Wilson, Emily - wilson.emily@example.com - password123
---
additional info:
- when reinitializig the database but you are already signed in as user → first logout or clear local storage from browser (since the login token is saved in the browser this may cause an error)
- if the database is already created and needs to be restarted → close backend, delete db manually (./backend/jetpackers.db), npm start backend
