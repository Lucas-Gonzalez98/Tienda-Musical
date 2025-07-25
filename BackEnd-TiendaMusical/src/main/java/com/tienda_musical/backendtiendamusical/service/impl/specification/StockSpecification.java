package com.tienda_musical.backendtiendamusical.service.impl.specification;

import com.tienda_musical.backendtiendamusical.model.Stock;
import org.springframework.data.jpa.domain.Specification;

public class StockSpecification {

    public static Specification<Stock> stockNivelEquals(String nivel) {
        return (root, query, cb) -> {
            if (nivel == null) return null;

            switch (nivel) {
                case "sin_stock":
                    return cb.equal(root.get("stockActual"), 0);
                case "stock_bajo":
                    return cb.and(
                            cb.greaterThan(root.get("stockActual"), 0),
                            cb.lessThanOrEqualTo(root.get("stockActual"), 3)
                    );
                case "stock_bueno":
                    return cb.greaterThan(root.get("stockActual"), 3);
                default:
                    return null;
            }
        };
    }

    public static Specification<Stock> eliminadoEquals(Boolean eliminado) {
        return (root, query, cb) ->
                eliminado == null ? null : cb.equal(root.get("eliminado"), eliminado);
    }

    public static Specification<Stock> instrumentoNombreContains(String texto) {
        return (root, query, cb) ->
                texto == null ? null :
                        cb.like(cb.lower(root.get("instrumento").get("instrumento")), "%" + texto.toLowerCase() + "%");
    }

    public static Specification<Stock> categoriaIdEquals(Long categoriaId) {
        return (root, query, cb) ->
                categoriaId == null ? null : cb.equal(root.get("instrumento").get("categoria").get("id"), categoriaId);
    }
}