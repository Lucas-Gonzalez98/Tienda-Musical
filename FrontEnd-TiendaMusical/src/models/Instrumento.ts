import type Categoria from "./Categoria";
import type Stock from "./Stock";

export default class Instrumento {
    id?: number;
    instrumento: string = "";
    marca: string = "";
    modelo: string = "";
    imagen: string = "";
    precio: string = "";
    costoEnvio: number = 0;
    cantidadVendida: number = 0;
    descripcion: string = "";
    stock?: Stock;
    catorgoria?: Categoria;
    eliminado!: boolean;


}
