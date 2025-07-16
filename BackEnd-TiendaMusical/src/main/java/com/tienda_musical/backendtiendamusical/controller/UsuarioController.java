package com.tienda_musical.backendtiendamusical.controller;

import com.tienda_musical.backendtiendamusical.dto.UsuarioDTO;
import com.tienda_musical.backendtiendamusical.mapper.UsuarioMapper;
import com.tienda_musical.backendtiendamusical.model.Usuario;
import com.tienda_musical.backendtiendamusical.service.UsuarioService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "*")
@Tag(name = "Usuario", description = "Operaciones relacionadas con Usuarios")
public class UsuarioController extends MasterControllerImpl<Usuario, UsuarioDTO, Long> implements MasterController<UsuarioDTO, Long> {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioController.class);

    private final UsuarioMapper usuarioMapper;

    @Autowired
    public UsuarioController(UsuarioService usuarioService, UsuarioMapper usuarioMapper) {
        super(usuarioService);
        this.usuarioMapper = usuarioMapper;
    }

    @Override
    protected Usuario toEntity(UsuarioDTO dto) {
        return usuarioMapper.toEntity(dto);
    }

    @Override
    protected UsuarioDTO toDTO(Usuario entity) {
        return usuarioMapper.toDTO(entity);
    }
}
