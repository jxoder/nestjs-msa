import { VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { CORE_CONFIG_KEY, CoreConfigType } from '@slibs/core'
import compression from 'compression'
import { mw } from 'request-ip'
import { ApiModule } from './api.module'
import { API_CONFIG_KEY, ApiConfigType } from './config'

async function bootstrap() {
  const app = await NestFactory.create(ApiModule)

  // get config
  const coreConfig = app.get<CoreConfigType>(CORE_CONFIG_KEY)
  const apiConfig = app.get<ApiConfigType>(API_CONFIG_KEY)

  // utils
  app.use(mw())
  app.use(
    compression({
      filter: (req, res) => {
        if (req.get('x-no-compression') === '1') {
          return false
        }
        return compression.filter(req, res)
      },
    }),
  )

  // cors
  app.enableCors({
    origin: apiConfig.ORIGINS.length > 0 ? apiConfig.ORIGINS : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  app.enableVersioning({ type: VersioningType.URI })
  app.useLogger([coreConfig.LOG_LEVEL])

  await app.listen(apiConfig.PORT, apiConfig.HOST)
}

void bootstrap()
