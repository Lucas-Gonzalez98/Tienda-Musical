package com.tienda_musical.backendtiendamusical.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockDTO extends MasterDTO{

    private Integer stockActual;
}
