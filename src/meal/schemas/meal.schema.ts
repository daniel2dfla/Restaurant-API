import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import { Restaurant } from "../../restaurants/schemas/restaurant.schema";
import { User } from "../../auth/schemas/user.schema";
import { Category } from "../constants/enum-meal-category";


@Schema({
    timestamps: true,
})
export class Meal {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    category: Category

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'
    })
    restaurant: Restaurant;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    })
    user: User;
}

export const MealSchema = SchemaFactory.createForClass(Meal)