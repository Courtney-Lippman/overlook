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
let listOfCustomers;
let allRooms;
let allBookings;
let login;
let currentCustomer;
// DOM Variables -------------------------------------------------------------

// Event Listeners -----------------------------------------------------------

// Functions -----------------------------------------------------------------

function createLogin(username, password) {
    loadData()
    login = new Login(username, password)
    login.createLoginStatus(listOfCustomers)
    currentCustomer = login.currentCustomer;
    console.log('allRooms', allRooms)
    console.log('allBookings',allBookings)
    console.log('currentCustomer',currentCustomer)
    console.log('login', login)
}



function loadData() {
    Promise.all([fetchData('customers'), fetchData('rooms'), fetchData('bookings')])
    .then(allDataList => {
        createDataSets(allDataList);
    })
    .catch(error => {
        displayGetError(error);
    })
}

function createDataSets(allDataList) {
    listOfCustomers = allDataList[0];
    allRooms = new AllRooms(allDataList[1]);
    allBookings = new AllBookings(allDataList[2]);
}




