package com.tienda_musical.backendtiendamusical.mapper;

import com.tienda_musical.backendtiendamusical.dto.UsuarioDTO;
import com.tienda_musical.backendtiendamusical.model.Usuario;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UsuarioMapper extends MasterMapper<Usuario, UsuarioDTO> {
    UsuarioDTO toDTO(Usuario source);

    Usuario toEntity(UsuarioDTO source);
}
