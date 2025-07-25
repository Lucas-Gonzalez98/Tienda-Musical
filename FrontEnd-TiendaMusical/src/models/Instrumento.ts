import type Categoria from "./Categoria";

export default class Instrumento {
    id?: number;
    instrumento: string = "";
    marca: string = "";
    modelo: string = "";
    imagen: string = "";
    precio: number = 0;
    costoEnvio: number = 0;
    cantidadVendida: number = 0;
    descripcion: string = "";
    categoria?: Categoria;
    eliminado!: boolean;
}
