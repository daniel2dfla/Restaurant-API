import { RestaurantsModule } from './restaurants/restaurants.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    RestaurantsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
