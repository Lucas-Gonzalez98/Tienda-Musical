package com.tienda_musical.backendtiendamusical.service.impl;

import com.tienda_musical.backendtiendamusical.model.Pedido;
import com.tienda_musical.backendtiendamusical.repository.PedidoRepository;
import com.tienda_musical.backendtiendamusical.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoServiceImpl extends MasterServiceImpl<Pedido, Long> implements PedidoService {

    @Autowired
    public PedidoServiceImpl(PedidoRepository pedidoRepository) {
        super(pedidoRepository);
    }

}