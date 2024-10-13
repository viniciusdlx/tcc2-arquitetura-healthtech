import dayjs from 'dayjs';
import { CreateAtendimentoDto } from 'src/atendimentos/presentation/dtos/create-atendimento.dto';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';

export async function validateRequestCreateAtendimento(
  dto: CreateAtendimentoDto,
): Promise<ErrorMessageCode[]> {
  const errors: ErrorMessageCode = [];

  if (dayjs(dto.data).isBefore(dayjs())) {
    errors.push({
      message: ErrorMessagesEnum.DATE_IS_BEFORE,
      code: ErrorCodesEnum.DATE_IS_BEFORE,
    });
  }

  return errors;
}
