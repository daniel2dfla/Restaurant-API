import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
    constructor(private readonly restaurantsService: RestaurantsService) {}

    @Get()
    async getAllRestaurants(): Promise<Restaurant[]> {
        return this.restaurantsService.findAll();
    }

    @Post()
    async createRestaurant(@Body() body: CreateRestaurantDto): Promise<Restaurant> {
        return this.restaurantsService.create(body);
    }

    @Get(':id')
    async getRestaurant(@Param('id') id: string): Promise<Restaurant> {
        return this.restaurantsService.findById(id);
    }

    @Put(':id')
    async updateById( @Param('id') id: string, @Body() body: UpdateRestaurantDto): Promise<Restaurant> {
        return this.restaurantsService.updateById(id, body);
    }

    @Delete(':id')
    async deleteById( @Param('id') id: string): Promise<{ deleted: boolean }> {
        const rest = await this.restaurantsService.deleteById(id);
        if(rest){
            return {
                deleted: true
            }
        }
    }

    @Delete()
    async deleteAll(): Promise<void> {
        await this.restaurantsService.deleteAll();
    }
}