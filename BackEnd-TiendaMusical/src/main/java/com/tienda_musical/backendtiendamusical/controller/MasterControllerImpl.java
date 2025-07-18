package com.tienda_musical.backendtiendamusical.controller;

import com.tienda_musical.backendtiendamusical.model.Master;
import com.tienda_musical.backendtiendamusical.service.MasterService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

public abstract class MasterControllerImpl<E extends Master, D, ID extends Serializable>
        implements MasterController<D, ID> {

    protected final MasterService<E, ID> service;
    private final Logger logger = LoggerFactory.getLogger(getClass());

    protected MasterControllerImpl(MasterService<E, ID> service) {
        this.service = service;
    }

    protected abstract E toEntity(D dto);
    protected abstract D toDTO(E entity);

    @Override
    public ResponseEntity<D> create(D dto) {
        E savedEntity = service.save(toEntity(dto));
        logger.info("Entidad creada: {}", savedEntity);
        return ResponseEntity.ok(toDTO(savedEntity));
    }

    @Override
    public ResponseEntity<D> getById(ID id) {
        E entity = service.getById(id);
        return ResponseEntity.ok(toDTO(entity));
    }

    @Override
    public ResponseEntity<List<D>> getAll() {
        List<D> dtos = service.getAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @Override
    public ResponseEntity<List<D>> getAllEliminadoFalse() {
        List<D> dtos = service.getAllEliminadoFalse().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @Override
    public ResponseEntity<Page<D>> getAll(Pageable pageable) {
        Page<D> dtoPage = service.getAll(pageable)
                .map(this::toDTO);
        return ResponseEntity.ok(dtoPage);
    }

    @Override
    public ResponseEntity<Page<D>> getAllEliminadoFalse(Pageable pageable) {
        Page<D> dtoPage = service.getAllEliminadoFalse(pageable)
                .map(this::toDTO);
        return ResponseEntity.ok(dtoPage);
    }

    @Override
    public ResponseEntity<D> update(ID id, D dto) {
        E updatedEntity = service.update(id, toEntity(dto));
        logger.info("Entidad actualizada: {}", updatedEntity);
        return ResponseEntity.ok(toDTO(updatedEntity));
    }

    @Override
    public ResponseEntity<Void> changeEliminado(ID id){
        service.changeEliminado(id);
        logger.info("Entidad con id {} dada de alta lógicamente.", id);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<Void> delete(ID id) {
        service.delete(id);
        logger.info("Entidad con id {} eliminada lógicamente.", id);
        return ResponseEntity.noContent().build();
    }
}
