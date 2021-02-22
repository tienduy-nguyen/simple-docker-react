import { Database } from 'sqlite';
import { NotFoundException } from 'src/common/exceptions';
import { generateFullName } from 'src/utils/generate-fullname';
import { injectable } from 'tsyringe';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.model';
import { db } from 'src/database';
import argon2 from 'argon2';

@injectable()
export class UserService {
  private _db: Database;
  constructor() {
    this._db = db;
  }

  public async getUsers(): Promise<User[]> {
    const query = `SELECT * FROM "users";`;
    const users = await this._db.all(query);
    return users || [];
  }

  public async getUserByEmail(email: string): Promise<User> {
    const query = `SELECT * FROM "users" where email='${email}';`;
    return await this._db.get(query);
  }

  public async getUserById(id: number | string): Promise<User> {
    const query = `SELECT * FROM "users" where id=${id};`;
    return await this._db.get(query);
  }

  public async createUser(data: CreateUserDto) {
    const {
      email,
      first_name,
      last_name,
      birthdate,
      city,
      country,
      street,
      zip,
    } = data;
    let password = await argon2.hash(data.password);

    const userTemp = new User({
      email,
      password,
      first_name,
      last_name,
      birthdate,
      street,
      city,
      country,
      zip,
    });
    const mutation = `
    INSERT INTO "users" (email, password, first_name, last_name, 
                        full_name, birthdate, street, 
                        city, country, zip, status, 
                        createdAt, updatedAt)

                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?);
    `;
    const values = [
      email,
      password,
      first_name,
      last_name,
      userTemp.full_name,
      birthdate,
      street,
      city,
      country,
      zip,
      'ACTIVE',
      userTemp.createdAt,
      userTemp.updatedAt,
    ];

    await this._db.run(mutation, values);
    userTemp.password = '';
    return userTemp;
  }

  public async updateUserById(id: number | string, data: UpdateUserDto) {
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
    SET email= ?,
    first_name = ?,
    last_name = ?,
    full_name= ?,
    birthdate = ?,
    street = ?,
    city = ?,
    country = ?,
    zip = ?,
    status = ?

    WHERE id = ? 
    `;
    const values = [
      email,
      first_name,
      last_name,
      full_name,
      birthdate,
      street,
      city,
      country,
      zip,
      status.toString(),
      id,
    ];
    await this._db.run(mutation, values);
    await this._db.run(`UPDATE "users" SET "updatedAt"='${updatedAt}'`);
    const { password, ...rest } = user;
    return rest;
  }

  public async deleteUser(id: number | string) {
    const mutation = `DELETE FROM "users" where id=${id}`;
    await this._db.run(mutation);
    return { deleted: true };
  }
}
