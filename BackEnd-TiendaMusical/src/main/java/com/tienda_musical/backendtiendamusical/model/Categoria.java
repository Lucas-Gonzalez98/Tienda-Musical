package com.tienda_musical.backendtiendamusical.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Categoria extends Master{

    private String denominacion;

    @OneToMany(mappedBy = "categoria", cascade = CascadeType.REFRESH)
    private Set<Instrumento> instrumentos = new HashSet<>();
}
