package com.tienda_musical.backendtiendamusical.controller;

import com.tienda_musical.backendtiendamusical.dto.StockDTO;
import com.tienda_musical.backendtiendamusical.mapper.StockMapper;
import com.tienda_musical.backendtiendamusical.model.Stock;
import com.tienda_musical.backendtiendamusical.service.StockService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stock")
@CrossOrigin(origins = "*")
@Tag(name = "Stock", description = "Operaciones relacionadas con Stocks")
public class StockController extends MasterControllerImpl<Stock, StockDTO, Long> implements MasterController<StockDTO, Long> {

    private static final Logger logger = LoggerFactory.getLogger(StockController.class);

    private final StockMapper stockMapper;

    @Autowired
    public StockController(StockService stockService, StockMapper stockMapper) {
        super(stockService);
        this.stockMapper = stockMapper;
    }

    @Override
    protected Stock toEntity(StockDTO dto) {
        return stockMapper.toEntity(dto);
    }

    @Override
    protected StockDTO toDTO(Stock entity) {
        return stockMapper.toDTO(entity);
    }
}
