import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meal } from './schemas/meal.schema';
import * as mongoose from 'mongoose';
import { Restaurant } from '../restaurants/schemas/restaurant.schema';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class MealService {
    constructor(
        @InjectModel(Meal.name) private mealModel: mongoose.Model<Meal>,
        @InjectModel(Restaurant.name) private restaurantModel: mongoose.Model<Restaurant>
    ) {}

    async findAll(): Promise<Meal[]> {
        const meals = await this.mealModel.find();
        return meals;
    }

    async findByRestaurant(id: string): Promise<Meal[]> {
        const meals = await this.mealModel.find({ restaurant: id });
        return meals;
    }

    async create(meal: Meal, user: User): Promise<Meal> {
        const data = Object.assign(meal, { user: user._id })

        const restaurant = await this.restaurantModel.findById(meal.restaurant)

        if(!restaurant) {
            throw new NotFoundException('Restaurant not found with this ID.');
        }

        if(restaurant.user.toString() !== user._id.toString()) {
            throw new ForbiddenException('You can not add meal to this restaurant.')
        }

        const mealCreated = await this.mealModel.create(data);

        const mealWithId = await this.mealModel.findById(mealCreated._id)

        if (!mealWithId) {
            throw new NotFoundException('Meal not found with this ID.');
        }

        restaurant.menu.push(mealWithId);

        await restaurant.save();

        return mealCreated
    }

    async findById(id: string): Promise<Meal> {

        const isValidId = mongoose.isValidObjectId(id);

        if(!isValidId) {
            throw new BadRequestException('Wrong mongoose ID error.')
        }

        const meal = await this.mealModel.findById(id);

        if(!meal) {
            throw new NotFoundException('Meal not found with this ID.')
        }

        return meal
    }

    async updateById(id: string, meal: Meal): Promise<Meal> {
        const mealUpdated = await this.mealModel.findByIdAndUpdate(id, meal, {
            new: true,
            runValidators: true
        });

        return mealUpdated
    }

    async deleteById(id: string): Promise<boolean> {
        await this.mealModel.findByIdAndDelete(id)
        return true
    }
}
