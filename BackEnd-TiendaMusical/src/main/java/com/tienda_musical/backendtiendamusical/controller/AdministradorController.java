package com.tienda_musical.backendtiendamusical.controller;

import com.tienda_musical.backendtiendamusical.dto.AdministradorDTO;
import com.tienda_musical.backendtiendamusical.mapper.AdministradorMapper;
import com.tienda_musical.backendtiendamusical.model.Administrador;
import com.tienda_musical.backendtiendamusical.service.AdministradorService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/administrador")
@CrossOrigin(origins = "*")
@Tag(name = "Administrador", description = "Operaciones relacionadas con Administradores")
public class AdministradorController extends MasterControllerImpl<Administrador, AdministradorDTO, Long> implements MasterController<AdministradorDTO, Long> {

    private static final Logger logger = LoggerFactory.getLogger(AdministradorController.class);

    private final AdministradorMapper administradorMapper;

    @Autowired
    public AdministradorController(AdministradorService administradorService, AdministradorMapper administradorMapper) {
        super(administradorService);
        this.administradorMapper = administradorMapper;
    }

    @Override
    protected Administrador toEntity(AdministradorDTO dto) {
        return administradorMapper.toEntity(dto);
    }

    @Override
    protected AdministradorDTO toDTO(Administrador entity) {
        return administradorMapper.toDTO(entity);
    }
}