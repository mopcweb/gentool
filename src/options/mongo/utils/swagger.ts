    /* *************************** LOGS ROUTE *************************** */

    // =====> Get all
    [API.LOGS]: {
      get: {
        tags: ['LOGS'],
        summary: 'Get all logs',
        operationId: 'getLogs',
        parameters: [ ...authHeader, ...commonGetParams ],
        responses: responses({
          url: API.LOGS,
          ok: [
            {
              _id: '5d80f7fca614cd009c1ccd31',
              timestamp: '2019-09-17T15:13:00.561Z',
              level: 'error',
              message: '{ status: 404,\n  statusText: "Not Found" }',
              meta: null,
              hostname: 'a6cd47e5e3d3',
              label: {
                 INSTANCE: 'STAGE',
                 VERSION: '1.0.1'
              }
            }
          ],
        })
      },
    },

    // =====> Get all
    [`${API.LOGS}/{id}`]: {
      get: {
        tags: ['LOGS'],
        summary: 'Get log by id',
        operationId: 'getLogById',
        parameters: [
          ...authHeader,
          ...commonGetParams,
          {
            in: 'path',
            name: 'id',
            description: 'Log id',
            schema: { type: 'string' },
            required: true
          },
        ],
        responses: responses({
          url: `${API.LOGS}/{id}`,
          title: 'Log',
          ok: {
            _id: '5d80f7fca614cd009c1ccd31',
            timestamp: '2019-09-17T15:13:00.561Z',
            level: 'error',
            message: '{ status: 404,\n  statusText: "Not Found" }',
            meta: null,
            hostname: 'a6cd47e5e3d3',
            label: {
               INSTANCE: 'STAGE',
               VERSION: '1.0.1'
            }
          },
          badRequest: '',
          notFound: '',
        })
      },

      delete: {
        tags: ['LOGS'],
        summary: 'Delete log by id',
        operationId: 'deleteLogById',
        parameters: [
          ...authHeader,
          ...commonGetParams,
          {
            in: 'path',
            name: 'id',
            description: 'Log id',
            schema: { type: 'string' },
            required: true
          },
        ],
        responses: responses({
          url: `${API.LOGS}/{id}`,
          method: 'DELETE',
          ok: 'Succefully deleted items: 1',
          badRequest: '',
          notFound: '',
        })
      },
    },
