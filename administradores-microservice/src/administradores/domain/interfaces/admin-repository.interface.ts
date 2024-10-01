import { Administrador } from '../entities/administrador.entity';

export interface IAdminRepository {
  insert(data: Partial<Administrador>): Promise<Administrador>;
  findById(id: string): Promise<Administrador>;
  findAll(): Promise<Administrador[]>;
}
