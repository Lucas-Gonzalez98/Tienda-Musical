package com.tienda_musical.backendtiendamusical.repository;

import com.tienda_musical.backendtiendamusical.model.Master;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

import java.io.Serializable;
import java.util.List;

@NoRepositoryBean
public interface MasterRepository <E extends Master, ID extends Serializable> extends JpaRepository<E, ID> {

    @Transactional
    @Modifying
    @Query("UPDATE #{#entityName} e SET e.eliminado = true WHERE e.id = :id")
    void bajaLogica(@Param("id") ID id);

    List<E> findAllByEliminadoFalse();
    List<E> findAll();

    Page<E> findAllByEliminadoFalse(Pageable pageable);
}
