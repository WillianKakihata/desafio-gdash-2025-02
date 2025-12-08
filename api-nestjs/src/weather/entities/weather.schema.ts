import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument } from 'mongoose';

@Schema()
export class Weather {
  @Prop({ type: String, required: true })
  sub: string;

  @Prop({ type: Number, required: true })
  Temperatura: number;

  @Prop({ type: Number, required: true })
  Umidade: number;

  @Prop({ type: Number, required: true })
  Vento: number;

  @Prop({ type: String, required: true })
  Condicao: string;

  @Prop({ type: Number, required: true })
  Chuva: number;

  @Prop({ type: Date, required: true })
  createdAt: Date;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);
export type WeatherDocument = HydratedDocument<Weather>;
