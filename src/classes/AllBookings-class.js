import AllRooms from "./allRooms-class";
class AllBookings {
    constructor(allBookingsData) {
        this.allBookings = allBookingsData;
        this.allPastBookings = [];
        this.allUpcomingBookings = [];
        this.allAvailableRooms = [];
    };
    
    getTodayDate() {
        let currentDate = new Date().toJSON().slice(0, 10)
        return parseInt(currentDate.replaceAll('-', '')) // gives us 20221110 in num form
    };

    sortBookings(date) {
        this.allBookings.forEach(booking => {
            let bookingDate = parseInt(booking.date.replaceAll('/', '')) //give us 20230602 in num form
            if(bookingDate < date) {
                this.allPastBookings.push(booking);
            } else {
                this.allUpcomingBookings.push(booking);
            }
          });
    };

    sortAllAvailibleRooms(selectedDate, allRoomsList) {
        // console.log('Coming Through????', this.allUpcomingBookings)
        const alreadyReservedForDateBookings = this.allUpcomingBookings.filter(booking => parseInt(booking.date.replaceAll('/', '')) === selectedDate)
        // console.log('alreadyReservedForDateBookings',alreadyReservedForDateBookings) // this is correct
        this.allAvailableRooms = allRoomsList.filter(room => {
            return !alreadyReservedForDateBookings.find(takenBooking =>  room.number === takenBooking.roomNumber)
        });
    };

    filterByType(selectedType) {
        return this.allAvailableRooms.filter(room => room.roomType === selectedType);
      }
};

export default AllBookings;