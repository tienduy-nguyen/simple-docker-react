import { DefaultCurrency } from '../user-settings.model';

export class UpdateUserSettingsDto {
  hasSubscribedToNewsletter?: boolean | 1 | 0;
  defaultCurrency?: DefaultCurrency;
}
