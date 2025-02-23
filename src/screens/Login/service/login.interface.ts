export interface UserLoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UserName {
  firstname: string;
  lastname: string;
}

export interface UserAddress {
  city: string;
  street: string;
  number: string;
  zipcode: string;
  geolocation: {
    lat: string;
    long: string;
  };
}

export interface UserSignupData {
  email: string;
  username: string;
  password: string;
  name: UserName;
  address: UserAddress;
  phone: string;
}

export interface SignupResponse {
  id: number;
}
