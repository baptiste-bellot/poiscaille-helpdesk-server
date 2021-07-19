import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Incident} from '../models';
import {IncidentRepository} from '../repositories';

export class IncidentController {
  constructor(
    @repository(IncidentRepository)
    public incidentRepository : IncidentRepository,
  ) {}

  @post('/incidents')
  @response(200, {
    description: 'Incident model instance',
    content: {'application/json': {schema: getModelSchemaRef(Incident)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incident, {
            title: 'NewIncident',
            exclude: ['_id'],
          }),
        },
      },
    })
    incident: Omit<Incident, '_id'>,
  ): Promise<Incident> {
    return this.incidentRepository.create(incident);
  }

  @get('/incidents/count')
  @response(200, {
    description: 'Incident model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Incident) where?: Where<Incident>,
  ): Promise<Count> {
    return this.incidentRepository.count(where);
  }

  @get('/incidents')
  @response(200, {
    description: 'Array of Incident model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Incident, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Incident) filter?: Filter<Incident>,
  ): Promise<Incident[]> {
    return this.incidentRepository.find(filter);
  }

  @patch('/incidents')
  @response(200, {
    description: 'Incident PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incident, {partial: true}),
        },
      },
    })
    incident: Incident,
    @param.where(Incident) where?: Where<Incident>,
  ): Promise<Count> {
    return this.incidentRepository.updateAll(incident, where);
  }

  @get('/incidents/{id}')
  @response(200, {
    description: 'Incident model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Incident, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Incident, {exclude: 'where'}) filter?: FilterExcludingWhere<Incident>
  ): Promise<Incident> {
    return this.incidentRepository.findById(id, filter);
  }

  @patch('/incidents/{id}')
  @response(204, {
    description: 'Incident PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Incident, {partial: true}),
        },
      },
    })
    incident: Incident,
  ): Promise<void> {
    await this.incidentRepository.updateById(id, incident);
  }

  @put('/incidents/{id}')
  @response(204, {
    description: 'Incident PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() incident: Incident,
  ): Promise<void> {
    await this.incidentRepository.replaceById(id, incident);
  }

  @del('/incidents/{id}')
  @response(204, {
    description: 'Incident DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.incidentRepository.deleteById(id);
  }
}
