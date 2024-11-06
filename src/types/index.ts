export type RegisterData = {
    email:string,
    fullName:string,
    password:string
}
export type LoginData = Omit<RegisterData,'fullName'>

export type User = {
    id: string;
    fullName: string;
    email: string;
  };