import Customer from "./customer-class";
class Login {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.loginStatus = '';
        this.currentCustomer = {};
    };

    createLoginStatus(customerList) {
       const userID = Number(this.username.replace('customer', ''));
       const existingCustomer = customerList.find(customer => customer.id === userID);
       if(existingCustomer && this.password === 'overlook2021') {
        this.currentCustomer = new Customer(existingCustomer);
        this.loginStatus = 'accepted';
       } else {
        this.loginStatus = 'not accepted'
       }
    };

};

export default Login;