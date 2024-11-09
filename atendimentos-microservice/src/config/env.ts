import * as dotenv from 'dotenv';
dotenv.config();

export const dbEnvs = {
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  url: process.env.POSTGRES_URL,
};

export const jwtConstants = {
  secret: process.env.AUTH_SECRET,
  expiresIn: process.env.EXPIRES_IN,
};

export const urlAdminsApi = 'http://localhost:3000/api/admins';
export const urlMedicosApi = 'http://localhost:3001/api/medicos';
export const urlPacientesApi = 'http://localhost:3002/api/pacientes';
