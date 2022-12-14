class AllBookings {
    constructor(allBookingsData) {
        this.allBookings = allBookingsData;
        this.allPastBookings = [];
        this.allUpcomingBookings = [];
        this.allAvailableRooms = [];
    };
    
    getTodayDate() {
        let currentDate = new Date().toJSON().slice(0, 10)
        return parseInt(currentDate.replaceAll('-', ''))
    };

    sortBookings(date) {
        this.allBookings.forEach(booking => {
            let bookingDate = parseInt(booking.date.replaceAll('/', ''))
            if(bookingDate < date) {
                this.allPastBookings.push(booking);
            } else {
                this.allUpcomingBookings.push(booking);
            }
          });
    };

    sortAllAvailibleRooms(selectedDate, allRoomsList) {
        const alreadyReservedForDateBookings = this.allUpcomingBookings.filter(booking => parseInt(booking.date.replaceAll('/', '')) === selectedDate);
        this.allAvailableRooms = allRoomsList.filter(room => {
            return !alreadyReservedForDateBookings.find(takenBooking =>  room.number === takenBooking.roomNumber)
        });
    };

    filterByType(selectedType) {
        if(selectedType === 'all-room-type') {
            return this.allAvailableRooms
        } else {
            return this.allAvailableRooms.filter(room => room.roomType === selectedType);
        }
      }
};

export default AllBookings;