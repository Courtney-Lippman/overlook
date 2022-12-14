import chai from 'chai';
import Login from '../src/classes/login-class';
import customerData from '../src/data/customer-data';

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
    login1.createLoginStatus(customerData);

    expect(login1.loginStatus).to.equal('accepted');
});

it('should create a login status of "Not accepted" based on nonvalid password and/or nonvalid username', function() {
    login2.createLoginStatus(customerData);
    login3.createLoginStatus(customerData);
    login4.createLoginStatus(customerData);

    expect(login2.loginStatus).to.equal('not accepted');
    expect(login3.loginStatus).to.equal('not accepted');
    expect(login4.loginStatus).to.equal('not accepted');
});

it('should have a customer property set to correlated customer object when valid password and username are entered', function() {
    login1.createLoginStatus(customerData)

    expect(login1.currentCustomer).to.deep.equal({
        id: 1,
        customerName: 'Leatha Ullrich',
        upcomingBookings: [],
        pastBookings: [],
        allBookings: '',
        totalAmountSpent: ''
    });
});
});