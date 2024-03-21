import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

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

export enum Category {
    FAST_FOOD = 'fast food',
    CAFE = 'Cafe',
    FINE_DINNING = 'Fine Dinning',
}

@Schema()
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
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);