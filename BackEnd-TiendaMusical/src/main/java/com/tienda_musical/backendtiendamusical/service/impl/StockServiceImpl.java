package com.tienda_musical.backendtiendamusical.service.impl;

import com.tienda_musical.backendtiendamusical.model.Stock;
import com.tienda_musical.backendtiendamusical.repository.StockRepository;
import com.tienda_musical.backendtiendamusical.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockServiceImpl extends MasterServiceImpl<Stock, Long> implements StockService {

    @Autowired
    public StockServiceImpl(StockRepository stockRepository) {
        super(stockRepository);
    }

}