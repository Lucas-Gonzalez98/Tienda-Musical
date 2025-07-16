package com.tienda_musical.backendtiendamusical.controller;

import com.tienda_musical.backendtiendamusical.dto.PedidoDetalleDTO;
import com.tienda_musical.backendtiendamusical.mapper.PedidoDetalleMapper;
import com.tienda_musical.backendtiendamusical.model.PedidoDetalle;
import com.tienda_musical.backendtiendamusical.service.PedidoDetalleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pedidoDetalle")
@CrossOrigin(origins = "*")
@Tag(name = "Pedido Detalle", description = "Operaciones relacionadas con pedidoDetalles")
public class PedidoDetalleController extends MasterControllerImpl<PedidoDetalle, PedidoDetalleDTO, Long> implements MasterController<PedidoDetalleDTO, Long> {

    private static final Logger logger = LoggerFactory.getLogger(PedidoDetalleController.class);

    private final PedidoDetalleMapper pedidoDetalleMapper;

    @Autowired
    public PedidoDetalleController(PedidoDetalleService pedidoDetalleService, PedidoDetalleMapper pedidoDetalleMapper) {
        super(pedidoDetalleService);
        this.pedidoDetalleMapper = pedidoDetalleMapper;
    }

    @Override
    protected PedidoDetalle toEntity(PedidoDetalleDTO dto) {
        return pedidoDetalleMapper.toEntity(dto);
    }

    @Override
    protected PedidoDetalleDTO toDTO(PedidoDetalle entity) {
        return pedidoDetalleMapper.toDTO(entity);
    }
}
