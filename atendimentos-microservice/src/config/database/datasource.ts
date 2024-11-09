import { DataSource } from 'typeorm';
import { dbEnvs } from '../env'; // ajuste para o caminho correto do seu arquivo de variáveis de ambiente

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbEnvs.host,
  port: dbEnvs.port,
  username: dbEnvs.username,
  password: dbEnvs.password,
  database: dbEnvs.database,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  entities: [__dirname + '../../../**/**/**/**/**/*.schema{.ts,.js}'],
  migrations: [`${__dirname}/../../migrations/{.ts,*.js}`],
  migrationsRun: true,
  synchronize: false, // Isso deve ser false em produção
});
