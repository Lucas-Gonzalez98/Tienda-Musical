package com.tienda_musical.backendtiendamusical.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Instrumento extends Master{

    private String instrumento;
    private String marca;
    private String modelo;
    private String imagen;
    private Double precio;
    private Double costoEnvio;
    private Integer cantidadVendida;
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @OneToOne(mappedBy = "instrumento", cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, orphanRemoval = true)
    private Stock stock;

    @OneToMany(mappedBy = "instrumento",  cascade = { CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private Set<PedidoDetalle> pedidos;

}