import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { urlAdminsApi } from 'src/config/env';
import { AdminResponse } from 'src/shared/types/admin-response';
import { defaultInternalServerError } from 'src/shared/utils/default-internal-server-error';

@Injectable()
export class AdminsAxiosApi {
  constructor(private readonly axiosService: HttpService) {}

  async findById(id: string): Promise<AdminResponse> {
    try {
      const response = await this.axiosService.axiosRef.get(
        `${urlAdminsApi}/${id}`,
      );

      return response.data as AdminResponse;
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
