export class UserModel {
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
    let newFirstName = '';
    let newLastName = '';
    if (this.first_name) {
      newFirstName =
        this.first_name.charAt(0).toUpperCase() + this.last_name.slice(1);
    }
    if (this.last_name) {
      newLastName =
        this.last_name.charAt(0).toUpperCase() + this.last_name.slice(1);
    }
    return `${newFirstName} ${newLastName}`;
  }
}

export enum Status {
  'ACTIVE',
  'LOCKED',
  'CLOSED',
}
