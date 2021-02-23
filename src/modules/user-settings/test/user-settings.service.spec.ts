import { UserSettings } from '../user-settings.model';
import { UserSettingsService } from '../user-settings.service';

describe('Unit tests: UserSettingsService', () => {
  let settingsService: UserSettingsService;

  const dbServiceMock: any = {
    getConnection: {
      all: jest.fn(),
      run: jest.fn(),
      get: jest.fn(),
      close: jest.fn(),
    },
  };

  const oneUserSettings = { id: 1 } as UserSettings;
  beforeEach(async () => {
    settingsService = new UserSettingsService(dbServiceMock);
  });
  it('Should be defined', () => {
    expect(settingsService).toBeDefined();
  });

  describe('getUserSettings', () => {
    it('Should return an array of user', async () => {
      dbServiceMock.getConnection.get.mockReturnValue(oneUserSettings);
      const result = await settingsService.getUserSettings(1);
      expect(result).toMatchObject(oneUserSettings);
    });
  });

  describe('createUserSettings', () => {
    it('Should return an array of user', async () => {
      dbServiceMock.getConnection.run.mockReturnValue({});
      dbServiceMock.getConnection.get.mockReturnValue(oneUserSettings);
      const result = await settingsService.createUserSettings(1);
      expect(result).toMatchObject(oneUserSettings);
    });
  });

  describe('updateUserSettings', () => {
    it('Should return an array of user', async () => {
      dbServiceMock.getConnection.run.mockReturnValue({});
      dbServiceMock.getConnection.get.mockReturnValue(oneUserSettings);
      const result = await settingsService.updateUserSettings(1, {
        hasSubscribedToNewsletter: 1,
      });
      expect(result).toMatchObject(oneUserSettings);
    });
  });
});
