import chai from 'chai';
import AllBookings from '../src/classes/AllBookings-class';
import Customer from '../src/classes/customer-class';
import AllRooms from '../src/classes/allRooms-class';
import allBookingsData from '../src/data/allBookings-data';
import customerData from '../src/data/customer-data';
import allRoomsData from '../src/data/allRooms-data';
const expect = chai.expect;

describe('Customer', function() {
  let customer1;
  let customer2;
  let customer3;
  let allBookings1;
  let date;
  beforeEach(function() {
      customer1 = new Customer(customerData[0]);
      customer2 = new Customer(customerData[1]);
      customer3 = new Customer(customerData[2]);
      allBookings1 = new AllBookings(allBookingsData);
      date = allBookings1.getTodayDate();
      allBookings1.sortBookings(date);
  });
  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should instantiate single customer data',function(){
    expect(customer1).to.be.an.instanceOf(Customer);
  });

  it('should have an id', function() {
    expect(customer3.id).to.equal(3);
  });

  it('should be able to have a different id',function(){
    expect(customer1.id).to.equal(1);
  });

  it('should have a name', function() {
    expect(customer1.customerName).to.equal('Leatha Ullrich');
  });

  it('should be able to have a different name',function(){
    expect(customer2.customerName).to.equal('Rocio Schuster');
  });

  it('should be able to get a list of the customer\'s upcoming bookings',function(){
    customer1.getBookings(allBookings1.allUpcomingBookings, 'future');

    customer2.getBookings(allBookings1.allUpcomingBookings, 'future');

    expect(customer1.upcomingBookings).to.deep.equal([
      {
        id: '5fwrgu4i7k55hl6sz',
        userID: 1,
        date: '2023/04/22',
        roomNumber: 1
      }
    ]);
    expect(customer2.upcomingBookings).to.deep.equal([
        {
          id: '5fwrgu4i7k55hl6tb',
          userID: 2,
          date: '2022/12/06',
          roomNumber: 5
        }
      ]);
  });

  it('should be able to get a list of the customer\'s past bookings',function(){
    customer2.getBookings(allBookings1.allPastBookings, 'past');
    customer3.getBookings(allBookings1.allPastBookings, 'past');

      expect(customer2.pastBookings).to.deep.equal([
        {
          id: '5fwrgu4i7k55hl6ta',
          userID: 2,
          date: '2022/01/11',
          roomNumber: 2
        }
      ]);
    expect(customer3.pastBookings).to.deep.equal([]);
  });

  it('should be able to get a list of the customer\'s all bookings',function(){
    customer1.getBookings(allBookings1.allBookings, 'all');
    customer2.getBookings(allBookings1.allBookings, 'all');
    customer3.getBookings(allBookings1.allBookings, 'all');
    expect(customer1.allBookings).to.deep.equal([
      {
        id: '5fwrgu4i7k55hl6sz',
        userID: 1,
        date: '2023/04/22',
        roomNumber: 1
      },
      {
        id: '5fwrgu4i7k55hl6t8',
        userID: 1,
        date: '2022/02/05',
        roomNumber: 5
      }
    ]);
    expect(customer2.allBookings).to.deep.equal([
      {
        id: '5fwrgu4i7k55hl6ta',
        userID: 2,
        date: '2022/01/11',
        roomNumber: 2
      },
      {
        id: '5fwrgu4i7k55hl6tb',
        userID: 2,
        date: '2022/12/06',
        roomNumber: 5
      }
    ]);
    expect(customer3.allBookings).to.deep.equal([
      {
        id: '5fwrgu4i7k55hl6t9',
        userID: 3,
        date: '2023/12/14',
        roomNumber: 1
      }
    ]);  
  });

  it('should be able to get a total amount spent on all  bookings',function(){
    customer1.getBookings(allBookings1.allBookings, 'all');
    customer2.getBookings(allBookings1.allBookings, 'all');
    customer3.getBookings(allBookings1.allBookings, 'all');
    let allRooms1 = new AllRooms(allRoomsData)
    customer1.getTotalAmountSpent(allRooms1);
    customer2.getTotalAmountSpent(allRooms1);
    customer3.getTotalAmountSpent(allRooms1);
    expect(customer1.totalAmountSpent).to.equal('698.57');
    expect(customer2.totalAmountSpent).to.equal('817.55');
    expect(customer3.totalAmountSpent).to.equal('358.40');
  });
});