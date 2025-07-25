package com.tienda_musical.backendtiendamusical.repository;

import com.tienda_musical.backendtiendamusical.model.Pedido;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PedidoRepository extends MasterRepository<Pedido, Long>, JpaSpecificationExecutor<Pedido> {
}