import { isEmail, isEmpty } from 'class-validator';
import dayjs from 'dayjs';
import { CreatePacienteDto } from 'src/pacientes/presentation/dtos/create-paciente.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { validateDocument } from 'src/shared/utils/validate-document';

export async function validateRequestCreatePaciente(
  dto: CreatePacienteDto,
): Promise<ErrorMessageCode[]> {
  const errors: ErrorMessageCode = [];

  if (!validateDocument({ doc: dto.cpf })) {
    errors.push({
      message: ErrorMessagesEnum.INVALID_DOCUMENT,
      code: ErrorCodesEnum.INVALID_DOCUMENT,
    });
  }

  if (isEmpty(dto.nome)) {
    errors.push({
      message: ErrorMessagesEnum.REQUIRED_NAME,
      code: ErrorCodesEnum.REQUIRED_NAME,
    });
  }

  if (!isEmail(dto.email)) {
    errors.push({
      message: ErrorMessagesEnum.INVALID_EMAIL,
      code: ErrorCodesEnum.INVALID_EMAIL,
    });
  }

  if (!dto.dataNascimento) {
    errors.push({
      message: ErrorMessagesEnum.REQUIRED_BIRTH_DATE,
      code: ErrorCodesEnum.INVALID_BIRTH_DATE,
    });
  }

  if (dayjs(dto.dataNascimento).isAfter(dayjs())) {
    errors.push({
      message: ErrorMessagesEnum.INVALID_BIRTH_DATE,
      code: ErrorCodesEnum.INVALID_BIRTH_DATE,
    });
  }

  return errors;
}
