import { Response } from 'express';
import { Database } from 'sqlite3';

export class SqlService {
  constructor(public db: Database) {}

  public runSql(res: Response, sql: string) {
    this.db.serialize(() => {
      this.db.all(sql, (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
          return;
        }
        this.sendData(res, rows);
      });
    });
  }

  private sendData(res: Response, data: any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (data[0]) {
      res.send(data);
      return;
    }
    res.status(404).send('404 not found');
  }
}
