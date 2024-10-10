import { ErrorCodesEnum } from 'src/shared/enums/error-codes.enum';
import { ErrorMessagesEnum } from 'src/shared/enums/error-messages.enum';
import { ErrorMessageCode } from 'src/shared/types/error-message-code';
import { validateDocument } from 'src/shared/utils/validate-document';

type Req = {
  cpf?: string;
};

export async function validateRequestFindMedico(
  req: Req,
): Promise<ErrorMessageCode[]> {
  const errors: ErrorMessageCode = [];

  if (!validateDocument({ doc: req.cpf })) {
    errors.push({
      message: ErrorMessagesEnum.INVALID_DOCUMENT,
      code: ErrorCodesEnum.INVALID_DOCUMENT,
    });
  }

  return errors;
}
