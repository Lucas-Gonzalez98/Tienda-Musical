package com.tienda_musical.backendtiendamusical.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InstrumentoDTO extends MasterDTO{

    private String instrumento;
    private String marca;
    private String modelo;
    private String imagen;
    private Double precio;
    private Double costoEnvio;
    private Integer cantidadVendida;
    private String descripcion;
    private CategoriaDTO categoria;
    private StockDTO stock;

}
