import { isEmail, isEmpty } from 'class-validator';
import dayjs from 'dayjs';
import { CreateAdministradorDto } from 'src/administradores/presentation/dtos/create-administrador.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { validateDocument } from 'src/shared/utils/validate-document';
import { validateBrazilianPhone } from 'src/shared/utils/validate-phone-number';

export async function validateRequestCreateAdmin(
  dto: CreateAdministradorDto,
): Promise<ErrorMessageCode[]> {
  const errors: ErrorMessageCode = [];

  if (!validateDocument({ doc: dto.cpf })) {
    errors.push({
      message: ErrorMessagesEnum.INVALID_CPF,
      code: ErrorCodesEnum.INVALID_CPF,
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

  if (!validateBrazilianPhone(dto.telefone)) {
    errors.push({
      message: ErrorMessagesEnum.INVALID_FORMAT_PHONE_NUMBER,
      code: ErrorCodesEnum.INVALID_FORMAT_PHONE_NUMBER,
    });
  }

  return errors;
}
