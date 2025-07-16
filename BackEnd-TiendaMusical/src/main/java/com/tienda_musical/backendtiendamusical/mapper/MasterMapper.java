package com.tienda_musical.backendtiendamusical.mapper;

import com.tienda_musical.backendtiendamusical.dto.MasterDTO;
import com.tienda_musical.backendtiendamusical.model.Master;


import java.util.List;

public interface MasterMapper<E extends Master,D extends MasterDTO>{
    D toDTO(E source);
    E toEntity(D source);
    List<D> toDTOsList(List<E> source);
    List<E> toEntitiesList(List<D> source);
}
