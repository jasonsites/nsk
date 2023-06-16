/**
 * @file domain model serializers type definitions
 */


import type { DomainModel, DomainObject } from './models'
import type { Resource, ResourceData } from '../resources'


export type Serializer = {
  serialize: (params: { format?: SerializerFormat, model: DomainModel }) => SerializerOutput
}

export type SerializerFormat = 'json' // | 'xml' | ...
export type SerializerOutput = string // | Buffer | ...

export type JSONSerializer = {
  serialize: (params: DomainModel) => string
}

export interface DomainModelMarshaller {
  marshal: (params: { model: DomainModel }) => Resource
}

export interface DomainObjectMarshaller {
  marshal: (data: DomainObject) => ResourceData
}
