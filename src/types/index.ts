export type RegisterData = {
    email:string,
    fullName:string,
    password:string
}
export type RegisterDataGoogle = {
    email:string,
    fullName:string
}

export type LoginData = Omit<RegisterData,'fullName'>

export type User = {
    id: string;
    fullName: string;
    email: string;
    token:string;
    url_profile?:string;
  };
export type UserView={
    email: string,
    fullName:string,
    url_profile: string, 
};

export type UserData = {
    user: {
        email:string;
        firstName:string;
        lastName:string;
        accessToken:string
    }
    token: string;
    email: string;
    [key: string]: any; 
}

export type GoogleAuthOptions = {
    width?: number;
    height?: number;
}
export type UserMusicRoom ={
    id: string;
    user_id: string;
    music_room_id: string;
    is_banned: boolean;
    user: User;
    room: MusicRoom;
}

export type MusicRoom = {
    id: string;
    name: string;
    description: string;
    created_by: string;
    is_private: boolean;
    user:User;

    userMusicRooms: UserMusicRoom[];
}
export type ToastPropsType = {
    message:string,
    class:string
}

export type GoogleUser = {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    accessToken: string;
}

export type GoogleAuthResponse = {
    message: string;
    user: GoogleUser;
}