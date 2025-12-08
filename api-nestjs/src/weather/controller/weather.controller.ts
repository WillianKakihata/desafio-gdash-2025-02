import { Body, Controller, Get, Inject, Post, Res, UseGuards } from "@nestjs/common";
import { WeatherServiceInterface } from "../service/weather.service.interface";
import { User } from "src/common/decorators/user.decorator";
import { WeatherLogModelOut } from "../dto/out/weather.log.model.out";
import { WeatherLogRequest } from "../request/weather.log.request.dto";
import { WeatherMapper } from "../dto/weather.mapper";
import { AuthGuard } from "src/common/guards/auth.guard";
import { Response } from "express";

@UseGuards(AuthGuard)
@Controller('api/weather')
export class WeatherController {
  constructor(
    @Inject('WeatherServiceInterface')
    private readonly weatherService: WeatherServiceInterface
  ) {}

  @Post('/logs')
  public async saveLog(
    @User('sub')
    sub: string,
    @Body()
    log: WeatherLogRequest
  ): Promise<WeatherLogModelOut> {
    console.log('Recebendo log:', log, 'do user:', sub);
    const logModelIn = WeatherMapper.createWeatherRequestToWeatherModelIn(log)
    return await this.weatherService.saveWeather(logModelIn, sub);
  }

  @Get('/logs')
  public async getAllLogs(
    @User('sub')
    sub: string,
  ): Promise<WeatherLogModelOut[]> {
    return await this.weatherService.getAll(sub);
  }

  @Get('export/csv')
  async exportCsv(
    @User('sub') sub: string,
    @Res() res: Response
  ): Promise<void> {
    const buffer =  await this.weatherService.exportCsv(sub);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="weather.csv"');
    res.send(buffer);
  }

  @Get('export/xlsx')
  async exportXlsx(
    @User('sub') sub: string,
    @Res() res: Response
  ): Promise<void> {
    const buffer =  await this.weatherService.exportXlsx(sub);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="weather.xlsx"');
    res.send(buffer);
  }
  @Post('insights')
  async insights(
    @User('sub') sub: string,
  ): Promise<string> {
    return await this.weatherService.insights(sub);
  }

}