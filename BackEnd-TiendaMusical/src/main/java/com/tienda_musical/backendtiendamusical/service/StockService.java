package com.tienda_musical.backendtiendamusical.service;

import com.tienda_musical.backendtiendamusical.model.Stock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StockService extends MasterService<Stock, Long> {

    Page<Stock> buscarStocksFiltrados(
            String nivelStock,
            Boolean eliminado,
            String nombreInstrumento,
            Long idCategoria,
            Pageable pageable
    );
}