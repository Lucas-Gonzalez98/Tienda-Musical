import React, { useState } from "react";
import styled from "styled-components";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Badge,
    Alert,
} from "react-bootstrap";
import {
    BsCart3,
    BsArrowLeft,
    BsShare,
    BsHeart,
    BsHeartFill,
    BsTruck,
    BsShield,
    BsAward,
    BsTag,
} from "react-icons/bs";
import Instrumento from "../../models/Instrumento";

interface Props {
    instrumento: Instrumento;
    onVolver?: () => void;
    onComprar?: (id: number) => void;
}

const StyledContainer = styled(Container)`
  background-color: #f8f9fa;
  min-height: 100vh;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const VolverButton = styled(Button)`
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #0d6efd !important;
    border-color: #0d6efd !important;
    color: white !important;
    transform: translateY(-2px);
  }
`;

const DetalleCard = styled(Card)`
  border: none;
  border-radius: 1rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  overflow: hidden;
  transition: all 0.3s ease;
`;

const ImagenWrapper = styled.div`
  position: relative;
  height: 500px;
  background-color: #f8f9fa;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }
`;

const ActionButton = styled(Button)`
  width: 40px;
  height: 40px;
  padding: 0.25rem;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  transition: all 0.3s ease;
  border-radius: 50%;
  color: #000; /* color negro por defecto */

  svg {
    transition: color 0.3s ease;
    color: inherit;
  }

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    color: #0d6efd; /* azul al hacer hover */

    svg {
      color: #0d6efd;
    }
  }
`;

const ComprarButton = styled(Button) <{ disabled?: boolean }>`
  border-radius: 0.75rem;
  padding: 0.75rem 2rem;
  border: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
  background: ${(props) =>
        props.disabled ? "#6c757d" : "linear-gradient(135deg, #0d6efd, #0056b3)"};
  box-shadow: ${(props) =>
        props.disabled ? "none" : "0 4px 15px rgba(13, 110, 253, 0.3)"};

  &:hover {
    background: ${(props) =>
        props.disabled ? "#6c757d" : "linear-gradient(135deg, #0056b3, #004085)"} !important;
    transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
    box-shadow: ${(props) =>
        props.disabled ? "none" : "0 6px 20px rgba(13, 110, 253, 0.4)"} !important;
  }

  &:active {
    transform: translateY(0px);
  }
`;

const StyledAlert = styled(Alert)`
  background-color: rgba(13, 110, 253, 0.1);
  border-color: rgba(13, 110, 253, 0.2);
  color: #0d6efd;
