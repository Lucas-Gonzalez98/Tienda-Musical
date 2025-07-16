package com.tienda_musical.backendtiendamusical.mapper;

import com.tienda_musical.backendtiendamusical.dto.ClienteDTO;
import com.tienda_musical.backendtiendamusical.model.Cliente;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface ClienteMapper extends MasterMapper<Cliente, ClienteDTO> {
    ClienteDTO toDTO(Cliente source);

    Cliente toEntity(ClienteDTO source);
}
