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
import { IAdminService } from 'src/administradores/domain/interfaces/admin-service.interface';
import { AdministradorOutputDto } from '../dtos/administrador-output.dto';
import { CreateAdministradorDto } from '../dtos/create-administrador.dto';

@ApiTags('admins')
@Controller('admins')
export class AdminController {
  constructor(
    @Inject('IAdminService')
    private readonly adminService: IAdminService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Administrador cadastrado com sucesso.',
  })
  @ApiBadRequestResponse()
  @ApiBody({ type: CreateAdministradorDto })
  @ApiResponse({ type: AdministradorOutputDto })
  async create(@Body() dto: CreateAdministradorDto, @Res() res: Response) {
    const admin = await this.adminService.create(dto);
    return res.status(HttpStatus.CREATED).json(admin);
  }

  @Get(':id')
  @ApiResponse({ type: AdministradorOutputDto })
  async findById(@Param('id') id: string, @Res() res: Response) {
    const admin = await this.adminService.findById(id);
    return res.status(HttpStatus.OK).json(admin);
  }

  @Get()
  @ApiResponse({ type: [AdministradorOutputDto] })
  async getAll(@Res() res: Response) {
    const admin = await this.adminService.getAll();
    return res.status(HttpStatus.OK).json(admin);
  }
}
