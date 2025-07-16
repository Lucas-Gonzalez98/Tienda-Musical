package com.tienda_musical.backendtiendamusical.controller;

import com.tienda_musical.backendtiendamusical.dto.PedidoDTO;
import com.tienda_musical.backendtiendamusical.mapper.PedidoMapper;
import com.tienda_musical.backendtiendamusical.model.Pedido;
import com.tienda_musical.backendtiendamusical.service.PedidoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pedido")
@CrossOrigin(origins = "*")
@Tag(name = "Pedido", description = "Operaciones relacionadas con Pedidos")
public class PedidoController extends MasterControllerImpl<Pedido, PedidoDTO, Long> implements MasterController<PedidoDTO, Long> {

    private static final Logger logger = LoggerFactory.getLogger(PedidoController.class);

    private final PedidoMapper pedidoMapper;

    @Autowired
    public PedidoController(PedidoService pedidoService, PedidoMapper pedidoMapper) {
        super(pedidoService);
        this.pedidoMapper = pedidoMapper;
    }

    @Override
    protected Pedido toEntity(PedidoDTO dto) {
        return pedidoMapper.toEntity(dto);
    }

    @Override
    protected PedidoDTO toDTO(Pedido entity) {
        return pedidoMapper.toDTO(entity);
    }
}
