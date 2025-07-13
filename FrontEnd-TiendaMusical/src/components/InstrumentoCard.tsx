import React from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import Instrumento from "../models/Instrumento";
import { BsEye } from "react-icons/bs";

interface Props {
    instrumento: Instrumento;
    onVerDetalle?: (id: number) => void;
}

const InstrumentoCard: React.FC<Props> = ({ instrumento, onVerDetalle }) => {
    return (
        <Card
            className="mb-3 shadow-sm border-0 mx-auto"
            style={{
                borderRadius: "0.75rem",
                maxWidth: "900px",
                width: "100%",
            }}
        >
            <Card.Body className="p-3">
                <Row className="align-items-center text-center text-md-start">
                    {/* Imagen */}
                    <Col xs={12} md={3} className="mb-3 mb-md-0 text-center">
                        <img
                            src={`/img/${instrumento.imagen}`}
                            alt={instrumento.instrumento}
                            style={{
                                width: "100%",
                                maxWidth: "180px",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "0.5rem",
                            }}
                        />
                    </Col>

                    {/* Información */}
                    <Col xs={12} md={6}>
                        {/* Título centrado */}
                        <h5 className="fw-bold text-center text-md-start mb-1">{instrumento.instrumento}</h5>
                        <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                            <p className="mb-1">
                                <strong>Marca:</strong> {instrumento.marca} | <strong>Modelo:</strong> {instrumento.modelo}
                            </p>
                            <p className="mb-1">
                                <strong>Precio:</strong> ${instrumento.precio}
                            </p>
                            <p className="mb-1">
                                {instrumento.costoEnvio === "G" ? (
                                    <Badge bg="success" className="d-inline-flex align-items-center gap-2 p-2">
                                        <img
                                            src="/img/camion.png"
                                            alt="Camión"
                                            style={{ width: "18px", height: "18px" }}
                                        />
                                        Envío gratis a todo el país
                                    </Badge>
                                ) : (
                                   <Badge bg="warning" text="dark" className="d-inline-flex align-items-center gap-2 p-2">
                                    <img
                                        src="/img/camion.png"
                                        alt="Camión"
                                        style={{ width: "18px", height: "18px" }}
                                    />
                                        Envío interior: ${instrumento.costoEnvio}
                                    </Badge>
                                )}
                            </p>
                            <p className="mb-0">
                                <strong>Vendidos:</strong> {instrumento.cantidadVendida}
                            </p>
                        </div>
                    </Col>

                    {/* Botón */}
                    <Col xs={12} md={3} className="text-center mt-3 mt-md-0">
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={() => onVerDetalle?.(instrumento.id)}
                            className="d-inline-flex align-items-center gap-1 px-3"
                        >
                            <BsEye size={16} />
                            <span>Ver detalle</span>
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default InstrumentoCard;
