import React from "react";
import styled from "styled-components";
import { Card, Button, Badge } from "react-bootstrap";
import Instrumento from "../../models/Instrumento";
import { BsEye, BsCart3 } from "react-icons/bs";

interface Props {
    instrumento: Instrumento;
    onVerDetalle?: (id: number) => void;
    onComprar?: (id: number) => void;
}

const StyledCard = styled(Card)`
  border-radius: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  ${StyledCard}:hover & {
    transform: scale(1.05);
  }
`;

const ComprarButton = styled(Button) <{ disabled?: boolean }>`
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 2px 4px rgba(13, 110, 253, 0.2);
  background: ${({ disabled }) =>
        disabled ? "#6c757d" : "linear-gradient(135deg, #0d6efd, #0056b3)"};
  &:hover {
    background: ${({ disabled }) =>
        disabled ? "#6c757d" : "linear-gradient(135deg, #0056b3, #004085)"};
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(-2px)")};
    box-shadow: ${({ disabled }) =>
        disabled ? "none" : "0 4px 12px rgba(13, 110, 253, 0.4)"} !important;
  }
  &:active {
    transform: translateY(0px);
  }
`;

const DetalleButton = styled(Button)`
  border-radius: 0.5rem;
  padding: 0.4rem 1rem;
  transition: all 0.3s ease;
  border-width: 1.5px;
  &:hover {
    background-color: #0d6efd !important;
    color: white !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
  }
  &:active {
    transform: translateY(0px);
  }
`;

const InstrumentoCard: React.FC<Props> = ({ instrumento, onVerDetalle, onComprar }) => {
    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest("button")) return;
        onVerDetalle?.(instrumento.id || 0);
    };

    return (
        <StyledCard
            className="h-100 shadow-sm border-0 instrumento-card"
            onClick={handleCardClick}
        >
            <ImageWrapper>
                <StyledImage
                    src={`/img/${instrumento.imagen}`}
                    alt={instrumento.instrumento}
                    className="card-image"
                />
                <div style={{ position: "absolute", top: "10px", left: "10px" }}>
                    {instrumento.costoEnvio === 0 ? (
                        <Badge
                            bg="success"
                            className="d-inline-flex align-items-center gap-1 px-2 py-1"
                            style={{ fontSize: "0.75rem" }}
                        >
                            <img
                                src="/img/camion.png"
                                alt="Camión"
                                style={{ width: "14px", height: "14px" }}
                            />
                            Envío gratis
                        </Badge>
                    ) : (
                        <Badge
                            bg="warning"
                            text="dark"
                            className="d-inline-flex align-items-center gap-1 px-2 py-1"
                            style={{ fontSize: "0.75rem" }}
                        >
                            <img
                                src="/img/camion.png"
                                alt="Camión"
                                style={{ width: "14px", height: "14px" }}
                            />
                            ${instrumento.costoEnvio}
                        </Badge>
                    )}
                </div>
            </ImageWrapper>

            <Card.Body className="p-3 d-flex flex-column">
                <h6
                    className="fw-bold text-center mb-2"
                    style={{
                        fontSize: "1rem",
                        lineHeight: "1.2",
                        minHeight: "2.4rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {instrumento.instrumento}
                </h6>

                <div className="text-center mb-2">
                    <span className="fw-bold text-primary" style={{ fontSize: "1.4rem" }}>
                        ${instrumento.precio}
                    </span>
                </div>

                <div className="text-center mb-3">
                    <div className="d-flex justify-content-center gap-3">
                        <small className="text-muted">
                            <strong>Vendidos:</strong> {instrumento.cantidadVendida}
                        </small>
                        {instrumento.stock && (
                            <small
                                className={`fw-bold ${instrumento.stock.stockActual > 3
                                        ? "text-success"
                                        : instrumento.stock.stockActual > 0
                                            ? "text-warning"
                                            : "text-danger"
                                    }`}
                            >
                                <strong>Stock:</strong> {instrumento.stock.stockActual}
                            </small>
                        )}
                    </div>
                </div>

                <div className="mt-auto d-flex flex-column gap-2">
                    <ComprarButton
                        variant="primary"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            onComprar?.(instrumento.id || 0);
                        }}
                        className="comprar-btn d-flex align-items-center justify-content-center gap-2 fw-bold"
                        disabled={!instrumento.stock || instrumento.stock.stockActual <= 0}
                    >
                        <BsCart3 size={16} />
                        <span>
                            {!instrumento.stock || instrumento.stock.stockActual <= 0
                                ? "Sin Stock"
                                : "Comprar"}
                        </span>
                    </ComprarButton>

                    <DetalleButton
                        variant="outline-primary"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            onVerDetalle?.(instrumento.id || 0);
                        }}
                        className="detalle-btn d-flex align-items-center justify-content-center gap-2"
                    >
                        <BsEye size={14} />
                        <span>Ver detalle</span>
                    </DetalleButton>
                </div>
            </Card.Body>
        </StyledCard>
    );
};

export default InstrumentoCard;