`;

const InstrumentoDetalle: React.FC<Props> = ({ instrumento, onVolver, onComprar }) => {
    const [isFavorito, setIsFavorito] = useState(false);
    const [cantidad, setCantidad] = useState(1);
    const [imagenError, setImagenError] = useState(false);
    const [mostrarCostoEnvio, setMostrarCostoEnvio] = useState(false);

    const calcularTotal = () => {
        const precioProducto = parseFloat(instrumento.precio) * cantidad;
        const costoEnvio = mostrarCostoEnvio ? instrumento.costoEnvio : 0;
        return precioProducto + costoEnvio;
    };

    const stockDisponible = instrumento.stock?.stockActual || 0;

    const handleComprar = () => {
        onComprar?.(instrumento.id || 0);
    };

    const handleFavorito = () => {
        setIsFavorito(!isFavorito);
    };

    const handleCompartir = () => {
        if (navigator.share) {
            navigator.share({
                title: instrumento.instrumento,
                text: `Mira este increíble ${instrumento.instrumento} de ${instrumento.marca}`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("¡Enlace copiado al portapapeles!");
        }
    };

    return (
        <StyledContainer fluid>
            <Container>
                <VolverButton variant="outline-primary" onClick={onVolver} className="mb-4">
                    <BsArrowLeft size={18} />
                    <span>Volver al catálogo</span>
                </VolverButton>

                <Row className="g-4">
                    {/* Imagen */}
                    <Col lg={6}>
                        <DetalleCard>
                            <ImagenWrapper>
                                {!imagenError ? (
                                    <img
                                        src={`/img/${instrumento.imagen}`}
                                        alt={instrumento.instrumento}
                                        onError={() => setImagenError(true)}
                                    />
                                ) : (
                                    <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                                        <div className="text-center">
                                            <BsTag size={48} className="mb-3" />
                                            <p>Imagen no disponible</p>
                                        </div>
                                    </div>
                                )}

                                {/* Badge de envío */}
                                <div style={{ position: "absolute", top: "15px", left: "15px" }}>
                                    {instrumento.costoEnvio === 0 ? (
                                        <Badge bg="success" className="d-inline-flex align-items-center gap-2 px-3 py-2" style={{ fontSize: "0.9rem" }}>
                                            <BsTruck size={18} />
                                            Envío gratis a todo el país
                                        </Badge>
                                    ) : (
                                        <Badge bg="warning" text="dark" className="d-inline-flex align-items-center gap-2 px-3 py-2" style={{ fontSize: "0.9rem" }}>
                                            <BsTruck size={18} />
                                            Envío interior: ${instrumento.costoEnvio}
                                        </Badge>
                                    )}
                                </div>

                                {/* Botones de acción */}
                                <div style={{ position: "absolute", top: "15px", right: "15px" }} className="d-flex gap-2">
                                    <ActionButton size="sm" onClick={handleFavorito}>
                                        {isFavorito ? <BsHeartFill size={18} color="#dc3545" /> : <BsHeart size={18} />}
                                    </ActionButton>
                                    <ActionButton size="sm" onClick={handleCompartir}>
                                        <BsShare size={18} />
                                    </ActionButton>
                                </div>
                            </ImagenWrapper>
                        </DetalleCard>

                        {/* Descripción debajo de la imagen */}
                        {instrumento.descripcion && (
                            <DetalleCard className="mt-3">
                                <Card.Body className="p-4">
                                    <h5 className="fw-bold mb-3">Descripción</h5>
                                    <p className="mb-0 text-muted" style={{ lineHeight: "1.6" }}>
                                        {instrumento.descripcion}
                                    </p>
                                </Card.Body>
                            </DetalleCard>
                        )}
                    </Col>

                    {/* Información del producto */}
                    <Col lg={6}>
                        <DetalleCard className="h-100">
                            <Card.Body className="p-4">
                                {/* Título y marca */}
                                <div className="mb-4">
                                    <h1 className="display-6 fw-bold mb-2" style={{ color: "#2c3e50" }}>
                                        {instrumento.instrumento}
                                    </h1>
                                    <div className="d-flex align-items-center gap-3 mb-3">
                                        <Badge bg="primary" className="px-3 py-2" style={{ fontSize: "0.9rem" }}>
                                            <BsAward size={16} className="me-1" />
                                            {instrumento.marca}
                                        </Badge>
                                        {instrumento.modelo && (
                                            <span className="text-muted">
                                                <strong>Modelo:</strong> {instrumento.modelo}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Precio */}
                                <div className="mb-4 d-flex align-items-center gap-2">
                                    <span className="display-5 fw-bold text-primary" style={{ lineHeight: "1" }}>
                                        ${instrumento.precio}
                                    </span>
                                    <small className="text-muted">Precio final</small>
                                </div>

                                {/* Info adicional */}
                                <div className="mb-4">
                                    <Row className="g-3">
                                        <Col sm={6}>
                                            <div className="d-flex align-items-center gap-2 text-muted">
                                                <BsShield size={18} />
                                                <span>
                                                    <strong>Vendidos:</strong> {instrumento.cantidadVendida}
                                                </span>
                                            </div>
                                        </Col>
                                        <Col sm={6}>
                                            <div className="d-flex align-items-center gap-2">
                                                <BsTag size={18} />
                                                <span><strong>Stock:</strong></span>
                                                <Badge bg={stockDisponible > 3 ? "success" : stockDisponible > 0 ? "warning" : "danger"} className="ms-1">
                                                    {stockDisponible} - {stockDisponible > 3 ? "En stock" : stockDisponible > 0 ? "Pocas unidades" : "Sin stock"}
                                                </Badge>
                                            </div>
                                        </Col>
                                        {instrumento.catorgoria && (
                                            <Col sm={12}>
                                                <div className="d-flex align-items-center gap-2 text-muted">
                                                    <BsTag size={18} />
                                                    <span><strong>Categoría:</strong> {instrumento.catorgoria.denominacion}</span>
                                                </div>
                                            </Col>
                                        )}
                                    </Row>
                                </div>

                                {/* Cálculo de envío */}
                                <div className="mb-4">
                                    <Card style={{ backgroundColor: "#f8f9fa" }} className="border-0">
                                        <Card.Body className="p-3">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span>Producto (x{cantidad}):</span>
                                                <span className="fw-bold">${(parseFloat(instrumento.precio) * cantidad).toFixed(2)}</span>
                                            </div>

                                            {instrumento.costoEnvio > 0 && (
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <div className="d-flex align-items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            id="incluirEnvio"
                                                            checked={mostrarCostoEnvio}
                                                            onChange={(e) => setMostrarCostoEnvio(e.target.checked)}
                                                            className="form-check-input"
                                                        />
                                                        <label htmlFor="incluirEnvio" className="form-check-label">
                                                            Incluir envío:
                                                        </label>
                                                    </div>
                                                    <span className="text-muted">
                                                        ${instrumento.costoEnvio.toFixed(2)}
                                                    </span>
                                                </div>
                                            )}

                                            <hr className="my-2" />
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="fw-bold">Total estimado:</span>
                                                <span className="fw-bold text-primary fs-5">
                                                    ${calcularTotal().toFixed(2)}
                                                </span>
                                            </div>

                                            {instrumento.costoEnvio === 0 && (
                                                <small className="text-success mt-2 d-block">
                                                    <BsTruck size={14} className="me-1" />
                                                    ¡Envío gratis incluido!
                                                </small>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </div>

                                {/* Selector de cantidad */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold">Cantidad:</label>
                                    <div className="d-flex align-items-center gap-2">
                                        <ActionButton
                                            size="sm"
                                            onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                                            disabled={cantidad <= 1}
                                        >
                                            -
                                        </ActionButton>
                                        <span
                                            className="mx-3 fw-bold"
                                            style={{ minWidth: "40px", textAlign: "center", fontSize: "1.1rem" }}
                                        >
                                            {cantidad}
                                        </span>
                                        <ActionButton
                                            size="sm"
                                            onClick={() => cantidad < stockDisponible && setCantidad(cantidad + 1)}
                                            disabled={cantidad >= stockDisponible}
                                        >
                                            +
                                        </ActionButton>
                                        <small className="text-muted ms-2">
                                            Máximo: {stockDisponible}
                                        </small>
                                    </div>
                                </div>

                                {/* Botón comprar */}
                                <div className="d-grid gap-2">
                                    <ComprarButton
                                        variant="primary"
                                        size="lg"
                                        onClick={handleComprar}
                                        disabled={stockDisponible <= 0}
                                    >
                                        <BsCart3 size={20} />
                                        <span>{stockDisponible <= 0 ? 'Sin stock disponible' : 'Comprar ahora'}</span>
                                    </ComprarButton>
                                </div>

                                {/* Garantía */}
                                <StyledAlert variant="info" className="mt-4 mb-0">
                                    <div className="d-flex align-items-center gap-2">
                                        <BsShield size={18} />
                                        <small>
                                            <strong>Garantía incluida.</strong> Protección completa en tu compra.
                                        </small>
                                    </div>
                                </StyledAlert>
                            </Card.Body>
                        </DetalleCard>
                    </Col>
                </Row>
            </Container>
        </StyledContainer>
    );
};

export default InstrumentoDetalle;
