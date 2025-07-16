package com.tienda_musical.backendtiendamusical.controller;

import com.tienda_musical.backendtiendamusical.dto.InstrumentoDTO;
import com.tienda_musical.backendtiendamusical.mapper.InstrumentoMapper;
import com.tienda_musical.backendtiendamusical.model.Instrumento;
import com.tienda_musical.backendtiendamusical.service.InstrumentoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/instrumento")
@CrossOrigin(origins = "*")
@Tag(name = "Instrumento", description = "Operaciones relacionadas con Instrumentos")
public class InstrumentoController extends MasterControllerImpl<Instrumento, InstrumentoDTO, Long> implements MasterController<InstrumentoDTO, Long> {

    private static final Logger logger = LoggerFactory.getLogger(InstrumentoController.class);

    private final InstrumentoMapper instrumentoMapper;

    @Autowired
    public InstrumentoController(InstrumentoService instrumentoService, InstrumentoMapper instrumentoMapper) {
        super(instrumentoService);
        this.instrumentoMapper = instrumentoMapper;
    }

    @Override
    protected Instrumento toEntity(InstrumentoDTO dto) {
        return instrumentoMapper.toEntity(dto);
    }

    @Override
    protected InstrumentoDTO toDTO(Instrumento entity) {
        return instrumentoMapper.toDTO(entity);
    }
}
