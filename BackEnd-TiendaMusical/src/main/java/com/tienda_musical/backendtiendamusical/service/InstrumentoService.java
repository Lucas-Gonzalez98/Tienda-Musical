package com.tienda_musical.backendtiendamusical.service;

import com.tienda_musical.backendtiendamusical.model.Instrumento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface InstrumentoService extends MasterService<Instrumento, Long> {

    Page<Instrumento> buscarInstrumentoFiltros(
            Long idInstrumento,
            String instrumento,
            Double precioMin,
            Double precioMax,
            Boolean eliminado,
            Long idCategoria,
            Pageable pageable
    );

    List<Instrumento> obtenerInstrumentosSinStock();
}