import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { Category } from "../schemas/restaurant.schema";

export class CreateRestaurantDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsEmail({} , { message: "please, enter correct email" })
    readonly email: string;

    @IsNotEmpty()
    @IsPhoneNumber('BR')
    readonly phone: number;

    @IsNotEmpty()
    @IsString()
    readonly address: string;

    @IsNotEmpty()
    @IsEnum(Category, { message: "please, enter correct category" })
    readonly category: Category;

    @IsNumber()
    readonly cep: number;

    //readonly image?: object[];
}