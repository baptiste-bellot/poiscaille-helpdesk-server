import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'nedb',
  connector: 'loopback-connector-nedb',
  stores: ['Incident']
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class NedbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'nedb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.nedb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
