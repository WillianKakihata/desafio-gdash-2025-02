export class WeatherLogModelOut {
    public readonly id: string;
    public readonly temperatura: Number;
    public readonly umidade: Number;
    public readonly vento: Number;
    public readonly condicao: string;
    public readonly chuva: Number;
    public readonly createdAt: Date;

    constructor(props: Partial<WeatherLogModelOut>) {
        Object.assign(this, props);
    }

}