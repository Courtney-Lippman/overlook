class AllRooms {
    constructor(allRoomsData) {
        this.allRooms = allRoomsData;
    };

    getSpecificRoom(selectedRoomId) {
       return this.allRooms.find(room => room.number === selectedRoomId);
    };

    createListOfRoomTypes() {
     const allTypesList = this.allRooms.reduce((acc, room) => {
      acc.push(room.roomType)
      return acc
     }, [])
     return [...new Set(allTypesList)]
    }

};

export default AllRooms;