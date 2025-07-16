package com.tienda_musical.backendtiendamusical.mapper;

import com.tienda_musical.backendtiendamusical.dto.PedidoDTO;
import com.tienda_musical.backendtiendamusical.model.Pedido;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", uses = {PedidoDetalleMapper.class})
public interface PedidoMapper extends MasterMapper<Pedido, PedidoDTO> {


    PedidoDTO toDTO(Pedido source);

    Pedido toEntity(PedidoDTO source);

    @Override
    List<PedidoDTO> toDTOsList(List<Pedido> source);

    @Override
    List<Pedido> toEntitiesList(List<PedidoDTO> source);
}
