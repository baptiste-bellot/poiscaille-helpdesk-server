import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {NedbDataSource} from '../datasources';
import {Incident, IncidentRelations} from '../models';

export class IncidentRepository extends DefaultCrudRepository<
  Incident,
  typeof Incident.prototype._id,
  IncidentRelations
> {
  constructor(
    @inject('datasources.nedb') dataSource: NedbDataSource,
  ) {
    super(Incident, dataSource);
  }
}
