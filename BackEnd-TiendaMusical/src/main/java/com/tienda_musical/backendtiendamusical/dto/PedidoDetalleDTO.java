package com.tienda_musical.backendtiendamusical.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedidoDetalleDTO extends MasterDTO{
    private Integer cantidad;
    private InstrumentoDTO instrumento;
}
