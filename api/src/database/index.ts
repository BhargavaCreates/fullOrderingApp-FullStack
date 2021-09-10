import { Connection, createConnection, SimpleConsoleLogger } from "typeorm";
import dotenv from 'dotenv';

dotenv.config({});
class Database {

  public connection: Connection;

  constructor() {
    this.connectToDB();
  }

  private connectToDB(): void {
    createConnection({
      type: "mysql",
      host: envString(process.env.DATABASE_HOST!, process.env.DATABASE_HOST),
      port: envString(Number(process.env.DATABASE_PORT!), Number(process.env.DATABASE_PORT)),
      username: envString(process.env.DATABASE_USERNAME!,process.env.DATABASE_USERNAME),
      password: envString(process.env.DATABASE_PASSWORD!, process.env.DATABASE_PASSWORD),
      database: envString(process.env.DATABASE_NAME!,process.env.DATABASE_NAME),
      entities: [
        __dirname + "/entity/*.ts",
        __dirname + "/entity/*.js"
      ], migrations: [ __dirname + './migrations/*.js'],
      synchronize: true,
      logging: false
    }).catch(console.error)
  }

}


function envString<T>(prodString: T, devString: T): T {
  return process.env.NODE_ENV === 'production' ? prodString : devString
}

export const db = new Database();