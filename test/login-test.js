import chai from 'chai';
import Login from '../src/classes/login-class';

const expect = chai.expect;

describe('login', function() {
    let login1;
    let login2;
    let login3;
    let login4;
    beforeEach(function() {
        login1 = new Login('customer1', 'overlook2021');
        login2 = new Login('customer2', 'hello');
        login3 = new Login('customer50', 'overlook2021');
        login4 = new Login('customer30', 'over');
    });

  it('should be a function', function() {
      expect(Login).to.be.a('function');
});

  it('should instantiate login',function(){
  expect(login1).to.be.an.instanceOf(Login);
});

it('should accept an username', function() {
    expect(login2.username).to.equal('customer2');
});
  
it('should be able to have a different username',function(){
  expect(login4.username).to.equal('customer30');
});
  
it('should accept a password', function() {
    expect(login3.password).to.equal('overlook2021');
});

it('should be able to have a different password', function() {
    expect(login2.password).to.equal('hello');
});

it('should create a login status of "accepted" based on valid passed in password and username', function() {
    login1.createLoginStatus();

    expect(login1.loginStatus).to.equal('accepted');
});

it('should create a login status of "Wrong password" based on nonvalid password and valid username', function() {
    login2.createLoginStatus();

    expect(login2.loginStatus).to.equal('Wrong password');
});

it('should create a login status of "username nonexistant" based on a nonvalid username', function() {
    login3.createLoginStatus();
    login4.createLoginStatus();

    expect(login3.loginStatus).to.equal('username nonexistant');
    expect(login4.loginStatus).to.equal('username nonexistant');
});

// it('should create a currentCustomer that is associated with valid user name and password', function() {
//     login1.createLoginStatus();
//     expect(login1.currentCustomer).to.equal({
//             allBookings: "",
//             id: 1,
//             customerName: "Leatha Ullrich",
//             pastBookings: [],
//             selectedDate: 0,
//             totalAmountSpent: 0,
//             upcomingBookings: []
//          }); // ****** WIll NEED TO UPDATE THE ABOVE ANSWER WHEN CUSTOMER CLASS IS FINISHED! *******
// });

});