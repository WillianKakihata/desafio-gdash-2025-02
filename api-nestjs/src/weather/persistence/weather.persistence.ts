import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { WeatherPersistenceInterface } from "./weather.persistence.interface";
import { WeatherLogModelIn } from "../dto/in/weather.log.model.in";
import { Weather, WeatherDocument } from "../entities/weather.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ExceptionMessage } from "src/common/exception/exception.messages";

@Injectable()
export class WeatherPersistence implements WeatherPersistenceInterface {
    constructor(
        @InjectModel(Weather.name)
        private readonly weatherModel: Model<Weather>
    ) {}

    public async saveWeatherLog(weather: WeatherLogModelIn): Promise<WeatherDocument> {
        try {
            return await this.weatherModel.create(weather);
        } catch {
          throw new InternalServerErrorException(ExceptionMessage.WEATHER.CREATE);  
        }
    }

    public async getAllWeather(sub: string): Promise<WeatherDocument[]> {
        try {
            return await this.weatherModel.find({ sub });
        } catch {
            throw new InternalServerErrorException(ExceptionMessage.WEATHER.FIND_ALL); 
        }
    }


}