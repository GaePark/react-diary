export interface chatRoomTypes {
  currentChatRoom: {
    createBy: {
      image: string;
      name: string;
    };
    description: string;
    id: string;
    name: string;
  };
}

export interface userTypes {
  currentUser: {
    uid: string;
    photoURL: string;
    displayName: string;
  };
}
