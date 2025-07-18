package com.tienda_musical.backendtiendamusical.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public abstract class MasterDTO {

    protected Long id;
    private boolean eliminado;
}
