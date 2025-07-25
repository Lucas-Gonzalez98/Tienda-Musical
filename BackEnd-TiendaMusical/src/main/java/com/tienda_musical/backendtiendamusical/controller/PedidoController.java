package com.tienda_musical.backendtiendamusical.controller;

import com.tienda_musical.backendtiendamusical.dto.PedidoDTO;
import com.tienda_musical.backendtiendamusical.mapper.PedidoMapper;
import com.tienda_musical.backendtiendamusical.model.Pedido;
import com.tienda_musical.backendtiendamusical.service.PedidoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;

@RestController
@RequestMapping("/api/pedido")
@CrossOrigin(origins = "*")
@Tag(name = "Pedido", description = "Operaciones relacionadas con Pedidos")
public class PedidoController extends MasterControllerImpl<Pedido, PedidoDTO, Long> implements MasterController<PedidoDTO, Long> {

    private static final Logger logger = LoggerFactory.getLogger(PedidoController.class);

    private final PedidoMapper pedidoMapper;
    private final PedidoService pedidoService;

    @Autowired
    public PedidoController(PedidoService pedidoService, PedidoMapper pedidoMapper) {
        super(pedidoService);
        this.pedidoMapper = pedidoMapper;
        this.pedidoService = pedidoService;
    }

    @Override
    protected Pedido toEntity(PedidoDTO dto) {
        return pedidoMapper.toEntity(dto);
    }

    @Override
    protected PedidoDTO toDTO(Pedido entity) {
        return pedidoMapper.toDTO(entity);
    }

    @Operation(summary = "Filtrar pedidos", description = "Filtra pedidos por ID, fechas, estado de pago y eliminación.")
    @GetMapping("/filtrar")
    public ResponseEntity<Page<PedidoDTO>> filtrarPedidos(
            @Parameter(description = "ID del pedido") @RequestParam(required = false) Long idPedido,
            @Parameter(description = "Fecha desde (ISO 8601)") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime fechaDesde,
            @Parameter(description = "Fecha hasta (ISO 8601)") @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime fechaHasta,
            @Parameter(description = "¿Está pagado?") @RequestParam(required = false) Boolean pagado,
            @Parameter(description = "¿Eliminado?") @RequestParam(required = false) Boolean eliminado,
            Pageable pageable
    ) {

        Page<Pedido> pedidos = pedidoService.buscarPedidoFiltros(
                idPedido, fechaDesde, fechaHasta, pagado, eliminado, pageable);
        Page<PedidoDTO> resultado = pedidos.map(pedidoMapper::toDTO);
        return ResponseEntity.ok(resultado);
    }
}
