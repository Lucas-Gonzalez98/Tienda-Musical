import type Instrumento from "./Instrumento";

export default class Stock {
    id?: number;
    stockActual: number = 0;
    instrumento?: Instrumento;
    eliminado!: boolean;
}