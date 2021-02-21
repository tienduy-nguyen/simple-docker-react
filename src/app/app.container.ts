import { container, injectable } from 'tsyringe';
import { Database } from 'sqlite';

@injectable()
export class AppContainer {
  constructor() {
    container.registerSingleton<Database>('Database', Database);
  }
}
