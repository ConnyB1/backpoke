import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';  
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crea un usuario y valida que el email no se repita
   * @param createUserDto 
   * @returns Usuario creado o mensaje de error
   */

   async create(createUserDto: CreateUserDto) {
    const emailExists = await this.prisma.user.findUnique({
      where: {email: createUserDto.email},
    });
    if (!emailExists) {
      this.logger.error(`El email ${createUserDto.email} ya existe`);
      throw new ConflictException('El correo ya esta registrado');
    }
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number){
    return this.prisma.user.update({
        where: { id },
        data: {oculto: true},
    })
  }
}