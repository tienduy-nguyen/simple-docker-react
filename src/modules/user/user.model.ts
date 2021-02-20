import { generateFullName } from 'src/utils/generate-fullname';

export class User {
  id: number;
  email: string;
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

  constructor(
    email: string,
    first_name?: string,
    last_name?: string,
    birthdate?: string,
    street?: string,
    city?: string,
    country?: string,
    zip?: string,
    status = Status.ACTIVE,
  ) {
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.birthdate = birthdate;
    this.street = street;
    this.city = city;
    this.country = country;
    this.zip = zip;
    this.status = status;

    this.full_name = this._getFullName();

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
}

export enum Status {
  'ACTIVE',
  'LOCKED',
  'CLOSED',
}
