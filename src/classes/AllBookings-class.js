import AllRooms from "./allRooms-class";
class AllBookings {
    constructor(allBookingsData) {
        this.allBookings = allBookingsData;
        this.allPastBookings = [];
        this.allUpcomingBookings = [];
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
            //selected date will need to be in the following form num 20221201 see sortBookings
            //this function needs both getTodayDate() and sortBookings(date) (date is the result of getTodayDate())
        const alreadyReservedForDateBookings = this.allUpcomingBookings.filter(booking => parseInt(booking.date.replaceAll('/', '')) === selectedDate) //gives array of all rooms already taken for that date
        const allAvailibleRooms = allRoomsList.filter(room => {
                let condition;
            alreadyReservedForDateBookings.forEach(takenBooking => {
                if(room.number === takenBooking.roomNumber) {
                    condition = false;
                } else {
                    condition = true;
                }
            });
            return condition
        });
         return allAvailibleRooms
    };
};

export default AllBookings;