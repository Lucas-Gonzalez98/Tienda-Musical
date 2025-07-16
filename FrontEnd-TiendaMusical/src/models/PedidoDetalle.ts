import type Instrumento from "./Instrumento";

export default class PedidoDetalle {
    id?: number;
    cantidad: number = 0;
    instrumento?: Instrumento;
    eliminado!: boolean;

}