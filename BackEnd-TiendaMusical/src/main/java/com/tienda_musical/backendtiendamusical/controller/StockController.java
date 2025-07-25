package com.tienda_musical.backendtiendamusical.controller;

import com.tienda_musical.backendtiendamusical.dto.StockDTO;
import com.tienda_musical.backendtiendamusical.mapper.StockMapper;
import com.tienda_musical.backendtiendamusical.model.Stock;
import com.tienda_musical.backendtiendamusical.service.StockService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stock")
@CrossOrigin(origins = "*")
@Tag(name = "Stock", description = "Operaciones relacionadas con Stocks")
public class StockController extends MasterControllerImpl<Stock, StockDTO, Long> implements MasterController<StockDTO, Long> {

    private static final Logger logger = LoggerFactory.getLogger(StockController.class);

    private final StockService stockService;
    private final StockMapper stockMapper;

    @Autowired
    public StockController(StockService stockService, StockMapper stockMapper) {
        super(stockService);
        this.stockMapper = stockMapper;
        this.stockService = stockService;
    }

    @Override
    protected Stock toEntity(StockDTO dto) {
        return stockMapper.toEntity(dto);
    }

    @Override
    protected StockDTO toDTO(Stock entity) {
        return stockMapper.toDTO(entity);
    }

    @Operation(summary = "Filtrar stock", description = "Filtra por tipo de cantidad, nombre del instrumento, eliminado o categoría.")
    @GetMapping("/filtrar")
    public ResponseEntity<Page<StockDTO>> filtrarStocks(
            @Parameter(description = "Nivel de Stock") @RequestParam(required = false) String nivelStock,
            @Parameter(description = "¿Eliminado?") @RequestParam(required = false) Boolean eliminado,
            @Parameter(description = "Nombre del instrumento") @RequestParam(required = false) String nombreInstrumento,
            @Parameter(description = "ID de la categoría") @RequestParam(required = false) Long idCategoria,
            Pageable pageable
    ) {
        Page<Stock> stocks = stockService.buscarStocksFiltrados(
                nivelStock, eliminado, nombreInstrumento, idCategoria, pageable
        );
        Page<StockDTO> resultado = stocks.map(stockMapper::toDTO);
        return ResponseEntity.ok(resultado);
    }
}
