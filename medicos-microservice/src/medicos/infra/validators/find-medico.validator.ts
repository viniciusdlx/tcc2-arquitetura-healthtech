import { isUUID } from 'class-validator';
import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { validateDocument } from 'src/shared/utils/validate-document';

type Req = {
  cpf?: string;
  id?: string;
};

export async function validateRequestFindMedico(
  req: Req,
): Promise<ErrorMessageCode[]> {
  const errors: ErrorMessageCode = [];

  if (req.cpf && !validateDocument({ doc: req.cpf })) {
    errors.push({
      message: ErrorMessagesEnum.INVALID_DOCUMENT,
      code: ErrorCodesEnum.INVALID_DOCUMENT,
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
