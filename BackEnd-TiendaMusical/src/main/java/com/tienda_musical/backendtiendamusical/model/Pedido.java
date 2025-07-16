package com.tienda_musical.backendtiendamusical.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tienda_musical.backendtiendamusical.model.enums.Estado;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pedido extends Master{

    private LocalDate fechaPedido;
    private Double totalPedido;

    //private Estado estado;

    //private Cliente cliente;

    //private Domicilio domicilio

    @OneToMany(mappedBy = "pedido", cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private Set<PedidoDetalle> detalles = new HashSet<>();
}
