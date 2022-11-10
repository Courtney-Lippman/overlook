class Customer {
    constructor(singleCustomerInfo) {
        this.id = singleCustomerInfo.id;
        this.name = singleCustomerInfo.name
        this.upcomingBookings = [];
        this.pastBookings = [];
        this.allBookings = []
        this.totalAmountSpent = 0;
        this.selectedDate = 00000000 //yearmonthday -> 20221109
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
        return this.allBookings.reduce((acc, booking) => {
        return acc += allRooms.getSpecificRoom(booking.roomNumber).costPerNight;
        }, 0);
    };
};


export default Customer;