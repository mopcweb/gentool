    /* *************************** CACHE ROUTE ************************** */

    // =====> Get all
    [API.CACHE.ROOT]: {
      get: {
        tags: ['CACHE'],
        summary: 'Get all cache records',
        operationId: 'getCache',
        parameters: [ ...authHeader ],
        responses: responses({
          url: API.CACHE.ROOT,
          ok: [{ key: 'testKey', ttl: 123 }, { key: 'test2Key', ttl: 234 }],
        })
      }
    },

    // =====> Get by key
    [`${API.CACHE.ROOT}/{key}`]: {
      get: {
        tags: ['CACHE'],
        summary: 'Get cache record by key',
        operationId: 'getCacheRecord',
        parameters: [
          ...authHeader,
          {
            in: 'path',
            name: 'key',
            description: 'Record key',
            schema: { type: 'string' },
            required: false
          },
        ],
        responses: responses({
          url: `${API.CACHE.ROOT}/{key}`,
          ok: 'Any data: array, object, string, number',
        })
      }
    },

    // =====> Delete by key
    [`${API.CACHE.ROOT}/delete/{key}`]: {
      get: {
        tags: ['CACHE'],
        summary: 'Delete record from cache',
        operationId: 'deleteCache',
        parameters: [
          ...authHeader,
          {
            in: 'path',
            name: 'key',
            description: 'Record key',
            schema: { type: 'string' },
            required: false
          },
        ],
        responses: responses({
          url: `${API.CACHE.ROOT}/delete/{key}`,
          ok: 'Cache recored deleted by key: someKey',
        }),
      }
    },

    // =====> Clear all
    [`${API.CACHE.ROOT}/clear`]: {
      get: {
        tags: ['CACHE'],
        summary: 'Clear cache',
        operationId: 'clearCache',
        parameters: [ ...authHeader ],
        responses: responses({
          url: `${API.CACHE.ROOT}/${API.CACHE.CLEAR}`,
          ok: 'Cache successfully cleared',
          notFound: false
        }),
      }
    },
