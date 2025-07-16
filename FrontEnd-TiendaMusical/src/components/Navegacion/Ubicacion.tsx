import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const UbicacionContainer = styled(Container)`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;

  h1 {
    color: #2c3e50;
    font-weight: 700;
    font-size: 3rem;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .underline {
    height: 4px;
    width: 100px;
    background-color: #0d6efd;
    margin: 0 auto;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(13, 110, 253, 0.3);
  }

  .subtitle {
    font-size: 1.3rem;
    color: #6c757d;
    margin-top: 1rem;
    font-weight: 300;
  }
`;

const LocationInfo = styled(Card)`
  background: white;
  border: none;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: white;
    border: none;
    padding: 1.5rem;
    
    h3 {
      margin: 0;
      font-weight: 600;
      font-size: 1.5rem;
    }
  }

  .card-body {
    padding: 2rem;
  }
`;

const InfoSection = styled.div`
  margin-bottom: 2rem;

  h4 {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      color: #0d6efd;
      font-size: 1.2rem;
    }
  }

  p {
    color: #6c757d;
    line-height: 1.7;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .highlight {
    color: #0d6efd;
    font-weight: 600;
  }
`;

const MapContainer = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;

  .map-header {
    background: linear-gradient(135deg, #0d6efd 0%, #6c5ce7 100%);
    color: white;
    padding: 1.5rem;
    text-align: center;
    
    h3 {
      margin: 0;
      font-weight: 600;
      font-size: 1.5rem;
    }
  }

  .map-content {
    padding: 0;
    height: 450px;
    
    iframe {
      width: 100%;
      height: 100%;
      border: none;
      filter: grayscale(0.2);
      transition: filter 0.3s ease;
      
      &:hover {
        filter: grayscale(0);
      }
    }
  }
`;

const ActionButtons = styled.div`
  text-align: center;
  margin-top: 2rem;

  .btn {
    margin: 0 0.5rem;
    padding: 0.75rem 2rem;
    font-weight: 600;
    border-radius: 25px;
    transition: all 0.3s ease;
    font-size: 1.1rem;

    &.btn-primary {
      background: linear-gradient(135deg, #0d6efd, #6c5ce7);
      border: none;
      box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(13, 110, 253, 0.4);
      }
    }

    &.btn-outline-primary {
      border: 2px solid #0d6efd;
      color: #0d6efd;
      background: transparent;

      &:hover {
        background: #0d6efd;
        border-color: #0d6efd;
        transform: translateY(-2px);
      }
    }
  }
`;

const ContactCard = styled(Card)`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  border: none;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  .card-body {
    padding: 2rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateX(5px);
    }

    i {
      font-size: 1.5rem;
      color: #0d6efd;
      margin-right: 1rem;
      width: 30px;
      text-align: center;
    }

    .contact-info {
      .label {
        font-weight: 600;
        font-size: 0.9rem;
        opacity: 0.8;
        margin-bottom: 0.2rem;
      }
      
      .value {
        font-size: 1.1rem;
        font-weight: 500;
      }
    }
  }
