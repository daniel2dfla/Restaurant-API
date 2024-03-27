import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schemas/user.schema";
import * as mongoose from 'mongoose';
import { Category } from "../constants/enum-restaurants-category";

@Schema()
export class Location {
    @Prop({ type: String, enum: ['Point']})
    type: string;

    @Prop({ index: '2dsphere' })
    coordinates: Number[];

    formattedAddress: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
}

@Schema({
    timestamps: true,
})
export class Restaurant {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    email: string;

    @Prop()
    phone: number;

    @Prop()
    address: string;

    @Prop()
    category: Category;

    @Prop()
    cep: number;

    @Prop()
    image?: object[];

    @Prop({ type: Object, ref: 'Location'})
    location?: Location;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);