import { generateFullName } from 'src/utils/generate-fullname';
import { RegisterUserDto } from '../auth/dto';

export class User {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  full_name: string;
  birthdate: string;
  street: string;
  city: string;
  country: string;
  zip: string;
  status: Status;
  createdAt: string;
  updatedAt: string;

  constructor(props: RegisterUserDto) {
    const {
      email,
      password,
      first_name,
      last_name,
      birthdate,
      street,
      city,
      country,
      zip,
    } = props;
    this.email = email;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.full_name = this._getFullName();
    this.birthdate = birthdate;
    this.street = street;
    this.city = city;
    this.country = country;
    this.zip = zip;

    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  /**
   * Auto retrieve full_name from first_name & last_name of model
   *
   * @return  {string}  return full_name
   */
  private _getFullName(): string {
    return generateFullName(this.first_name, this.last_name);
  }
  // private async setHashPassword(plainText: string) {
  //   this.password = await argon2.hash(plainText);
  // }
}

export enum Status {
  'ACTIVE',
  'LOCKED',
  'CLOSED',
}
