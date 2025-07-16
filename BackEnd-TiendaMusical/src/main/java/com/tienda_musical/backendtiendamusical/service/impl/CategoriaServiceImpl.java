package com.tienda_musical.backendtiendamusical.service.impl;

import com.tienda_musical.backendtiendamusical.model.Categoria;
import com.tienda_musical.backendtiendamusical.repository.CategoriaRepository;
import com.tienda_musical.backendtiendamusical.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaServiceImpl extends MasterServiceImpl<Categoria, Long> implements CategoriaService {

    @Autowired
    public CategoriaServiceImpl(CategoriaRepository categoriaRepository) {
        super(categoriaRepository);
    }

}