import { IsDate, IsNumber, IsString } from "class-validator";

export class WeatherLogRequest {
  @IsNumber({}, {message: 'The temperature value must be numeric.'})
  Temperatura : number;

  @IsNumber({}, {message: 'The humidity value must be numeric.'})
  Umidade: number;

  @IsNumber({}, {message: 'The wind value must be numeric.'})
  Vento: number;

  @IsString({message: 'The condition must be a string.'})
  Condicao: string;
  
  @IsNumber({}, {message: 'The rain value must be numeric.'})
  Chuva: number;
}
