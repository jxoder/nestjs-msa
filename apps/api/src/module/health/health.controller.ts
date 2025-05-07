import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { OkApiResponse } from '@slibs/core'

@Controller('health')
export class HealthController {
  @Get()
  @ApiResponse({ type: OkApiResponse })
  @ApiOperation({ summary: 'check healthy' })
  healthy(): OkApiResponse {
    return OkApiResponse.from()
  }
}
