package com.tienda_musical.backendtiendamusical.service.impl;

import com.tienda_musical.backendtiendamusical.model.Usuario;
import com.tienda_musical.backendtiendamusical.repository.UsuarioRepository;
import com.tienda_musical.backendtiendamusical.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioServiceImpl extends MasterServiceImpl<Usuario, Long> implements UsuarioService {

    @Autowired
    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {super(usuarioRepository);}

}