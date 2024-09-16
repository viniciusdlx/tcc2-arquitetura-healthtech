import { Controller, Get } from '@nestjs/common';
import { PacienteService } from 'src/pacientes/application/services/paciente.service';

@Controller()
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Get()
  getHello(): string {
    return this.pacienteService.getHello();
  }
}
