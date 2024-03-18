import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class RestaurantsService {
    constructor(@InjectModel(Restaurant.name) private restaurantModel: mongoose.Model<Restaurant>) {}

    async findAll(): Promise<Restaurant[]> {
        
        const restaurants = await this.restaurantModel.find();

        return restaurants
    }

    async create(restaurant: Restaurant): Promise<Restaurant> {
        const res = await this.restaurantModel.create(restaurant);
        return res;
    }

    async findById(id: string): Promise<Restaurant> {
        const res = await this.restaurantModel.findById(id);

        if(!res) {
            throw new NotFoundException('Restaurant not found')
        }

        return res;
    }

    async updateById(id: string, restaurant: Restaurant ): Promise<Restaurant> {
        return this.restaurantModel.findByIdAndUpdate(id, restaurant, {
            new: true,
            runValidators: true
        });
    }

    async deleteById(id: string): Promise<Restaurant> {
        return this.restaurantModel.findByIdAndDelete(id)
    }

    async deleteAll(): Promise<void> {
        await this.restaurantModel.deleteMany()
    }
}
