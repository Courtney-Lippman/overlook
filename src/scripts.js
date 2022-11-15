//Imports--------------------------------------------------------------------
import './css/styles.css';
import Login from './classes/login-class';
import AllRooms from './classes/allRooms-class';
import AllBookings from './classes/AllBookings-class';
import { fetchData, postData } from './apiCalls';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './images/flower.png';

// Global Variables ----------------------------------------------------------
let customersData;
let allRoomsData;
let allBookingsData;
let allRooms;
let allBookings;
let currentCustomer;
let todaysDate;
let selectedDate;
let login;

// DOM Query Selectors -------------------------------------------------------------
// Login Query Selectors -------------
const loginMain = document.querySelector('.login-container-js');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const signInButton = document.querySelector('.sign-in-button-js');
const loginSection = document.querySelector('.input-section-js');
const loginErrorSection = document.querySelector('.login-error-section-js');
//Dashboard Query Selectors --------------
const DashboardPage = document.querySelector('.dash-main-js');
const welcomeTxt = document.querySelector('.welcome-txt-js');
const datePickerInput = document.querySelector('#date-selector');
const datePickerAlertWrapper = document.querySelector('.date-select-alert-wrapper-js');
const datePickerAvailAlertWrapper = document.querySelector('.date-select-avail-alert-wrapper-js');
const findRoomButton = document.querySelector('.search-avail-button-js');
const totalSpentTxt = document.querySelector('.total-spent-txt');
const thumbnailsUpcomingSection = document.querySelector('.thumbnails-of-upcoming-section-js');
const thumbnailsPastSection = document.querySelector('.thumbnails-of-past-section-js');
const attriButton = document.querySelector('.attri-button-js')
// Availible Rooms Query Selectors -------------
const thumbnailsAvailSection = document.querySelector('.avail-room-full-displays-js');
const availibleRoomsPage = document.querySelector('.availible-main-js');
const goBackButton = document.querySelector('.go-to-dash-button-js');
const allRoomTypesFilterOptions = document.querySelector('.filter-select');
const filterSearchButton = document.querySelector('.filter-button-js');

//Attributions Page Query Selectors -----------
const attributions = document.querySelector('.attributions-js')
const attGoDashButton = document.querySelector('.go-to-dash-button-att-js')

// Event Listeners -----------------------------------------------------------
// Login Event Listeners -------------
window.addEventListener('load', pageLoad);
signInButton.addEventListener('click', verifyCredentials);
//Dashboard Event Listeners  --------------
findRoomButton.addEventListener('click', displayAvailRooms);
goBackButton.addEventListener('click', backToDash);
attriButton.addEventListener('click', displayAtrri)
//Availible Rooms Page Event Listeners ------------
filterSearchButton.addEventListener('click', displayRoomsOfSameType);
thumbnailsAvailSection.addEventListener('click', requestBooking);
//Attributes Page Event Listeners ------------
attGoDashButton.addEventListener('click', displayDashBoard)

// Functions -----------------------------------------------------------------
function pageLoad() {
    Promise.all([fetchData('customers'), fetchData('rooms'), fetchData('bookings')])
    .then((allDataList) => {
            customersData = allDataList[0].customers;
            allRoomsData = allDataList[1].rooms;
            allBookingsData = allDataList[2].bookings;   
    })
    .catch(error => {
        displayGetError(error);
    })   
}

function displayGetError(error) {
    loginMain.innerHTML = `<h1 class="get-error-message">Whoops! Something went wrong. Please try again later! Error: ${error.message}.<h1>`;
};

function verifyCredentials(event) {
    event.preventDefault(event)
    login = new Login(username.value, password.value);
    login.createLoginStatus(customersData);
    if(login.loginStatus === 'accepted') {
        createCustomerInfo();
        displayDashBoard();
    } else {
        displayCredentialError();
    };
};

function displayCredentialError() {
    loginSection.classList.add('hide');
    signInButton.classList.add('hide');
    loginErrorSection.classList.remove('hide');
    setTimeout(resetLogin, 2000);
};

function resetLogin() {
    username.value = '';
    password.value = '';
    loginSection.classList.remove('hide');
    signInButton.classList.remove('hide');
    loginErrorSection.classList.add('hide');

};

function displayDashBoard() {
    loginMain.classList.add('hide');
    DashboardPage.classList.remove('hide');
    attributions.classList.add('hide')
    welcomeTxt.innerText = `Welcome ${currentCustomer.customerName}!`;
};

function createCustomerInfo() {
    allRooms = new AllRooms(allRoomsData);
    allBookings = new AllBookings(allBookingsData);
    currentCustomer = login.currentCustomer;
    todaysDate = allBookings.getTodayDate();
    allBookings.sortBookings(todaysDate);
    currentCustomer.getBookings(allBookings.allBookings, 'all');
    currentCustomer.getBookings(allBookings.allPastBookings, 'past');
    currentCustomer.getBookings(allBookings.allUpcomingBookings, 'future');
    populateTypeFilter();
    displayTotal();
    displayStay(thumbnailsUpcomingSection, currentCustomer.upcomingBookings, 'upcoming');
    displayStay(thumbnailsPastSection, currentCustomer.pastBookings, 'past');
};

function displayTotal() {
    currentCustomer.getTotalAmountSpent(allRooms);
   return totalSpentTxt.innerText = `$${currentCustomer.totalAmountSpent}`;
};

