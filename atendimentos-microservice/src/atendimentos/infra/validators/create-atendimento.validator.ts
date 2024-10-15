import { isUUID } from 'class-validator';
import { CreateAtendimentoDto } from 'src/atendimentos/presentation/dtos/create-atendimento.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { isBeforeCurrentTime } from 'src/shared/utils/is-before-current-time';
import { isBeforeToday } from 'src/shared/utils/is-before-today';
import { isToday } from 'src/shared/utils/is-today';
import { isModalityAppointment } from 'src/shared/utils/is-valid-modality-appointment';

export async function validateRequestCreateAtendimento(
  dto: CreateAtendimentoDto,
): Promise<ErrorMessageCode[]> {
  const errors: ErrorMessageCode = [];

  if (isBeforeToday(dto.data)) {
    errors.push({
      message: ErrorMessagesEnum.DATE_IS_BEFORE,
      code: ErrorCodesEnum.DATE_IS_BEFORE,
    });
  }

  // Só verifica se o horário é antes do atual se for no mesmo dia
  if (isToday(dto.data) && isBeforeCurrentTime(dto.horario)) {
    errors.push({
      message: ErrorMessagesEnum.HOUR_IS_BEFORE,
      code: ErrorCodesEnum.HOUR_IS_BEFORE,
    });
  }

  if (!isModalityAppointment(dto.modalidade)) {
    errors.push({
      message: ErrorMessagesEnum.INVALID_MODALITY,
      code: ErrorCodesEnum.INVALID_MODALITY,
    });
  }

  if (!isUUID(dto.medicoId)) {
    errors.push({
      message: ErrorMessagesEnum.INVALID_DOCTOR_ID,
      code: ErrorCodesEnum.INVALID_DOCTOR_ID,
    });
  }

  if (!isUUID(dto.pacienteId)) {
    errors.push({
      message: ErrorMessagesEnum.INVALID_PATIENT_ID,
      code: ErrorCodesEnum.INVALID_PATIENT_ID,
    });
  }

  if (!isUUID(dto.adminId)) {
    errors.push({
      message: ErrorMessagesEnum.INVALID_ADMIN_ID,
      code: ErrorCodesEnum.INVALID_ADMIN_ID,
    });
  }

  return errors;
}
