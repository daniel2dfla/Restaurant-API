import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import APIFeatures from '../utils/apiFeatures.util';

@Injectable()
export class RestaurantsService {
    constructor(@InjectModel(Restaurant.name) private restaurantModel: mongoose.Model<Restaurant>) {}

    async findAll(query: Query): Promise<Restaurant[]> {

        const keyword = query.keyword ? {
            name: {
                $regex: query.keyword,
                $options: 'i'
            }
        }:{}
        
        const restaurants = await this.restaurantModel.find({ ...keyword });

        return restaurants
    }

    async create(restaurant: Restaurant): Promise<Restaurant> {

        const location = await APIFeatures.getRestaurantLocation(restaurant.cep);
        
        const data = Object.assign(restaurant, {location})

        const res = await this.restaurantModel.create(data);

        return res;
    }

    async findById(id: string): Promise<Restaurant> {

        const isValid = mongoose.isValidObjectId(id);

        if(!isValid) {
            throw new BadRequestException('Wrong mongoose ID Error. Please enter correct ID.')
        }

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