`;

const Ubicacion: React.FC = () => {
  const handleOpenMaps = () => {
    window.open('https://maps.google.com/?q=Av.+Las+Heras+y+Av.+San+Martin,+Ciudad+de+Mendoza', '_blank');
  };

  const handleGetDirections = () => {
    window.open('https://maps.google.com/dir/?api=1&destination=Av.+Las+Heras+y+Av.+San+Martin,+Ciudad+de+Mendoza', '_blank');
  };

  return (
    <UbicacionContainer fluid>
      <Container>
        {/* Page Header */}
        <PageHeader>
          <h1>
            <i className="fas fa-map-marker-alt me-3"></i>
            Nuestra Ubicación
          </h1>
          <div className="underline"></div>
          <p className="subtitle">Encuéntranos en el corazón de Mendoza</p>
        </PageHeader>

        <Row>
          <Col lg={8}>
            {/* Location Info */}
            <LocationInfo>
              <Card.Header>
                <h3>
                  <i className="fas fa-store me-2"></i>
                  Musical Hendrix
                </h3>
              </Card.Header>
              <Card.Body>
                <InfoSection>
                  <h4>
                    <i className="fas fa-map-marker-alt"></i>
                    Dirección
                  </h4>
                  <p>
                    Nos encontramos en <span className="highlight">Av. Las Heras y Av. San Martin</span>,
                    en pleno centro de la <span className="highlight">Ciudad de Mendoza</span>.
                    Una ubicación estratégica y de fácil acceso.
                  </p>
                </InfoSection>

                <InfoSection>
                  <h4>
                    <i className="fas fa-info-circle"></i>
                    Sobre nuestra ubicación
                  </h4>
                  <p>
                    Nuestro local está situado en una zona comercial muy transitada, con excelente
                    acceso tanto en transporte público como privado. Contamos con estacionamiento
                    cercano y múltiples líneas de transporte que pasan por la zona.
                  </p>
                </InfoSection>

                <ActionButtons>
                  <Button variant="primary" onClick={handleOpenMaps}>
                    <i className="fas fa-map-marked-alt me-2"></i>
                    Ver en Google Maps
                  </Button>
                  <Button variant="outline-primary" onClick={handleGetDirections}>
                    <i className="fas fa-directions me-2"></i>
                    Cómo llegar
                  </Button>
                </ActionButtons>
              </Card.Body>
            </LocationInfo>

            {/* Map */}
            <MapContainer>
              <div className="map-header">
                <h3>
                  <i className="fas fa-map me-2"></i>
                  Mapa Interactivo
                </h3>
              </div>
              <div className="map-content">
                <iframe
                  key={Date.now()}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.4481150060246!2d-68.84086562433271!3d-32.88631847361824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e091ed2dd83f7%3A0xf41c7ab7e3522157!2sAv.%20San%20Mart%C3%ADn%20%26%20Av.%20Las%20Heras%2C%20M5502%20Capital%2C%20Mendoza!5e0!3m2!1sen!2sar!4v1752624986799!5m2!1sen!2sar"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Musical Hendrix">
                </iframe>
              </div>
            </MapContainer>
          </Col>

          <Col lg={4}>
            {/* Contact Information */}
            <ContactCard>
              <Card.Body>
                <div className="text-center mb-4">
                  <h3>
                    <i className="fas fa-phone me-2"></i>
                    Información de Contacto
                  </h3>
                </div>

                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="contact-info">
                    <div className="label">DIRECCIÓN</div>
                    <div className="value">Av. Las Heras y Av. San Martin</div>
                  </div>
                </div>

                <div className="contact-item">
                  <i className="fas fa-city"></i>
                  <div className="contact-info">
                    <div className="label">CIUDAD</div>
                    <div className="value">Mendoza, Argentina</div>
                  </div>
                </div>

                <div className="contact-item">
                  <i className="fas fa-clock"></i>
                  <div className="contact-info">
                    <div className="label">HORARIOS</div>
                    <div className="value">Lun - Vie: 9:00 - 18:00</div>
                  </div>
                </div>

                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div className="contact-info">
                    <div className="label">TELÉFONO</div>
                    <div className="value">+54 261 123-4567</div>
                  </div>
                </div>

                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div className="contact-info">
                    <div className="label">EMAIL</div>
                    <div className="value">info@musicalhendrix.com</div>
                  </div>
                </div>
              </Card.Body>
            </ContactCard>

            {/* Informacion Adicional */}
            <Card style={{ marginTop: '2rem', borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
              <Card.Body style={{ padding: '2rem', textAlign: 'center' }}>
                <h4 style={{ color: '#2c3e50', marginBottom: '1rem' }}>
                  <i className="fas fa-info-circle me-2" style={{ color: '#0d6efd' }}></i>
                  Información Adicional
                </h4>
                <p style={{ color: '#6c757d', lineHeight: '1.6' }}>
                  Estamos ubicados en una zona de fácil acceso con múltiples opciones de transporte.
                  Si tienes alguna duda sobre cómo llegar, no dudes en contactarnos.
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <Button
                    variant="primary"
                    size="sm"
                    style={{
                      borderRadius: '20px',
                      padding: '0.5rem 1.5rem',
                      background: 'linear-gradient(135deg, #0d6efd, #6c5ce7)',
                      border: 'none'
                    }}
                  >
                    <i className="fas fa-phone me-1"></i>
                    Contáctanos
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </UbicacionContainer>
  );
};

export default Ubicacion;