package com.tienda_musical.backendtiendamusical.service.impl;

import com.tienda_musical.backendtiendamusical.model.Stock;
import com.tienda_musical.backendtiendamusical.repository.StockRepository;
import com.tienda_musical.backendtiendamusical.service.StockService;
import com.tienda_musical.backendtiendamusical.service.impl.specification.StockSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class StockServiceImpl extends MasterServiceImpl<Stock, Long> implements StockService {

    private final StockRepository stockRepository;

    @Autowired
    public StockServiceImpl(StockRepository stockRepository) {
        super(stockRepository);
        this.stockRepository = stockRepository;
    }

    @Override
    public Page<Stock> buscarStocksFiltrados(String nivelStock, Boolean eliminado, String nombreInstrumento, Long idCategoria, Pageable pageable) {
        Specification<Stock> spec = Specification
                .where(StockSpecification.stockNivelEquals(nivelStock))
                .and(StockSpecification.eliminadoEquals(eliminado))
                .and(StockSpecification.instrumentoNombreContains(nombreInstrumento))
                .and(StockSpecification.categoriaIdEquals(idCategoria));

        return stockRepository.findAll(spec, pageable);
    }
}