import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dbEnvs } from '../env';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: dbEnvs.host,
  port: dbEnvs.port,
  username: dbEnvs.username,
  password: dbEnvs.password,
  database: dbEnvs.database,
  entities: [__dirname + '../../../**/**/**/**/**/*.schema{.ts,.js}'],
  migrations: [`${__dirname}/../../migrations/{.ts,*.js}`],
  migrationsRun: true,
  // synchronize: true,
  // logging: true,
};

export const ormConfig = typeOrmConfig;
