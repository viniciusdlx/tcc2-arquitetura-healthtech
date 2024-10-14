import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { urlMedicosApi } from 'src/config/env';
import { MedicoResponse } from 'src/shared/types/medico-response';
import { defaultInternalServerError } from 'src/shared/utils/default-internal-server-error';

@Injectable()
export class MedicosAxiosApi {
  constructor(private readonly axiosService: HttpService) {}

  async findById(id: string): Promise<MedicoResponse> {
    try {
      const response = await this.axiosService.axiosRef.get(
        `${urlMedicosApi}/${id}`,
      );

      return response.data as MedicoResponse;
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
