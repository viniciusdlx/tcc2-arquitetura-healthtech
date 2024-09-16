import { Administrador } from '../entities/administrador.entity';

export interface IAdministradorRepository {
  insert(data: Partial<Administrador>): Promise<Administrador>;
  findAll(): Promise<Administrador[]>;
  findById(id: string): Promise<Administrador>;
  update(id: string, data: Partial<Administrador>): Promise<void>;
}
