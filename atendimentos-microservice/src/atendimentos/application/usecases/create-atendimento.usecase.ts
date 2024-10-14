import { Inject } from '@nestjs/common';
import { Atendimento } from 'src/atendimentos/domain/entities/atendimento.entity';
import { IAtendimentoRepository } from 'src/atendimentos/domain/interfaces/atendimento-repository.interface';
import { MedicosAxiosApi } from 'src/atendimentos/infra/http/medicos-axios-api';
import { validateRequestCreateAtendimento } from 'src/atendimentos/infra/validators/create-atendimento.validator';
import { AtendimentoOutputDto } from 'src/atendimentos/presentation/dtos/atendimento-output.dto';
import { CreateAtendimentoDto } from 'src/atendimentos/presentation/dtos/create-atendimento.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { BadRequestException } from 'src/shared/exceptions/bad-request-exception';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { dateToString } from 'src/shared/utils/date-to-string';
import { isTimeAvailable } from 'src/shared/utils/is-time-available';

export class CreateAtendimentoUseCase {
  constructor(
    @Inject('IAtendimentoRepository')
    private readonly atendimentoRepository: IAtendimentoRepository,
    private readonly medicosAxiosApi: MedicosAxiosApi,
  ) {}

  async execute(dto: CreateAtendimentoDto): Promise<AtendimentoOutputDto> {
    await this.validate(dto);

    const newAppointment = new Atendimento({
      data: dto.data,
      horario: dto.horario,
      modalidade: dto.modalidade,
      local: dto.local,
      medicoId: dto.medicoId,
      pacienteId: dto.pacienteId,
      adminId: dto.adminId,
    });

    return;

    const createdAppointment =
      await this.atendimentoRepository.insert(newAppointment);

    console.log('createdDr -> ', createdAppointment);

    return {
      ...createdAppointment,
      data: dateToString(new Date(createdAppointment.data), 'DD/MM/YYYY'),
      dataCriacao: dateToString(
        createdAppointment.dataCriacao,
        'DD/MM/YYYY HH:mm:ss',
      ),
      dataAtualizacao: dateToString(
        createdAppointment.dataAtualizacao,
        'DD/MM/YYYY HH:mm:ss',
      ),
    };
  }

  private async validateBusinessRules(
    dto: CreateAtendimentoDto,
  ): Promise<ErrorMessageCode[]> {
    const errors: ErrorMessageCode = [];

    // busca o user pelo cpf
    const appointments = await this.atendimentoRepository.findByDateAndDoctor({
      date: dto.data,
      doctorId: dto.medicoId,
    });

    const appointmentsHours = appointments.map((ap) => ap.horario.slice(0, 5));

    if (appointmentsHours.includes(dto.horario)) {
      errors.push({
        message: ErrorMessagesEnum.UNAVAILABLE_HOUR,
        code: ErrorCodesEnum.UNAVAILABLE_HOUR,
      });
    }

    const doctor = await this.medicosAxiosApi.findById(dto.medicoId);

    if (!doctor) {
      errors.push({
        message: ErrorMessagesEnum.DOCTOR_NOT_FOUND,
        code: ErrorCodesEnum.DOCTOR_NOT_FOUND,
      });
    }

    if (
      !isTimeAvailable({
        date: dto.data,
        time: dto.horario,
        schedule: doctor.horarios,
      })
    ) {
      errors.push({
        message: ErrorMessagesEnum.DOCTOR_UNAVAILABLE_HOUR,
        code: ErrorCodesEnum.DOCTOR_UNAVAILABLE_HOUR,
      });
    }

    return errors;
  }

  private async validate(req: CreateAtendimentoDto): Promise<void> {
    const validateRequest = await validateRequestCreateAtendimento(req);
    const validateBusinessRules = await this.validateBusinessRules(req);

    const allErrors = [...validateRequest, ...validateBusinessRules];

    if (allErrors.length > 0) {
      throw new BadRequestException(allErrors);
    }
  }
}
