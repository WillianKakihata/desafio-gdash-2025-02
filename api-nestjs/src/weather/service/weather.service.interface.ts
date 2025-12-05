import { WeatherLogModelIn } from "../dto/in/weather.log.model.in";
import { WeatherLogModelOut } from "../dto/out/weather.log.model.out";

export interface WeatherServiceInterface {
  saveWeather(weather: WeatherLogModelIn, sub: string): Promise<WeatherLogModelOut>;
  getAll(sub: string): Promise<WeatherLogModelOut[]>;
  exportCsv(sub: string): Promise<Buffer>;
  exportXlsx(sub: string): Promise<Buffer>;
  insights(sub: string): Promise<string>;
}