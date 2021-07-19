import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Incident extends Entity {
  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  emails: string[];

  @property({
    type: 'string',
  })
  relay?: string;

  @property({
    type: 'date',
  })
  date?: string;

  @property({
    type: 'string',
  })
  category?: string;

  @property({
    type: 'string',
  })
  cause?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  resolutions?: string[];

  @property({
    type: 'number',
  })
  refundAmont?: number;

  @property({
    type: 'string',
  })
  product?: string;

  @property({
    type: 'string',
  })
  comment?: string;

  @property({
    type: 'string',
    id: true,
    generated: true
  })
  _id: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Incident>) {
    super(data);
  }
}

export interface IncidentRelations {
  // describe navigational properties here
}

export type IncidentWithRelations = Incident & IncidentRelations;
