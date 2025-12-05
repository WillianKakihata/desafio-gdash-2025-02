import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { WeatherServiceInterface } from "./weather.service.interface";
import { WeatherLogModelIn } from "../dto/in/weather.log.model.in";
import { WeatherLogModelOut } from "../dto/out/weather.log.model.out";
import { WeatherPersistenceInterface } from "../persistence/weather.persistence.interface";
import { WeatherMapper } from "../dto/weather.mapper";
import { Parser } from 'json2csv';
import * as ExcelJS from 'exceljs';
import { OpenRouterService } from "src/openrouter/openrouter.service";
import { ExceptionMessage } from "src/common/exception/exception.messages";

@Injectable()
export class WeatherService implements WeatherServiceInterface {
    constructor(
        @Inject('WeatherPersistenceInterface') 
        private readonly weatherPersistence: WeatherPersistenceInterface,
        private readonly openrouter: OpenRouterService
    ){}
    public async saveWeather(newWeather: WeatherLogModelIn, id: string): Promise<WeatherLogModelOut> {
        newWeather.sub = id;
        newWeather.createdAt = new Date();
        const weatherDocument = await this.weatherPersistence.saveWeatherLog(newWeather);
        return WeatherMapper.weatherDocumentToWeatherModelOut(weatherDocument);
    }
    public async getAll(sub: string): Promise<WeatherLogModelOut[]> {
        const weatherDocument = await this.weatherPersistence.getAllWeather(sub);
        return WeatherMapper.arrayOfWeatherDocumentToWeatherModelOut(weatherDocument);
    }
    public async exportCsv(sub: string): Promise<Buffer> {
        const weatherDocument = await this.weatherPersistence.getAllWeather(sub);
        const weather = WeatherMapper.arrayOfWeatherDocumentToWeatherModelOut(weatherDocument);
        const parser = new Parser();
        const csv = parser.parse(weather);
        const buffer = Buffer.from(csv, 'utf-8');

        return await buffer;
    }
    public async exportXlsx(sub: string): Promise<Buffer> {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Weather');
        const weatherDocument = await this.weatherPersistence.getAllWeather(sub);
        const weather = WeatherMapper.arrayOfWeatherDocumentToWeatherModelOut(weatherDocument);
        sheet.columns = Object.keys(weather[0]).map(key => ({ header: key, key }));
        weather.forEach(item => sheet.addRow(item));
        const buffer = await workbook.xlsx.writeBuffer();
        return Buffer.from(buffer);
    }
    public async insights(sub: string): Promise<string> {
        const weatherDocument = await this.weatherPersistence.getAllWeather(sub);
        const weather = WeatherMapper.arrayOfWeatherDocumentToWeatherModelOut(weatherDocument);
        if (!weather || weather.length === 0) {
            throw new NotFoundException(ExceptionMessage.WEATHER.FIND_ALL);
        }
        return await this.openrouter.generateWeatherInsights(weather)
    }

}