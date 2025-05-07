import { DynamicModule, Module } from '@nestjs/common'
import { ConfigFactory, ConfigModule } from '@nestjs/config'
import { coreConfig } from './config'

@Module({})
export class CoreModule {
  static forRoot(configFactory?: ConfigFactory): DynamicModule {
    return {
      global: true,
      module: this,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [
            `.env.${process.env.APP_NAME ?? 'common'}`,
            `.env.${process.env.ENV}`,
            '.env',
          ],
          load: [coreConfig, ...(configFactory ? [configFactory] : [])],
        }),
      ],
    }
  }
}
