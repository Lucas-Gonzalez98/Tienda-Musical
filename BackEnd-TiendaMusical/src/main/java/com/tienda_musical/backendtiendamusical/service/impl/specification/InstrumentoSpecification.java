package com.tienda_musical.backendtiendamusical.service.impl.specification;

import com.tienda_musical.backendtiendamusical.model.Instrumento;
import org.springframework.data.jpa.domain.Specification;

public class InstrumentoSpecification {

    public static Specification<Instrumento> idEquals(Long id) {
        return (root, query, cb) -> id == null ? null : cb.equal(root.get("id"), id);
    }

    public static Specification<Instrumento> nombreContains(String instrumento) {
        return (root, query, cb) ->
                instrumento == null ? null :
                        cb.like(cb.lower(root.get("instrumento")), "%" + instrumento.toLowerCase() + "%");
    }

    public static Specification<Instrumento> precioBetween(Double min, Double max) {
        return (root, query, cb) -> {
            if (min != null && max != null)
                return cb.between(root.get("precio"), min, max);
            if (min != null)
                return cb.greaterThanOrEqualTo(root.get("precio"), min);
            if (max != null)
                return cb.lessThanOrEqualTo(root.get("precio"), max);
            return null;
        };
    }

    public static Specification<Instrumento> eliminadoEquals(Boolean eliminado) {
        return (root, query, cb) ->
                eliminado == null ? null : cb.equal(root.get("eliminado"), eliminado);
    }

    public static Specification<Instrumento> categoriaIdEquals(Long idCategoria) {
        return (root, query, cb) ->
                idCategoria == null ? null : cb.equal(root.get("categoria").get("id"), idCategoria);
    }
}
