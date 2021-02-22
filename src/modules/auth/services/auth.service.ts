import { injectable } from 'tsyringe';
import { Database } from 'sqlite';
import { LoginUserDto, RegisterUserDto } from '../dto';
import { User } from 'src/modules/user/user.model';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/modules/user/user.service';
import { BadRequestException } from 'src/common/exceptions';
import { PasswordService } from './password.service';

@injectable()
export class AuthService {
  private _db: Database;
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    dbService: DatabaseService,
  ) {
    this._db = dbService.getConnection;
  }

  public async registerUser(data: RegisterUserDto): Promise<User> {
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
    let password = await this.passwordService.hash(data.password);

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
    const userCreated: User = await this._db.get(
      `SELECT * from "users" WHERE email='${email}'`,
    );
    return userCreated;
  }

  public async loginUser(data: LoginUserDto) {
    const { email, password } = data;
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    const isMatch = await this.passwordService.verify(user.password, password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }
    return user;
  }
}
