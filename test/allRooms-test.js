import chai from 'chai';
import AllRooms from '../src/classes/allRooms-class';
import allRoomsData from '../src/data/allRooms-data';
const expect = chai.expect;

describe('allRooms', function() {
  let allRooms1;
  beforeEach(function() {
      allRooms1 = new AllRooms(allRoomsData);
  });

  it('should be a function', function() {
      expect(AllRooms).to.be.a('function');
});

  it('should instantiate rooms data',function(){
  expect(allRooms1).to.be.an.instanceOf(AllRooms);
});

  it('should accept an all rooms array', function(){
      expect(allRooms1.allRooms).to.deep.equal(allRoomsData);
  });

  it('should find a specific room with an id ', function(){
    expect(allRooms1.getSpecificRoom(1)).to.deep.equal({
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
      });
      expect(allRooms1.getSpecificRoom(2)).to.deep.equal({
        number: 2,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 477.38
        });
  });

  it('should create a list of all roomTypes', function(){
      expect(allRooms1.createListOfRoomTypes()).to.deep.equal([ "residential suite", "suite", "single room"]);
  });

});