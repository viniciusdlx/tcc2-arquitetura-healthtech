import { isEmail, isEmpty } from 'class-validator';
import dayjs from 'dayjs';
import { CreateMedicoDto } from 'src/medicos/presentation/dtos/create-medico.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { isValidStateCode } from 'src/shared/utils/check-brazilian-state';
import { validateDocument } from 'src/shared/utils/validate-document';

export async function validateRequestCreateMedico(
  dto: CreateMedicoDto,
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

  if (!dto.crm) {
    errors.push({
      message: ErrorMessagesEnum.REQUIRED_CRM,
      code: ErrorCodesEnum.REQUIRED_CRM,
    });
  }

  if (!isValidStateCode(dto.estadoCrm)) {
    errors.push({
      message: ErrorMessagesEnum.INVALID_STATE,
      code: ErrorCodesEnum.INVALID_STATE,
    });
  }

  // if()

  console.log('errors -> ', errors);

  return errors;
}
