package com.tienda_musical.backendtiendamusical.mapper;

import com.tienda_musical.backendtiendamusical.dto.InstrumentoDTO;
import com.tienda_musical.backendtiendamusical.model.Instrumento;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring", uses = {CategoriaMapper.class})
public interface InstrumentoMapper extends MasterMapper<Instrumento, InstrumentoDTO> {

    InstrumentoDTO toDTO(Instrumento source);

    @Mapping(target = "pedidos", ignore = true)
    @Mapping(target = "stock", ignore = true)
    Instrumento toEntity(InstrumentoDTO source);

    @Override
    List<InstrumentoDTO> toDTOsList(List<Instrumento> source);

    @Override
    List<Instrumento> toEntitiesList(List<InstrumentoDTO> source);
}
