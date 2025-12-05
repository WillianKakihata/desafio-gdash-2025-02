import { WeatherLogModelIn } from "../dto/in/weather.log.model.in";
import { WeatherDocument } from "../entities/weather.schema";

export interface WeatherPersistenceInterface {
  saveWeatherLog(weather: WeatherLogModelIn): Promise<WeatherDocument>;
  getAllWeather(sub: string): Promise<WeatherDocument[]>;
}