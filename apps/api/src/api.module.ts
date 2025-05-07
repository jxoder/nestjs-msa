import { Module } from '@nestjs/common'
import {
  APP_HTTP_EXCEPTION_FILTER,
  APP_HTTP_LOGGER_INTERCEPTOR,
  CoreModule,
} from '@slibs/core'
import { apiConfig } from './config'
import { HealthModule } from './module/health'

@Module({
  imports: [
    CoreModule.forRoot(apiConfig),

    // internal modules
    HealthModule,
  ],
  providers: [APP_HTTP_LOGGER_INTERCEPTOR, APP_HTTP_EXCEPTION_FILTER],
})
export class ApiModule {}
