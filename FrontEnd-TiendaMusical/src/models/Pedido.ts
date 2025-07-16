import type PedidoDetalle from "./PedidoDetalle";

export default class Pedido{
    id?: number;
    fechaPedido?: Date;
    totalPedido?: number;
    detalles?: PedidoDetalle[];
    eliminado!: boolean;
}