import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../auth/schemas/user.schema';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('restaurants')
export class RestaurantsController {
    constructor(private readonly restaurantsService: RestaurantsService) {}

    @Get()
    async getAllRestaurants(
        @Query() query: ExpressQuery,
    ): Promise<Restaurant[]> {
        return this.restaurantsService.findAll(query);
    }

    @Post()
    @UseGuards(AuthGuard(), RolesGuard)
    @Roles('admin', 'user')
    async createRestaurant(@Body() 
        body: CreateRestaurantDto,
        @CurrentUser() user: User
    ): Promise<Restaurant> {
        return this.restaurantsService.create(body, user);
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    async getRestaurant(@Param('id') id: string): Promise<Restaurant> {
        return this.restaurantsService.findById(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    @Roles('admin', 'user')
    async updateById( 
        @Param('id') 
        id: string, 
        @Body() 
        body: UpdateRestaurantDto,
        @CurrentUser() user: User
    ): Promise<Restaurant> {
        const restaurant = await this.restaurantsService.findById(id)

        if(restaurant.user.toString() !== user._id.toString()) {
            throw new ForbiddenException('You can not update this restaurant.')
        }

        return this.restaurantsService.updateById(id, body);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteById( @Param('id') id: string, @CurrentUser() user: User): Promise<{ deleted: boolean }> {
        
        const restaurant = await this.restaurantsService.findById(id)

        if(restaurant.user.toString() !== user._id.toString()) {
            throw new ForbiddenException('You can not delete this restaurant.')
        }

        const rest = await this.restaurantsService.deleteById(id);
        if(rest){
            return {
                deleted: true
            }
        }
    }

    @Delete()
    @UseGuards(AuthGuard())
    async deleteAll(): Promise<void> {
        await this.restaurantsService.deleteAll();
    }
}