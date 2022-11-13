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
let todaysDate;
let login;
// DOM Query Selectors -------------------------------------------------------------
//Dashboard Query Selectors --------------
const DashboardPage = document.querySelector('.dash-main-js')
const datePickerInput = document.querySelector('#date-selector');
const datePickerAlertWrapper = document.querySelector('.date-select-alert-wrapper-js')
const datePickerAvailAlertWrapper = document.querySelector('.date-select-avail-alert-wrapper-js')
const findRoomButton = document.querySelector('.search-avail-button-js');
const totalSpentTxt = document.querySelector('.total-spent-txt');
const thumbnailsUpcomingSection = document.querySelector('.thumbnails-of-upcoming-section-js');
const thumbnailsPastSection = document.querySelector('.thumbnails-of-past-section-js');

// Availible Rooms Query Selectors -------------
const thumbnailsAvailSection = document.querySelector('.avail-room-full-displays-js');
const availibleRoomsPage = document.querySelector('.availible-main-js')
const goBackButton = document.querySelector('.go-to-dash-button-js')
const allRoomTypesFilterOptions = document.querySelector('.filter-select')
const filterSearchButton = document.querySelector('.filter-button-js')

//Fetch/Promise Functions -------------------


// Event Listeners -----------------------------------------------------------
//Dashboard Event Listeners  --------------
    window.addEventListener('load', pageLoad)
    findRoomButton.addEventListener('click', displayAvailRooms)
    goBackButton.addEventListener('click', backToDash)

//Availible Rooms Page Event Listeners ------------
filterSearchButton.addEventListener('click', displayRoomsOfSameType)

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
            populateTypeFilter()

        
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
    todaysDate = allBookings.getTodayDate()
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

function populateTypeFilter() {
    const typesList = allRooms.createListOfRoomTypes();
    typesList.forEach((type) => {
      allRoomTypesFilterOptions.innerHTML += `
      <option class="tag-options-text hover" value="${type}">${type}</option>
    `;
    });
  }

//Event Listener Functions (outside of load)


function displayAvailRooms(event) {
    //may be an issue that our promise is in the displayPage function above
event.preventDefault()
let userInput = parseInt(datePickerInput.value.replaceAll('-', ''));
if(userInput < todaysDate) {
    datePickerAlertWrapper.classList.remove('hide')
} else {
 allBookings.sortAllAvailibleRooms(userInput, allRooms.allRooms)
createAvailRoomThumbnailsDisplay(allBookings.allAvailableRooms)
DashboardPage.classList.add('hide')
availibleRoomsPage.classList.remove('hide')
console.log('availBookingsList111111', allBookings.allAvailableRooms)
}
datePickerInput.value="yyyy-MM-dd";
};

function createAvailRoomThumbnailsDisplay(list) {
    if(list.length > 0) {
        let availRoomsSection = ""
        list.forEach(availRoom => {
            console.log('availRoom',availRoom)
            let bidet;
            if(availRoom.bidet) {
                bidet = 'Yes'
            } else if(!availRoom.bidet) {
                bidet = 'No'
            }
            availRoomsSection += `
                <div class="single-avail-room single-avail-room-js">
                    <p class="single-avail-room-title">Room ${availRoom.number}</p>
                    <ul class="single-avail-room-list">
                        <li class="details room-type">Room Type: ${availRoom.roomType}</li>
                        <li class="details room-bidet">Bidet: ${bidet}</li>
                        <li class="details room-bedsize">Bedsize: ${availRoom.bedSize}</li>
                        <li class="details room-numbeds">Number of Beds: ${availRoom.numBeds}</li>
                        <li class="details room-costpernight"> Cost per Night: $${availRoom.costPerNight}</li>
                    </ul>
                    <button class="book-room-button">Book</button>
                </div>`
        })
        thumbnailsAvailSection.classList.remove('hide')
        return thumbnailsAvailSection.innerHTML = availRoomsSection
    } else {
        datePickerAvailAlertWrapper.classList.remove('hide')
    }
}

function displayRoomsOfSameType(event) {
        event.preventDefault()
        let availRoomsFiltered;
        availRoomsFiltered = allBookings.filterByType(allRoomTypesFilterOptions.value);
        if(availRoomsFiltered.length > 0) {
            createAvailRoomThumbnailsDisplay(availRoomsFiltered);
        } else {
            thumbnailsAvailSection.innerHTML = `<p class="no-avail-for-type-alert"> Our deepest apologies! There are currently no rooms availible for the room type you selected. Please select a different room type or select the go back to dashboard button and try a different date. We apologize for the inconvenience.</p>`
        }
      
}

function backToDash (event) {
    event.preventDefault(event);
    DashboardPage.classList.remove('hide')
    availibleRoomsPage.classList.add('hide')
    datePickerAlertWrapper.classList.add('hide')
    datePickerAvailAlertWrapper.classList.add('hide')
}


