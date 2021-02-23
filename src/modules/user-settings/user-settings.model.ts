export class UserSettings {
  id: number | string;
  userId: number | string;
  hasSubscribedToNewsletter: boolean;
  defaultCurrency: DefaultCurrency;

  constructor(userId: number | string) {
    this.userId = userId;
    (this.defaultCurrency = DefaultCurrency.EUR),
      (this.hasSubscribedToNewsletter = false);
  }
}

export enum DefaultCurrency {
  'USD',
  'EUR',
}
