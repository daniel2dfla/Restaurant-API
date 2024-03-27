import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { User } from "../../auth/schemas/user.schema";
import { Category } from "../constants/enum-restaurants-category";

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

    @IsEmpty({ message: "You cannot provide the user ID." })
    readonly user: User

    //readonly image?: object[];
}