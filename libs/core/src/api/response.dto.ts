import { HttpStatus } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class CommonApiResponse {
  @ApiProperty({ example: 200, description: 'status code' })
  code!: number

  @ApiProperty({ example: 'OK', description: 'message' })
  message!: string
}

export class OkApiResponse extends CommonApiResponse {
  static from(message?: string): OkApiResponse {
    return {
      code: HttpStatus.OK,
      message: message || 'OK',
    }
  }
}