function displayStay(domVar, bookingList, stayType) {
    let staySection = "";
    bookingList.forEach(booking => {
         staySection += `<div class="single-avail-room single--stay-js">
        <ul class="single-avail-room-list single-${stayType}-stay-list-js">
          <li class="details booking-id">Booking ID: ${booking.id}</li>
          <li class="details booking-date">Booking Date: ${booking.date}</li>
          <li class="details booking-room">Room Number: ${booking.roomNumber}</li>
        </ul>
      </div>`;
    })
    return domVar.innerHTML = staySection;
};

function populateTypeFilter() {
    const typesList = allRooms.createListOfRoomTypes();
    allRoomTypesFilterOptions.innerHTML = `<option value="all-room-type">All Room Types</option>`;
    typesList.forEach((type) => {
      allRoomTypesFilterOptions.innerHTML += `
      <option class="tag-options-text hover" value="${type}">${type}</option>
    `;
    });
  };

function displayAvailRooms(event) {
event.preventDefault();
selectedDate = datePickerInput.value;
let userInput = parseInt(selectedDate.replaceAll('-', ''));
console.log('userInput',userInput)
if(userInput < todaysDate || !userInput) {
    datePickerAlertWrapper.classList.remove('hide')
} else {
 allBookings.sortAllAvailibleRooms(userInput, allRooms.allRooms)
createAvailRoomThumbnailsDisplay(allBookings.allAvailableRooms)
};
datePickerInput.value="yyyy-MM-dd";
};

function createAvailRoomThumbnailsDisplay(list) {
    if(list.length > 0) {
        let availRoomsSection = "";
        list.forEach(availRoom => {
            let bidet;
            if(availRoom.bidet) {
                bidet = 'Yes';
            } else if(!availRoom.bidet) {
                bidet = 'No';
            };
            availRoomsSection += `
                <section class="single-avail-room single-avail-room-js">
                    <p class="single-avail-room-title">Room ${availRoom.number}</p>
                    <ul class="single-avail-room-list">
                        <li class="details room-type">Room Type: ${availRoom.roomType}</li>
                        <li class="details room-bidet">Bidet: ${bidet}</li>
                        <li class="details room-bedsize">Bedsize: ${availRoom.bedSize}</li>
                        <li class="details room-numbeds">Number of Beds: ${availRoom.numBeds}</li>
                        <li class="details room-costpernight"> Cost per Night: $${availRoom.costPerNight}</li>
                    </ul>
                    <button class="book-room-button hover" id ="${availRoom.number}">Book</button>
                </section>`;
        });
        DashboardPage.classList.add('hide');
        availibleRoomsPage.classList.remove('hide');
        thumbnailsAvailSection.classList.remove('hide');
        return thumbnailsAvailSection.innerHTML = availRoomsSection;
    } else {
        datePickerAvailAlertWrapper.classList.remove('hide');
    };
};

function displayRoomsOfSameType(event) {
        event.preventDefault();
        let availRoomsFiltered;
        availRoomsFiltered = allBookings.filterByType(allRoomTypesFilterOptions.value)
        if(availRoomsFiltered.length > 0) {
            createAvailRoomThumbnailsDisplay(availRoomsFiltered);
        } else {
            thumbnailsAvailSection.innerHTML = `<p class="no-avail-for-type-alert"> Our deepest apologies! There are currently no rooms available for the room type you selected. Please select a different room type or select the go back to dashboard button and try a different date. We apologize for the inconvenience.</p>`;
        };
      
};

function requestBooking(event) {
    event.preventDefault(event);
    const customerRequest = {
        userID: currentCustomer.id,
        date: selectedDate.replaceAll('-', '/'),
        roomNumber: parseInt(event.target.id)
    };

    postData('bookings', customerRequest)
        .then(response => {
            displayPostSuccess();
            setTimeout(updateBookingsData, 2000);
         
        })
        .catch(error => {
            displayPostError(error);
            setTimeout(redisplayBookingsData, 3000);
        });
};

function updateBookingsData() {
    fetchData('bookings')
    .then(data => {
        allBookings = new AllBookings (data.bookings);
        allBookings.sortBookings(todaysDate);
        allBookings.sortAllAvailibleRooms(parseInt(selectedDate.replaceAll('-', '')), allRooms.allRooms);
        populateTypeFilter();
        redisplayBookingsData();
      });
};

function displayPostSuccess() {
    thumbnailsAvailSection.innerHTML = `<p class="booked-message">The Room Has Been Booked!</p>`;
};

function displayPostError(error) {
    if(error.message[0] === '5') {
        thumbnailsAvailSection.innerHTML = `<p class="booked-message">Whoops! Something is wrong with the server. Please try booking this room again later!</p>`;
    } else {
        thumbnailsAvailSection.innerHTML = `<p class="booked-message">Server cannot process this request. Please try again later!</p>`;
    };
};

function redisplayBookingsData() {
    if(allBookings.allAvailableRooms.length > 0) {
        createAvailRoomThumbnailsDisplay(allBookings.allAvailableRooms);
    } else {
        thumbnailsAvailSection.innerHTML = `<p class="no-avail-for-type-alert"> Our deepest apologies! There are no longer any rooms available for the date you selected. Please select the go back to dashboard button and try a different date. We apologize for the inconvenience.</p>`;
    };
};

function backToDash (event) {
    event.preventDefault(event);
    DashboardPage.classList.remove('hide');
    availibleRoomsPage.classList.add('hide');
    datePickerAlertWrapper.classList.add('hide');
    datePickerAvailAlertWrapper.classList.add('hide');
};

function displayAtrri() {
    DashboardPage.classList.add('hide');
    datePickerAlertWrapper.classList.add('hide');
    datePickerAvailAlertWrapper.classList.add('hide');
    attributions.classList.remove('hide')
}