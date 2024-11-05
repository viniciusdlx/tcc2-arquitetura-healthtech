import { ApiProperty } from '@nestjs/swagger';
import { HorariosMedico } from 'src/medicos/domain/entities/medico.entity';

export class UpdateMedicoDto {
  id?: string;

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
