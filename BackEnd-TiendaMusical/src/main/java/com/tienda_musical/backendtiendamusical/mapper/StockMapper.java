package com.tienda_musical.backendtiendamusical.mapper;

import com.tienda_musical.backendtiendamusical.dto.StockDTO;
import com.tienda_musical.backendtiendamusical.model.Stock;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface StockMapper extends MasterMapper<Stock, StockDTO> {
    StockDTO toDTO(Stock source);

    Stock toEntity(StockDTO source);
}
