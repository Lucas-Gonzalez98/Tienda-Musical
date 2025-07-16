package com.tienda_musical.backendtiendamusical.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PedidoDTO extends MasterDTO{

    private LocalDate fechaPedido;
    private Double totalPedido;
    private Set<PedidoDetalleDTO> detalles;
}
