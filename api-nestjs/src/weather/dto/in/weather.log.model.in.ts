export class WeatherLogModelIn {
    public sub: string;
    public readonly Temperatura: Number;
    public readonly Umidade: Number;
    public readonly Vento: Number;
    public readonly Condicao: string; 
    public readonly Chuva: Number; 
    public createdAt: Date;

    constructor(props: Partial<WeatherLogModelIn>) {
        Object.assign(this, props);
    }
}