class Customer {
    constructor(singleCustomerInfo) {
        this.id = singleCustomerInfo.id;
        this.customerName = singleCustomerInfo.name;
        this.upcomingBookings = [];
        this.pastBookings = [];
        this.allBookings = this.pastBookings + this.upcomingBookings;
        this.totalAmountSpent = '';
    };

    getBookings(SpecificBookingTypeListAllCustomers, bookingType) {
        // console.log('hey', SpecificBookingTypeListAllCustomers)
    let customerListOfBookings = SpecificBookingTypeListAllCustomers.filter(booking => booking.userID === this.id);
    if(bookingType === 'past') {
            this.pastBookings = customerListOfBookings;
        } else if(bookingType === 'future') {
            this.upcomingBookings = customerListOfBookings;
        } else if(bookingType === 'all') {
            this.allBookings = customerListOfBookings;
        };
    };

    getTotalAmountSpent(allRooms) {
        let aTotal = 0;
        this.allBookings.forEach(booking => {
            return aTotal+= allRooms.getSpecificRoom(booking.roomNumber).costPerNight;
        })
        this.totalAmountSpent = aTotal.toFixed(2);
    };
};


export default Customer;