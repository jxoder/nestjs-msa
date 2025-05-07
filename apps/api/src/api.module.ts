import { Module } from '@nestjs/common'
import { CoreModule } from '@slibs/core'
import { ApiController } from './api.controller'
import { ApiService } from './api.service'
import { apiConfig } from './config'

@Module({
  imports: [CoreModule.forRoot(apiConfig)],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
