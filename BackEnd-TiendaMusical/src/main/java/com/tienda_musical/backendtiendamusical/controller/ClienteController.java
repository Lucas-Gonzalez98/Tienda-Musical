package com.tienda_musical.backendtiendamusical.controller;

import com.tienda_musical.backendtiendamusical.dto.ClienteDTO;
import com.tienda_musical.backendtiendamusical.mapper.ClienteMapper;
import com.tienda_musical.backendtiendamusical.model.Cliente;
import com.tienda_musical.backendtiendamusical.service.ClienteService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cliente")
@CrossOrigin(origins = "*")
@Tag(name = "Cliente", description = "Operaciones relacionadas con Clientes")
public class ClienteController extends MasterControllerImpl<Cliente, ClienteDTO, Long> implements MasterController<ClienteDTO, Long> {

    private static final Logger logger = LoggerFactory.getLogger(ClienteController.class);

    private final ClienteMapper clienteMapper;

    @Autowired
    public ClienteController(ClienteService clienteService, ClienteMapper clienteMapper) {
        super(clienteService);
        this.clienteMapper = clienteMapper;
    }

    @Override
    protected Cliente toEntity(ClienteDTO dto) {
        return clienteMapper.toEntity(dto);
    }

    @Override
    protected ClienteDTO toDTO(Cliente entity) {
        return clienteMapper.toDTO(entity);
    }
}
