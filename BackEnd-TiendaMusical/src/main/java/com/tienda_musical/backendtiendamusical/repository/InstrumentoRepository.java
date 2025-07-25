package com.tienda_musical.backendtiendamusical.repository;

import com.tienda_musical.backendtiendamusical.model.Instrumento;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InstrumentoRepository extends MasterRepository<Instrumento, Long>, JpaSpecificationExecutor<Instrumento> {

    @Query("SELECT i FROM Instrumento i LEFT JOIN Stock s ON s.instrumento = i WHERE s.id IS NULL")
    List<Instrumento> findInstrumentosSinStock();
}