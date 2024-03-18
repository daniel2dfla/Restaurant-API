import { Category } from "../schemas/restaurant.schema";

export class CreateRestaurantDto {
    readonly name: string;
    readonly description: string;
    readonly email: string;
    readonly phone: number;
    readonly address: string;
    readonly category: Category;
    readonly image?: object[];
}