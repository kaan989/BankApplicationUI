export interface AppUser {
    id: string;
    email: string;
    password: string;
    username:string;
    confirmPassword: string;
    roles?: string[];
    firstName: string;
    lastName: string;
    address: string;
    idNumber: string;
  }
  