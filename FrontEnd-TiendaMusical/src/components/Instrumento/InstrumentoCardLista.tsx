import { useEffect, useState } from "react";
import styled from 'styled-components';
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import Instrumento from "../../models/Instrumento";
import InstrumentoCard from "./InstrumentoCard";
import InstrumentoService from "../../services/InstrumentoService";
import InstrumentoDetalle from "./InstrumentoDetalle";

// Styled components

const FullHeightContainer = styled(Container)`
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    color: #2c3e50;
    position: relative;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .underline {
    height: 4px;
    width: 100px;
    background-color: #0d6efd;
    margin: 0 auto;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(13, 110, 253, 0.3);
  }

  p {
    margin-top: 1rem;
    font-size: 1.1rem;
    font-weight: 400;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 5rem 1rem;

  .icon-wrapper {
    width: 100px;
    height: 100px;
    background-color: #e9ecef;
    border-radius: 50%;
    margin: 0 auto 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 2rem;
      color: #6c757d;
    }
  }

  h4, p {
    color: #6c757d;
  }
`;

const InstrumentoCardWrapper = styled(Col)`
  display: flex;

  .instrumento-card {
    width: 100%;

    @media (max-width: 576px) {
      max-width: 280px;
      margin: 0 auto;
    }

    @media (min-width: 577px) and (max-width: 768px) {
      max-width: 320px;
    }

    @media (min-width: 769px) and (max-width: 992px) {
      max-width: 250px;
    }

    @media (min-width: 993px) {
      max-width: 280px;
    }
  }
`;

const InstrumentoCardLista = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState<Instrumento | null>(null);
  const [vistaDetalle, setVistaDetalle] = useState(false);

  useEffect(() => {
    InstrumentoService.getActivos()
      .then(setInstrumentos)
      .catch((error) => {
        console.error("Error al cargar instrumentos", error);
        setError("Error al cargar los instrumentos. Por favor, inténtalo de nuevo.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleVerDetalle = (id: number) => {
    const instrumento = instrumentos.find(inst => inst.id === id);
    if (instrumento) {
      setInstrumentoSeleccionado(instrumento);
      setVistaDetalle(true);
    }
  };

  const handleVolver = () => {
    setVistaDetalle(false);
    setInstrumentoSeleccionado(null);
  };

  const handleComprar = (id: number) => {
    console.log("Comprar instrumento:", id);
  };

  if (vistaDetalle && instrumentoSeleccionado) {
    return (
      <InstrumentoDetalle
        instrumento={instrumentoSeleccionado}
        onVolver={handleVolver}
        onComprar={handleComprar}
      />
    );
  }

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <div className="d-flex flex-column align-items-center gap-3">
          <Spinner animation="border" variant="primary" />
          <h5 className="text-muted">Cargando instrumentos...</h5>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          <h5>¡Oops! Algo salió mal</h5>
          <p className="mb-0">{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <FullHeightContainer fluid>
      <Container>
        {/* Header */}
        <SectionHeader>
          <h1 className="display-5">Catálogo de Instrumentos</h1>
          <div className="underline" />
          <p className="text-muted mt-3 lead">
            Descubre nuestra selección de instrumentos musicales de alta calidad
          </p>
        </SectionHeader>

        {/* Contenido */}
        {instrumentos.length === 0 ? (
          <EmptyState>
            <div className="icon-wrapper">
              <i className="fas fa-music" />
            </div>
            <h4 className="mb-2">No hay instrumentos disponibles</h4>
            <p>Vuelve pronto para descubrir nuevos productos</p>
          </EmptyState>
        ) : (
          <>
            {/* Grid de productos */}
            <Row className="g-4">
              {instrumentos.map((instrumento) => (
                <InstrumentoCardWrapper
                  key={instrumento.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <InstrumentoCard
                    instrumento={instrumento}
                    onVerDetalle={handleVerDetalle}
                    onComprar={handleComprar}
                  />
                </InstrumentoCardWrapper>
              ))}
            </Row>
          </>
        )}
      </Container>
    </FullHeightContainer>
  );
};

export default InstrumentoCardLista;
