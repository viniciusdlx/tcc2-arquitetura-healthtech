import { ApiProperty } from '@nestjs/swagger';
import { HorariosMedico } from 'src/medicos/domain/entities/medico.entity';

export class MedicoOutputDto {
  @ApiProperty({ example: 'f4837057-0181-4923-b40a-79e57f27861a' })
  id: string;

  @ApiProperty({ example: 'João' })
  nome: string;

  @ApiProperty({ example: '12345678910' })
  cpf: string;

  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @ApiProperty({ example: '10/10/1990' })
  dataNascimento: string;

  @ApiProperty({ example: 'MG' })
  estadoCrm: string;

  @ApiProperty({ example: '123456' })
  crm: string;

  @ApiProperty({ example: '99999999999' })
  telefone: string;

  @ApiProperty({
    example: {
      dom: ['08:00', '10:00', '14:00'],
      seg: [],
      ter: [],
      qua: [],
      qui: [],
      sex: [],
      sab: [],
    },
  })
  horarios: HorariosMedico;

  @ApiProperty({ example: '10/10/1990 20:00:00' })
  dataCriacao: string;

  @ApiProperty({ example: '10/10/1990 20:00:00' })
  dataAtualizacao: string;
}
