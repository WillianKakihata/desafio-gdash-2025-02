import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { WeatherDocument } from "../entities/weather.schema";
import { WeatherLogModelOut } from "./out/weather.log.model.out";
import { ExceptionMessage } from "src/common/exception/exception.messages";
import { WeatherLogRequest } from "../request/weather.log.request.dto";
import { WeatherLogModelIn } from "./in/weather.log.model.in";

@Injectable()
export class WeatherMapper {
    public static weatherDocumentToWeatherModelOut(
        document: WeatherDocument,
      ): WeatherLogModelOut {
        try {
          return new WeatherLogModelOut({
            id: document._id.toString(),
            temperatura: document.Temperatura,
            umidade: document.Umidade,
            vento: document.Vento,
            condicao: document.Condicao,
            chuva: document.Chuva,
            createdAt: document.createdAt
          });
        } catch {
          throw new InternalServerErrorException(
            ExceptionMessage.WEATHER.MAPPER.CREATE,
          );
        }
      }

    public static arrayOfWeatherDocumentToWeatherModelOut(
        documents: WeatherDocument[],
    ): WeatherLogModelOut[] {
        try {
            if (!Array.isArray(documents)) {
                throw new Error();
        }
        return documents.map((doc) =>
            new WeatherLogModelOut({
                id: doc._id.toString(),
                temperatura: doc.Temperatura,
                umidade: doc.Umidade,
                vento: doc.Vento,
                condicao: doc.Condicao,
                chuva: doc.Chuva,
                createdAt: doc.createdAt,
            }),
        );
        } catch {
            throw new InternalServerErrorException(
                ExceptionMessage.WEATHER.MAPPER.ARRAY_DOCUMENTS_TO_MODEL_OUT,
            );
        }
    }

    public static createWeatherRequestToWeatherModelIn(
        request: WeatherLogRequest,
      ): WeatherLogModelIn {
        try {
          return new WeatherLogModelIn({
            Temperatura: request.Temperatura,
            Umidade: request.Umidade,
            Vento: request.Vento,
            Condicao: request.Condicao,
            Chuva: request.Chuva,
          });
        } catch {
          throw new InternalServerErrorException(
            ExceptionMessage.USERS.MAPPER.SIGNUP_REQUEST_TO_MODEL_IN,
          );
        }
    }
    
}