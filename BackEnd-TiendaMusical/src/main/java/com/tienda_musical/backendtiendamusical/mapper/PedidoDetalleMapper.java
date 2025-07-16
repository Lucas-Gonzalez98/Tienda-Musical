package com.tienda_musical.backendtiendamusical.mapper;

import com.tienda_musical.backendtiendamusical.dto.PedidoDetalleDTO;
import com.tienda_musical.backendtiendamusical.model.PedidoDetalle;
import org.mapstruct.*;

@Mapper(componentModel = "spring", uses = {InstrumentoMapper.class})
public interface PedidoDetalleMapper extends MasterMapper<PedidoDetalle, PedidoDetalleDTO> {

    PedidoDetalleDTO toDTO(PedidoDetalle source);
    @Mapping(target = "pedido", ignore = true)
    PedidoDetalle toEntity(PedidoDetalleDTO source);
}
