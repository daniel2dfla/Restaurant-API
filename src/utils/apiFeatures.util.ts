import { JwtService } from "@nestjs/jwt";
import { Location } from "../restaurants/schemas/restaurant.schema";

const nodeGeoCoder = require('node-geocoder')

export default class APIFeatures {
    static async getRestaurantLocation(cep) {
        try{
            const options = {
                provider: process.env.GEOCODER_PROVIDER,
                httpAdapter: 'https',
                apiKey: process.env.GEOCODER_API_KEY,
                formatter: null
            };

            const geoCoder = nodeGeoCoder(options)

            const loc = await geoCoder.geocode(cep)

            const location: Location = {
                type: 'Point',
                coordinates: [loc[0].longitude, loc[0].latitude],
                formattedAddress: loc[0].formattedAddress,
                city: loc[0].city,
                state: loc[0].stateCode,
                zipcode: loc[0].zipcode,
                country: loc[0].countryCode,
            }

            return location

        } catch (error) {
            console.log(error.message);
        }
    }

    static async assignJwtToken(
        userId: string,
        jwtService: JwtService
    ): Promise<string>{

        const payload = { id: userId};

        const token = await jwtService.sign(payload);

        return token;
    }
}