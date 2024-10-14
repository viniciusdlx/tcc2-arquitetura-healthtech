import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { urlPacientesApi } from 'src/config/env';
import { PacienteResponse } from 'src/shared/types/paciente-response';
import { defaultInternalServerError } from 'src/shared/utils/default-internal-server-error';

@Injectable()
export class PacienteAxiosApi {
  constructor(private readonly axiosService: HttpService) {}

  async findById(id: string): Promise<PacienteResponse> {
    try {
      const response = await this.axiosService.axiosRef.get(
        `${urlPacientesApi}/${id}`,
      );

      return response.data as PacienteResponse;
    } catch (error) {
      console.log('error -> ', error.response.data);

      if (error.response.status === 400) {
        return null;
      }

      if (error.response.status === 500) {
        defaultInternalServerError();
      }
    }
  }
}
