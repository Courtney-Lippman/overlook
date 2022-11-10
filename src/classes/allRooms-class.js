class AllRooms {
    constructor(allRoomsData) {
        this.allRooms = allRoomsData;
    };

    getSpecificRoom(selectedRoomId) {
       return this.allRooms.find(room => room.number === selectedRoomId);
    };
};

export default AllRooms;