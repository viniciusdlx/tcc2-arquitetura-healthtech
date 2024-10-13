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
  APPOINTMENT_NOT_FOUND = 'Atendimento inválido.',
  APPOINTMENT_ALREADY_EXIST = 'Erro ao agendar atendimento, verifique os dados.',
  INVALID_APPOINTMENT_DATE_HOUR = 'A data ou horário do atendimento é inválido.',
  INVALID_DOCUMENT = 'Documento inválido. Deve conter 11 dígitos (CPF) ou 14 dígitos (CNPJ).',
  INVALID_STATE = 'O código do estado informado é inválido (Ex: SP).',
  INVALID_ID = 'O id informado é inválido.',
  INVALID_FORMAT_PHONE_NUMBER = 'O formato do telefone informado é inválido.',
  DATE_IS_BEFORE = 'A data informada não pode ser anterior ao dia atual.',
}
