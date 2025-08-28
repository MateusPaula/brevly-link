import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { getLinksRoute } from '@/infra/http/routes/get-links'
import { increaseLinkVisitsRoute } from '@/infra/http/routes/increase-link-visits'
import { createShortLinkRoute } from '@/infra/http/routes/create-short-link'
import { deleteLinkRoute } from '@/infra/http/routes/delete-link'
import { exportLinksRoute } from '@/infra/http/routes/export-links'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
  console.log('error Handler', error)
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  }

  console.error(error)
  return reply.status(500).send({ message: 'Internal server error' })
})

server.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Link Shortener API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

server.register(swaggerUI, {
  routePrefix: '/docs',
})

server.register(getLinksRoute)
server.register(increaseLinkVisitsRoute)
server.register(createShortLinkRoute)
server.register(deleteLinkRoute)
server.register(exportLinksRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})
