import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  name: 'mongoDB',
  connector: 'mongodb',
  url: `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@loopbacktododb.ae15p.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority&appName=LoopBackTodoDB`,
  host: 'localhost',
  port: 27017,
  user: `${process.env.MONGODB_USER}`,
  password: `${process.env.MONGODB_PASSWORD}`,
  database: `${process.env.MONGODB_DB_NAME}`,
  useNewUrlParser: true
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongoDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongoDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
