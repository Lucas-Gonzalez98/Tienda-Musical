package com.tienda_musical.backendtiendamusical.service.impl;

import com.tienda_musical.backendtiendamusical.model.PedidoDetalle;
import com.tienda_musical.backendtiendamusical.repository.PedidoDetalleRepository;
import com.tienda_musical.backendtiendamusical.service.PedidoDetalleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoDetalleServiceImpl extends MasterServiceImpl<PedidoDetalle, Long> implements PedidoDetalleService {

    @Autowired
    public PedidoDetalleServiceImpl(PedidoDetalleRepository pedidoDetalleRepository) {
        super(pedidoDetalleRepository);
    }

}