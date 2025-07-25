package com.tienda_musical.backendtiendamusical.repository;

import com.tienda_musical.backendtiendamusical.model.Stock;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface StockRepository extends MasterRepository<Stock, Long>, JpaSpecificationExecutor<Stock> {
}