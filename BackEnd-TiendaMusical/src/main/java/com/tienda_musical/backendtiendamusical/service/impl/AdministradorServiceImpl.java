package com.tienda_musical.backendtiendamusical.service.impl;

import com.tienda_musical.backendtiendamusical.model.Administrador;
import com.tienda_musical.backendtiendamusical.repository.AdministradorRepository;
import com.tienda_musical.backendtiendamusical.service.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdministradorServiceImpl extends MasterServiceImpl<Administrador, Long> implements AdministradorService {

    @Autowired
    public AdministradorServiceImpl(AdministradorRepository administradorRepository) {
        super(administradorRepository);
    }

}