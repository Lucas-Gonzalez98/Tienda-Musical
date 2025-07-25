package com.tienda_musical.backendtiendamusical.service;

import com.tienda_musical.backendtiendamusical.model.Pedido;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.OffsetDateTime;

public interface PedidoService extends MasterService<Pedido, Long> {

    Page<Pedido> buscarPedidoFiltros(
            Long idPedido,
            OffsetDateTime fechaDesde,
            OffsetDateTime fechaHasta,
            Boolean pagado,
            Boolean eliminado,
            Pageable pageable
    );

}