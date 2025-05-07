import { VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { CORE_CONFIG_KEY, CoreConfigType } from '@slibs/core'
import { ApiModule } from './api.module'
import { API_CONFIG_KEY, ApiConfigType } from './config'

async function bootstrap() {
  const app = await NestFactory.create(ApiModule)

  const coreConfig = app.get<CoreConfigType>(CORE_CONFIG_KEY)
  const apiConfig = app.get<ApiConfigType>(API_CONFIG_KEY)

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
