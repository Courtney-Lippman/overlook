import AllRooms from "./allRooms-class";
class AllBookings {
    constructor(allBookingsData) {
        this.allBookings = allBookingsData;
        this.allPastBookings = [];
        this.allUpcomingBookings = [];
    };

    getTodayDate() {
        let currentDate = new Date().toJSON().slice(0, 10)
        return CurrentDateListed = parseInt(currentDate.replaceAll('-', '')) // gives us 20221110 in num form
    };

    sortBookings(date) {
        this.allBookings.forEach(booking => {
            let bookingDate = parseInt(booking.date.replaceAll('/', '')) //give us 20230602 in num form
            if(bookingDate < date) {
                this.allPastBookings.push(booking);
            } else {
                this.allUpcomingBookings.push(booking);
            }
            // let bookingDate = booking.date.split('/') // gives us [ '2021', '01', '24' ]
            // if (bookingDate[0] < date[0]) {
            //     this.allPastBookings.push(bookingDate)
            // } else if (bookingDate[0] === date[0] && bookingDate[1] < date[1]) {
            //     this.allPastBookings.push(bookingDate)
            // } else if (bookingDate[0] === date[0] && bookingDate[1] === date[1] && bookingDate[2] < date[2]) {
            //     this.allPastBookings.push(bookingDate)
            // } else {
            //     this.allUpcomingBookings.push(bookingDate)
            // }
          });
    };

    sortAllAvailibleRooms(selectedDate) {
            //selected date will need to be in the following form num 20221201 see sortBookings
        const alreadyReservedForDateBookings = this.allUpcomingBookings.filter(parseInt(booking.date.replaceAll('/', '')) === selectedDate) //gives array of all rooms already taken for that date
        const allAvailibleRooms = AllRooms.allrooms.filter(room => {
            return alreadyReservedForDateBookings.forEach(takenBooking => {
                if(!room.number === takenBooking.roomNumber) {
                    return true;
                } else {
                    return false;
                }
            });
        });
    };
};


export default AllBookings;