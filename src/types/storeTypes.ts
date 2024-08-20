export interface chatRoomTypes {
  createBy: {
    name: string;
  };
  description: string;
  id: string;
  name: string;
}

export interface userTypes {
  uid: string;
  displayName: string | null;
}
