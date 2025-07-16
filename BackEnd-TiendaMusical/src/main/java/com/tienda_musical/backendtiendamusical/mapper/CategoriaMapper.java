package com.tienda_musical.backendtiendamusical.mapper;

import com.tienda_musical.backendtiendamusical.dto.CategoriaDTO;
import com.tienda_musical.backendtiendamusical.model.Categoria;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CategoriaMapper extends MasterMapper<Categoria, CategoriaDTO>{

    CategoriaDTO toDTO(Categoria source);
    @Mapping(target = "instrumentos", ignore = true)
    Categoria toEntity(CategoriaDTO source);
}
