import { ApiProperty } from '@nestjs/swagger';

export class CreateAdministradorDto {
  @ApiProperty({ type: 'string', example: 'Admin 1' })
  nome: string;

  @ApiProperty({ type: 'string', example: '123.456.789-10' })
  cpf: string;

  @ApiProperty({ type: 'string', example: 'email@email.com' })
  email: string;

  @ApiProperty({ type: 'string', example: '(48) 9 9999-9999' })
  telefone: string;

  @ApiProperty({ type: 'string', example: '1998-10-19' })
  dataNascimento: string;
}
