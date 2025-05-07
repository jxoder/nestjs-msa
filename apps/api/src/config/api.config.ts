import { ConfigType, registerAs } from '@nestjs/config'
import { get } from 'env-var'

export const apiConfig = registerAs('api', () => ({
  HOST: get('HOST').default('0.0.0.0').asString(),
  PORT: get('PORT').required().asPortNumber(),

  // CORS
  ORIGINS: get('ORIGINS').default('').asArray(),
}))

export const API_CONFIG_KEY = apiConfig.KEY
export type ApiConfigType = ConfigType<typeof apiConfig>
