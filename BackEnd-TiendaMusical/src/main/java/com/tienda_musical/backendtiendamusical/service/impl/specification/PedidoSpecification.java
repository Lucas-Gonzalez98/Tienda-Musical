package com.tienda_musical.backendtiendamusical.service.impl.specification;

import com.tienda_musical.backendtiendamusical.model.Pedido;
import org.springframework.data.jpa.domain.Specification;

import java.time.OffsetDateTime;

public class PedidoSpecification {

    public static Specification<Pedido> idEquals(Long idPedido) {
        return (root, query, cb) ->
                idPedido == null ? null : cb.equal(root.get("id"), idPedido);
    }

    public static Specification<Pedido> fechaBetween(OffsetDateTime desde, OffsetDateTime hasta) {
        return (root, query, cb) -> {
            if (desde != null && hasta != null)
                return cb.between(root.get("fechaPedido"), desde, hasta);
            if (desde != null)
                return cb.greaterThanOrEqualTo(root.get("fechaPedido"), desde);
            if (hasta != null)
                return cb.lessThanOrEqualTo(root.get("fechaPedido"), hasta);
            return null;
        };
    }

    public static Specification<Pedido> pagadoEquals(Boolean pagado) {
        return (root, query, cb) ->
                pagado == null ? null : cb.equal(root.get("pagado"), pagado);
    }

    public static Specification<Pedido> eliminadoEquals(Boolean eliminado) {
        return (root, query, cb) ->
                eliminado == null ? null : cb.equal(root.get("eliminado"), eliminado);
    }
}
