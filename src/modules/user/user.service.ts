import { NotFoundException } from 'src/common/exceptions';
import { generateFullName } from 'src/utils/generate-fullname';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.model';

export class UserService {
  constructor(public db: any) {}

  public async getUsers(): Promise<User[]> {
    const query = `SELECT * FROM "users";`;
    return await this.db.get(query);
  }

  public async getUserByEmail(email: string): Promise<User> {
    const query = `SELECT * FROM "users" where email='${email}';`;
    return await this.db.get(query);
  }

  public async getUserById(id: number): Promise<User> {
    const query = `SELECT * FROM "users" where id='${id}';`;
    return await this.db.get(query);
  }

  public async createUser(data: CreateUserDto): Promise<User> {
    const {
      email,
      first_name,
      last_name,
      birthdate,
      city,
      country,
      status,
      street,
      zip,
    } = data;

    const userTemp = new User(
      email,
      first_name,
      last_name,
      birthdate,
      street,
      city,
      country,
      zip,
      status,
    );
    const mutation = `
    INSERT INTO "users" 

    (email, first_name, last_name, 
    full_name, birthdate, street, city, country, zip, 
    status, createdAt, updatedAt )

    VALUES(${email}, ${first_name}, 
      ${last_name}, ${userTemp.full_name}, ${birthdate},
      ${street}, ${city}, ${country}, ${zip},
       ${userTemp.createdAt}, ${userTemp.updatedAt})
    `;

    return await this.db.run(mutation);
  }

  public async updateUserById(id: number, data: UpdateUserDto): Promise<User> {
    const user: User = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let {
      email,
      first_name,
      last_name,
      birthdate,
      street,
      city,
      country,
      zip,
      status,
    } = data;

    email = email ? email : user.email;
    first_name = first_name ? first_name : user.first_name;
    last_name = last_name ? last_name : user.last_name;
    const full_name = generateFullName(first_name, last_name);
    birthdate = birthdate ? birthdate : user.birthdate;
    street = street ? street : user.street;
    city = city ? city : user.city;
    country = country ? country : user.country;
    zip = zip ? zip : user.zip;
    status = status ? status : user.status;
    const updatedAt = new Date().toISOString();

    const mutation = `UPDATE "users" 
    SET email=${email}
    first_name = ${first_name}
    last_name = ${last_name}
    full_name=${full_name}
    birthdate = ${birthdate}
    street = ${street}
    city = ${city}
    country = ${country}
    zip = ${zip}
    status = ${status}
    updatedAt = ${updatedAt}
    
    WHERE id = '${id}' 
    `;
    return await this.db.run(mutation);
  }

  public async deleteUser(id: number) {
    const mutation = `DELETE FROM "user" where id=${id}`;
    return await this.db.run(mutation);
  }
}
