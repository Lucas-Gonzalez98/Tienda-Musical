package com.tienda_musical.backendtiendamusical.service.impl;

import com.tienda_musical.backendtiendamusical.model.Instrumento;
import com.tienda_musical.backendtiendamusical.repository.InstrumentoRepository;
import com.tienda_musical.backendtiendamusical.service.InstrumentoService;
import com.tienda_musical.backendtiendamusical.service.impl.specification.InstrumentoSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrumentoServiceImpl extends MasterServiceImpl<Instrumento, Long> implements InstrumentoService {

    private final InstrumentoRepository instrumentoRepository;

    @Autowired
    public InstrumentoServiceImpl(InstrumentoRepository instrumentoRepository) {
        super(instrumentoRepository);
        this.instrumentoRepository = instrumentoRepository;
    }

    @Override
    public Page<Instrumento> buscarInstrumentoFiltros(
            Long idInstrumento,
            String instrumento,
            Double precioMin,
            Double precioMax,
            Boolean eliminado,
            Long idCategoria,
            Pageable pageable

    ) {
        Specification<Instrumento> spec = Specification
                .where(InstrumentoSpecification.idEquals(idInstrumento))
                .and(InstrumentoSpecification.nombreContains(instrumento))
                .and(InstrumentoSpecification.precioBetween(precioMin, precioMax))
                .and(InstrumentoSpecification.eliminadoEquals(eliminado))
                .and(InstrumentoSpecification.categoriaIdEquals(idCategoria));

        return instrumentoRepository.findAll(spec, pageable);
    }

    @Override
    public List<Instrumento> obtenerInstrumentosSinStock() {
        return instrumentoRepository.findInstrumentosSinStock();
    }
}