import { DefaultCurrency } from '../user-settings.model';

export class UpdateUserSettingsDto {
  hasSubscribedToNewsletter?: boolean;
  defaultCurrency?: DefaultCurrency;
}
