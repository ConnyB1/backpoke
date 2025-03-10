import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

const respuesta = {
  id: 1,
  email: "ejemplo@gmail.com",
  password: "123456",
  createdAt: new Date(),
  updatedAt: new Date(),
  oculto: false,
};

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,{
        provide: PrismaService,
        useValue: {
          user: {
            findUnique: jest.fn(),
            create: jest.fn(),
            findMany: jest.fn(),
            update: jest.fn(),
          },
        },
      }],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('El pedido deberia ser registrado', async () => {
      const usuario: CreateUserDto = {
        email: 'test@example.com',
        password: '123456',
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(respuesta);

      const result = await service.create(usuario);
      expect(result).toEqual(respuesta);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: usuario,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of usuarios', async () => {
      const usuarios: User[] = [respuesta];

      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(usuarios);

      const result = await service.findAll();
      expect(result).toEqual(usuarios);
      expect(prismaService.user.findMany).toHaveBeenCalled();
    });
    it('Si la función no se encuentra nada en la BD', async () => {});
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const id = 1;

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(respuesta);

      const result = await service.findOne(id);
      expect(result).toEqual(respuesta);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
    it('Si la función no se encuentra nada en la BD', async () => {});
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = 1;
      const updateUserDto = {
        email: 'test@example.com',
        password: '123456',
      };

      jest.spyOn(prismaService.user, 'update').mockResolvedValue(respuesta);

      const result = await service.update(id, updateUserDto);
      expect(result).toEqual(respuesta);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id },
        data: updateUserDto,
      });
    });
    it('Si la función no se encuentra nada en la BD', async () => {});
  });

  describe('remove', () => {
    it('should hide a user', async () => {
      const id = 1;

      jest.spyOn(prismaService.user, 'update').mockResolvedValue(respuesta);

      const result = await service.remove(id);
      expect(result).toEqual(respuesta);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id },
        data: { oculto: true },
      });
    });
  });
  it('Si la función no se encuentra nada en la BD', async () => {});
});