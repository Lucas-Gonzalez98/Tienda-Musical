package com.tienda_musical.backendtiendamusical.mapper;

import com.tienda_musical.backendtiendamusical.dto.AdministradorDTO;
import com.tienda_musical.backendtiendamusical.model.Administrador;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface AdministradorMapper extends MasterMapper<Administrador, AdministradorDTO>{
    AdministradorDTO toDTO(Administrador source);

    Administrador toEntity(AdministradorDTO source);
}
