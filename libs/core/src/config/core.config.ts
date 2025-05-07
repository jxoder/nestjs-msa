import { LogLevel } from '@nestjs/common'
import { ConfigType, registerAs } from '@nestjs/config'
import { get } from 'env-var'

export const coreConfig = registerAs('core', () => ({
  ENV: get('ENV').required().asString(),
  APP_NAME: get('APP_NAME').required().asString(),
  LOG_LEVEL: get('LOG_LEVEL')
    .default('log')
    .asEnum(['log', 'error', 'warn', 'debug', 'verbose', 'fatal']) as LogLevel,
}))

export const CORE_CONFIG_KEY = coreConfig.KEY
export type CoreConfigType = ConfigType<typeof coreConfig>
