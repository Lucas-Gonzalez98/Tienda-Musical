import type PedidoDetalle from "./PedidoDetalle";

export default class Pedido{
    id?: number;
    fechaPedido?: Date;
    //cliente?: Cliente;
    //domicilio?: Domicilio;
    //estado: Estado;
    pagado: boolean = false;
    totalPedido?: number;
    detalles?: PedidoDetalle[];
    eliminado!: boolean;
}