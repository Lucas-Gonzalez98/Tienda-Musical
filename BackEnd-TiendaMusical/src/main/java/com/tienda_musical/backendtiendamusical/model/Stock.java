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
public class Stock extends Master{

    private Integer stockActual;

    @OneToOne(optional = true)
    @JoinColumn(name = "instrumento_id")
    private Instrumento instrumento;
}
