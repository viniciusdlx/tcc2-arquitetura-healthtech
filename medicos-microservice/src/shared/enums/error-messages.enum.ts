export enum ErrorMessagesEnum {
  INTERNAL_ERROR = 'Erro interno no servidor.',
  UNKNOW_ERROR = 'Erro desconhecido.',
  UNAUTHORIZED = 'Unauthorized.',
  INVALID_BIRTH_DATE = 'A data de nascimento não pode ser maior que a data atual.',
  INVALID_CPF = 'O cpf não foi informado ou está inválido.',
  INVALID_EMAIL = 'O email não foi informado ou está inválido.',
  REQUIRED_NAME = 'O nome é obrigatório.',
  REQUIRED_BIRTH_DATE = 'A data de nascimento é obrigatória.',
  REQUIRED_CRM = 'O CRM é obrigatório.',
  DOCTOR_NOT_FOUND = 'Médico inválido.',
  INVALID_DOCUMENT = 'Documento inválido. Deve conter 11 dígitos (CPF) ou 14 dígitos (CNPJ).',
}
