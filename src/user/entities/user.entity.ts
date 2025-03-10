/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsInt, IsPositive, IsString, IsStrongPassword } from 'class-validator';
import { User as Modelo } from '@prisma/client';


export class User implements Modelo {

    @ApiProperty({
        description: 'Identificador único del usuario',
        example: 1,
        type: 'number',
        required: true,
    })
    @IsInt({ message: 'El id debe ser un número entero' })
    @IsPositive({ message: 'El id debe ser un número positivo' })
    id: number;


    @ApiProperty({
        description: 'Email del usuario',
        example: 'Juan',
        type: 'string',
        required: true,
    })
    @IsString({ message: 'El email debe ser un string' })
    @IsEmail({}, { message: 'El email debe ser válido' })
    email: string;


    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'Juan',
        type: 'string',
        required: true,
    })
    @IsString({ message: 'La contraseña debe ser un string' })
    @IsStrongPassword({}, { message: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo' })
    password: string;
    

    @ApiProperty({
        description: 'Nombre del usuario',
        example: '2025-03-04T16:27:51.212Z'
    })
    @IsDate({ message: 'La fecha de creación debe ser una fecha' })
    createdAt: Date;

    @ApiProperty({
        description: 'Nombre del usuario',
        example: '2025-03-04T16:27:51.212Z'
    })
    @IsDate({ message: 'La fecha de actualización debe ser una fecha' })
    updatedAt: Date;
    
    @ApiProperty({
        description: 'Indica si el usuario está oculto',
        example: true,
    })
    @IsBoolean({ message: 'El campo oculto debe ser un booleano' })
    oculto: boolean;
}
