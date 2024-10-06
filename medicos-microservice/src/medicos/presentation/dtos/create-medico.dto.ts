import { ApiProperty } from '@nestjs/swagger';
import { HorariosMedico } from 'src/medicos/domain/entities/medico.entity';

export class CreateMedicoDto {
  @ApiProperty({ type: 'string', example: 'José Pereira' })
  nome: string;

  @ApiProperty({ type: 'string', example: '123.456.789-10' })
  cpf: string;

  @ApiProperty({ type: 'string', example: 'email@email.com' })
  email: string;

  @ApiProperty({ type: 'string', example: '1999-04-25' })
  dataNascimento: string;

  @ApiProperty({ type: 'string', example: '123456' })
  crm: string;

  @ApiProperty({ type: 'string', example: 'RJ' })
  estadoCrm: string;

  @ApiProperty({ type: 'string', example: 'Clínico Geral' })
  especialidade: string;

  @ApiProperty({ type: 'string', example: '(99) 9 9999-9999' })
  telefone: string;

  @ApiProperty({
    type: 'object',
    description: 'Horários disponíveis por dia da semana',
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
  horarios?: HorariosMedico;
}
