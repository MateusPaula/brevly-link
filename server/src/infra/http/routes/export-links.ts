import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { exportLinks } from '@/functions/export-links'
import { unwrapEither } from '@/infra/shared/either'

export const exportLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links/export',
    {
      schema: {
        summary: 'Export links to CSV',
        tags: ['links'],
        querystring: z.object({
          searchQuery: z.string().optional(),
        }),
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { searchQuery } = request.query

      const result = await exportLinks({
        searchQuery,
      })

      const { reportUrl } = unwrapEither(result)

      return reply.status(200).send({
        reportUrl,
      })
    }
  )
}
