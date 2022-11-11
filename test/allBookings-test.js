import chai from 'chai';
import AllBookings from '../src/classes/AllBookings-class';
import allBookingsData from '../src/data/allBookings-data';
import AllRooms from '../src/classes/allRooms-class';
import allRoomsData from '../src/data/allRooms-data';
const expect = chai.expect;

describe('allBookings', function() {
    let allBookings1;
    beforeEach(function() {
        allBookings1 = new AllBookings(allBookingsData);
    });

    it('should be a function', function() {
        expect(AllBookings).to.be.a('function');
  });

    it('should instantiate bookings data',function(){
		expect(allBookings1).to.be.an.instanceOf(AllBookings);
	});

    it('should accept an all bookings array', function(){
        expect(allBookings1.allBookings).to.deep.equal(allBookingsData);
    });

    it('should get today\'s date', function(){
        expect(allBookings1.getTodayDate()).to.deep.equal(parseInt(new Date().toJSON().slice(0, 10).replaceAll('-', '')))
    });

    it('should sort all bookings into past and upcoming lists based on date', function(){
                const todayDate = allBookings1.getTodayDate();
                allBookings1.sortBookings(todayDate);
                
                expect(allBookings1.allPastBookings).to.deep.equal([
                    {
                      id: '5fwrgu4i7k55hl6t5',
                      userID: 43,
                      date: '2022/01/24',
                      roomNumber: 2
                    },
                    {
                      id: '5fwrgu4i7k55hl6t6',
                      userID: 13,
                      date: '2022/01/10',
                      roomNumber: 3
                    },
                    {
                      id: '5fwrgu4i7k55hl6t7',
                      userID: 20,
                      date: '2022/02/16',
                      roomNumber: 4
                    },
                    {
                      id: '5fwrgu4i7k55hl6t8',
                      userID: 1,
                      date: '2022/02/05',
                      roomNumber: 5
                    },
                    {
                      id: '5fwrgu4i7k55hl6ta',
                      userID: 2,
                      date: '2022/01/11',
                      roomNumber: 2
                    }
                  ]);
                expect(allBookings1.allUpcomingBookings).to.deep.equal([
                    {
                      id: '5fwrgu4i7k55hl6sz',
                      userID: 1,
                      date: '2023/04/22',
                      roomNumber: 1
                    },
                    {
                      id: '5fwrgu4i7k55hl6t9',
                      userID: 3,
                      date: '2023/12/14',
                      roomNumber: 1
                    },
                    {
                        id: '5fwrgu4i7k55hl6tb',
                        userID: 2,
                        date: '2022/12/06',
                        roomNumber: 5
                      }
                  ]);
    });

    it('should create list of all availible rooms for a selected date', function(){
        const allRooms1 = new AllRooms(allRoomsData);
        const todayDate = allBookings1.getTodayDate();
        allBookings1.sortBookings(todayDate);
        expect(allBookings1.sortAllAvailibleRooms(20221206, allRooms1.allRooms)).to.deep.equal([
            {
              number: 1,
              roomType: 'residential suite',
              bidet: true,
              bedSize: 'queen',
              numBeds: 1,
              costPerNight: 358.4
            },
            {
              number: 2,
              roomType: 'suite',
              bidet: false,
              bedSize: 'full',
              numBeds: 2,
              costPerNight: 477.38
            },
            {
              number: 3,
              roomType: 'single room',
              bidet: false,
              bedSize: 'king',
              numBeds: 1,
              costPerNight: 491.14
            },
            {
              number: 4,
              roomType: 'single room',
              bidet: false,
              bedSize: 'queen',
              numBeds: 1,
              costPerNight: 429.44
            }
          ]);
          expect(allBookings1.sortAllAvailibleRooms(20231214, allRooms1.allRooms)).to.deep.equal([
            {
              number: 2,
              roomType: 'suite',
              bidet: false,
              bedSize: 'full',
              numBeds: 2,
              costPerNight: 477.38
            },
            {
              number: 3,
              roomType: 'single room',
              bidet: false,
              bedSize: 'king',
              numBeds: 1,
              costPerNight: 491.14
            },
            {
              number: 4,
              roomType: 'single room',
              bidet: false,
              bedSize: 'queen',
              numBeds: 1,
              costPerNight: 429.44
            },
            {
              number: 5,
              roomType: 'single room',
              bidet: true,
              bedSize: 'queen',
              numBeds: 2,
              costPerNight: 340.17
            }
          ]);
    });
});