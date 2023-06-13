/**
 * @file example entity model
 */

import type { DomainModelComposite, ExampleDomainModel } from '../../../types/domain-models'
import type { EntityModelMarshaller, ExampleEntityModel, MarshalParams } from '../types'

export default function example(): EntityModelMarshaller {
  function marshal(params: MarshalParams): DomainModelComposite {
    const { meta, solo = true } = params

    const result: DomainModelComposite = { data: [], solo }
    if (meta) result.meta = meta

    const data = <ExampleEntityModel[]>params.data
    if (solo && data.length > 1) {
      // log error
    }

    result.data = data.reduce((acc: Array<ExampleDomainModel>, elem: ExampleEntityModel) => {
      const marshalled = marshalData({ data: elem })
      acc.push(marshalled)
      return acc
    }, [])
    if (meta) result.meta = meta
    return result
  }

  function marshalData({ data }: { data: ExampleEntityModel }): ExampleDomainModel {
    const {
      created_by,
      created_on,
      description,
      enabled,
      id,
      modified_by,
      modified_on,
      status,
      title,
    } = data

    return {
      attributes: {
        created_by,
        created_on,
        description,
        enabled,
        id,
        modified_by,
        modified_on,
        status,
        title,
      },
      meta: null, // TODO
      related: [], // TODO
    }
  }

  return { marshal }
}

export const inject = {}
