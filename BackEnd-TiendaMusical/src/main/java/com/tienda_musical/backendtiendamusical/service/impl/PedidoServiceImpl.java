package com.tienda_musical.backendtiendamusical.service.impl;

import com.tienda_musical.backendtiendamusical.model.Pedido;
import com.tienda_musical.backendtiendamusical.repository.PedidoRepository;
import com.tienda_musical.backendtiendamusical.service.PedidoService;
import com.tienda_musical.backendtiendamusical.service.impl.specification.PedidoSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
public class PedidoServiceImpl extends MasterServiceImpl<Pedido, Long> implements PedidoService {

    private PedidoRepository pedidoRepository;

    @Autowired
    public PedidoServiceImpl(PedidoRepository pedidoRepository) {
        super(pedidoRepository);
        this.pedidoRepository = pedidoRepository;
    }

    @Override
    public Page<Pedido> buscarPedidoFiltros(
            Long idPedido,
            //List<Estado> estados,
            //Cliente cliente,
            OffsetDateTime fechaDesde,
            OffsetDateTime fechaHasta,
            Boolean pagado,
            Boolean eliminado,
            Pageable pageable
    ){
        Specification<Pedido> spec = Specification
                .where(PedidoSpecification.idEquals(idPedido))
                .and(PedidoSpecification.fechaBetween(fechaDesde, fechaHasta))
                .and(PedidoSpecification.pagadoEquals(pagado))
                .and(PedidoSpecification.eliminadoEquals(eliminado));

        return pedidoRepository.findAll(spec, pageable);


    }

}