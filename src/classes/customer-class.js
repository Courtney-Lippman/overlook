class Customer {
    constructor(singleCustomerInfo) {
        this.id = singleCustomerInfo.id;
        this.name = singleCustomerInfo.name
        this.upcomingBookings = [];
        this.pastBookings = [];
        this.allBookings = []
        this.totalAmountSpent = 0;
        this.selectedDate = 00000000; //yearmonthday -> 20221109
    }
};

getBookings(SpecificBookingTypeListAllCustomers, bookingType) {
   const customerListOfBookings = SpecificBookingTypeListAllCustomers.filter(booking => booking.userID === this.id);
   if(bookingType === past) {
        this.pastBookings = customerListOfBookings;
    } else if(bookingType === future) {
        this.upcomingBookings = customerListOfBookings;
    } else if(bookingType === all) {
        this.allBookings = customerListOfBookings
    };
};

getTotalAmountSpent() {
    /*
    iterate through this.allBookings array (reduce)
        iterate through allRooms array
            if room number of booking matches room number in allRooms array
                then take that rooms costPerNight value and add it to acc
        End iteration through allRooms array
        return acc
    End iteration through this.allBookings array
    */
    return this.allBookings.reduce((acc, booking) => {
     return acc += allRooms.getSpecificRoom(booking.roomNumber).costPerNight
    }, 0)
}


