import { Database } from 'sqlite';
import { BadRequestException } from 'src/common/exceptions';
import { DatabaseService } from 'src/database/database.service';
import { injectable } from 'tsyringe';
import { UpdateUserSettingsDto } from './dto/update-user-settings.dto';
import { UserSettings } from './user-settings.model';

@injectable()
export class UserSettingsService {
  private _db: Database;
  constructor(dbService: DatabaseService) {
    this._db = dbService.getConnection;
  }

  public async getUserSettings(userId: string | number): Promise<UserSettings> {
    const userSettings = await this._db.get(
      `SELECT * FROM "user_settings" where "userId"=${userId}`,
    );
    return userSettings;
  }

  public async createUserSettings(
    userId: number | string,
  ): Promise<UserSettings> {
    await this._db.run(
      `INSERT INTO "user_settings" ("userId") VALUES(${userId});`,
    );
    return await this._db.get(
      `SELECT  * FROM "user_settings" where "userId"=${userId};`,
    );
  }

  public async updateUserSettings(
    userId: number | string,
    data: UpdateUserSettingsDto,
  ) {
    const userSettings = await this.getUserSettings(userId);
    if (!userSettings) {
      throw new BadRequestException(
        `User settings not found with userId ${userId}`,
      );
    }
    let { defaultCurrency, hasSubscribedToNewsletter } = data;
    defaultCurrency = defaultCurrency
      ? defaultCurrency
      : userSettings.defaultCurrency;
    hasSubscribedToNewsletter = hasSubscribedToNewsletter
      ? hasSubscribedToNewsletter
      : userSettings.hasSubscribedToNewsletter;
    await this._db.run(
      `UPDATE "user_settings" set "defaultCurrency"='${defaultCurrency}', "hasSubscribedToNewsletter"='${hasSubscribedToNewsletter}'`,
    );
    return await this.getUserSettings(userId);
  }
}
