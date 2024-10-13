import { isUUID } from 'class-validator';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { validateDocument } from 'src/shared/utils/validate-document';

type Req = {
  cpf?: string;
  id?: string;
};

export async function validateRequestFindAtendimento(
  req: Req,
): Promise<ErrorMessageCode[]> {
  const errors: ErrorMessageCode = [];

  if (req.cpf && !validateDocument({ doc: req.cpf })) {
    errors.push({
      message: ErrorMessagesEnum.INVALID_CPF,
      code: ErrorCodesEnum.INVALID_CPF,
    });
  }

  if (req.id && !isUUID(req.id)) {
    errors.push({
      message: ErrorMessagesEnum.INVALID_ID,
      code: ErrorCodesEnum.INVALID_ID,
    });
  }

  return errors;
}
