package com.tienda_musical.backendtiendamusical.service.impl;

import com.tienda_musical.backendtiendamusical.model.Instrumento;
import com.tienda_musical.backendtiendamusical.repository.InstrumentoRepository;
import com.tienda_musical.backendtiendamusical.service.InstrumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InstrumentoServiceImpl extends MasterServiceImpl<Instrumento, Long> implements InstrumentoService {

    @Autowired
    public InstrumentoServiceImpl(InstrumentoRepository instrumentoRepository) {
        super(instrumentoRepository);
    }

}