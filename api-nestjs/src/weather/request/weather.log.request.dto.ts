import { IsDate, IsNumber, IsString } from "class-validator";

export class WeatherLogRequest {
  @IsNumber({}, {message: 'The temperature value must be numeric.'})
  temperatura : number;

  @IsNumber({}, {message: 'The humidity value must be numeric.'})
  umidade: number;

  @IsNumber({}, {message: 'The wind value must be numeric.'})
  vento: number;

  @IsString({message: 'The condition must be a string.'})
  condicao: string;
  
  @IsNumber({}, {message: 'The rain value must be numeric.'})
  chuva: number;
}
