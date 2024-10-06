import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { IMedicoService } from 'src/medicos/domain/interfaces/medico-service.interface';
import { CreateMedicoDto } from '../dtos/create-medico.dto';
import { MedicoOutputDto } from '../dtos/medico-output.dto';

@ApiTags('Medicos')
@Controller('medicos')
export class MedicoController {
  constructor(
    @Inject('IMedicoService')
    private readonly medicoService: IMedicoService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Médico cadastrado com sucesso.',
  })
  @ApiBadRequestResponse()
  @ApiBody({ type: CreateMedicoDto })
  @ApiResponse({ type: MedicoOutputDto })
  async create(@Body() dto: CreateMedicoDto, @Res() res: Response) {
    const doctor = await this.medicoService.create(dto);
    return res.status(HttpStatus.CREATED).json(doctor);
  }

  @Get(':id')
  @ApiResponse({ type: MedicoOutputDto })
  async findById(@Param('id') id: string, @Res() res: Response) {
    const doctor = await this.medicoService.findById(id);
    return res.status(HttpStatus.OK).json(doctor);
  }

  @Get()
  @ApiResponse({ type: [MedicoOutputDto] })
  async getAll(@Res() res: Response) {
    const doctor = await this.medicoService.getAll();
    return res.status(HttpStatus.OK).json(doctor);
  }
}
