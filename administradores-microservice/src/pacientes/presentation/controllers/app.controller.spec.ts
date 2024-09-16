import { Test, TestingModule } from '@nestjs/testing';
import { PacienteService } from 'src/pacientes/application/services/paciente.service';
import { PacienteController } from './paciente.controller';

describe('PacienteController', () => {
  let pacienteController: PacienteController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PacienteController],
      providers: [PacienteService],
    }).compile();

    pacienteController = app.get<PacienteController>(PacienteController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(pacienteController.getHello()).toBe('Hello World!');
    });
  });
});
