export interface IChatRoomUserList {
  nickName: string;
  userId: number;
  sid: string;
}

export interface Ibadwordobjectlist {
  id: number;
  badword: string;
}

export interface IOldChatlogs {
  room_name: string;
  user_id: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface IoverCountChatlogs {
  room_name: string;
  user_id: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}
