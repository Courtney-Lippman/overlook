//Imports--------------------------------------------------------------------
import './css/styles.css';
import Customer from "./classes/customer-class";
import Login from './classes/login-class';
import AllRooms from './classes/allRooms-class';
import AllBookings from './classes/AllBookings-class';
import { fetchData, postData } from './apiCalls';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// Global Variables ----------------------------------------------------------
let customersData;
let allRoomsData;
let allBookingsData;
let allRooms;
let allBookings;
let currentCustomer;
let login;
// DOM Query Selectors -------------------------------------------------------------
//Dashboard Query Selectors --------------
const datePickerInput = document.querySelector('#date-selector');
const findRoomButton = document.querySelector('.search-avail-button-js');
const totalSpentTxt = document.querySelector('.total-spent-txt');
const thumbnailsUpcomingSection = document.querySelector('.thumbnails-of-upcoming-section-js');
const thumbnailsPastSection = document.querySelector('.thumbnails-of-past-section-js');
// Availible Rooms Query Selectors -------------

//Fetch/Promise Functions -------------------


// Event Listeners -----------------------------------------------------------
//Dashboard Event Listeners  --------------
    window.addEventListener('load', pageLoad)
    findRoomButton.addEventListener('click', displayAvailRooms)
// datePickerInput.addEventListener('click', );
// findRoomButton.addEventListener('click');
// Functions -----------------------------------------------------------------

// function createLogin(username, password) {
//     loadData('.')
//     login = new Login(username, password)
//     login.createLoginStatus(listOfCustomers)
//     currentCustomer = login.currentCustomer;
//     console.log('allRooms', allRooms)
//     console.log('allBookings',allBookings)
//     console.log('currentCustomer',currentCustomer)
//     console.log('login', login)
// }


function pageLoad() {
    Promise.all([fetchData('customers'), fetchData('rooms'), fetchData('bookings')])
    .then((allDataList) => {
    
        customersData = allDataList[0].customers;
            allRoomsData = allDataList[1].rooms;
            allBookingsData = allDataList[2].bookings;
            console.log('customersData', customersData)
            console.log('allRoomsData', allRoomsData )
            console.log('allBookingsData', allBookingsData)
            createInstances(allRoomsData, allBookingsData, customersData)
            displayTotal()

        
    })
    .catch(error => {
        console.log('error',error);
    })
    
}

function createInstances(allRoomsData, allBookingsData, customersData) {
    let randomIndex;
    console.log('allRoomsData', allRoomsData)
    allRooms = new AllRooms(allRoomsData)
    allBookings = new AllBookings(allBookingsData)
    randomIndex = createRandomIndex(customersData)
    currentCustomer = new Customer(customersData[randomIndex])
    let todaysDate = allBookings.getTodayDate()
    allBookings.sortBookings(todaysDate)
    currentCustomer.getBookings(allBookings.allBookings, 'all')
    currentCustomer.getBookings(allBookings.allPastBookings, 'past')
    currentCustomer.getBookings(allBookings.allUpcomingBookings, 'future')
    displayTotal()
    displayStay(thumbnailsUpcomingSection, currentCustomer.upcomingBookings, 'upcoming')
    displayStay(thumbnailsPastSection, currentCustomer.pastBookings, 'past')
}

function createRandomIndex(allCustomers) {
    return Math.floor(Math.random() * allCustomers.length);
  }

function displayTotal() {
    currentCustomer.getTotalAmountSpent(allRooms)
   return totalSpentTxt.innerText = `$${currentCustomer.totalAmountSpent}`
}

function displayStay(domVar, bookingList, stayType) {
    let staySection = "";
    bookingList.forEach(booking => {
         staySection += `<div class="single-avail-room single--stay-js">
        <ul class="single-avail-room-list single-${stayType}-stay-list-js">
          <li class="details booking-id">Booking ID: ${booking.id}</li>
          <li class="details booking-date">Booking Date: ${booking.date}</li>
          <li class="details booking-room">Room Number: ${booking.roomNumber}</li>
        </ul>
      </div>`
    });

    return domVar.innerHTML = staySection;
}

//Event Listener Functions (outside of load)


function displayAvailRooms(event) {
    //may be an issue that our promise is in the displayPage function above
event.preventDefault()
let userInput = datePickerInput.value;
console.log('userInput', userInput)
let availBookingsList
// console.log('gothrough?', allBookings)
// console.log('allRooms', allRooms.allRooms)
availBookingsList = allBookings.sortAllAvailibleRooms(userInput, allRooms.allRooms)
console.log('availBookingsList', availBookingsList)


}