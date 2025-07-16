import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Carousel } from 'react-bootstrap';

const HomeContainer = styled(Container)`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;
  padding: 3rem 0;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  border-radius: 20px;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(13, 110, 253, 0.1) 0%, transparent 70%);
    animation: pulse 4s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.1); opacity: 0.1; }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .brand-subtitle {
    font-size: 1.3rem;
    font-weight: 300;
    opacity: 0.9;
    margin-bottom: 2rem;
  }

  .music-icon {
    font-size: 4rem;
    color: #0d6efd;
    margin-bottom: 1rem;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;

const CarouselSection = styled.section`
  margin-bottom: 4rem;
  
  .carousel-title {
    text-align: center;
    margin-bottom: 2rem;
    
    h2 {
      color: #2c3e50;
      font-weight: 700;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    .underline {
      height: 4px;
      width: 100px;
      background-color: #0d6efd;
      margin: 0 auto;
      border-radius: 2px;
      box-shadow: 0 2px 4px rgba(13, 110, 253, 0.3);
    }
  }
`;

const StyledCarousel = styled(Carousel)`
  .carousel-inner {
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .carousel-item {
    height: 400px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.8);
      transition: all 0.3s ease;
    }

    &:hover img {
      filter: brightness(1);
      transform: scale(1.05);
    }
  }

  .carousel-caption {
    background: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    padding: 1rem;
    backdrop-filter: blur(10px);
    
    h5 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
  }

  .carousel-control-prev,
  .carousel-control-next {
    width: 5%;
    
    &:hover {
      background: rgba(13, 110, 253, 0.1);
    }
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    background-color: #0d6efd;
    border-radius: 50%;
    padding: 1rem;
    background-size: 60%;
  }

  .carousel-indicators {
    button {
      background-color: #0d6efd;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      margin: 0 5px;
      
      &.active {
        background-color: #ffffff;
        box-shadow: 0 0 0 2px #0d6efd;
      }
    }
  }
`;

const AboutSection = styled.section`
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #0d6efd, #6c5ce7, #0d6efd);
    background-size: 200% 100%;
    animation: gradientShift 3s ease infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .section-title {
    text-align: center;
    margin-bottom: 2rem;
    
    h2 {
      color: #2c3e50;
      font-weight: 700;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    .underline {
      height: 4px;
      width: 100px;
      background-color: #0d6efd;
      margin: 0 auto;
      border-radius: 2px;
      box-shadow: 0 2px 4px rgba(13, 110, 253, 0.3);
    }
  }

  .about-content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    
    p {
      font-size: 1.2rem;
      line-height: 1.8;
      color: #5a6c7d;
      margin-bottom: 1.5rem;
    }

    .highlight {
      color: #0d6efd;
      font-weight: 600;
    }

    .experience-badge {
      display: inline-block;
      background: linear-gradient(135deg, #0d6efd, #6c5ce7);
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      font-size: 1.1rem;
      margin-top: 1rem;
      box-shadow: 0 4px 15px rgba(13, 110, 253, 0.3);
    }
  }
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    border-color: #0d6efd;
  }

  .icon {
    font-size: 3rem;
    color: #0d6efd;
    margin-bottom: 1rem;
  }

  h4 {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    color: #6c757d;
    line-height: 1.6;
  }
`;

const Home: React.FC = () => {
  return (
    <HomeContainer fluid>
      <Container>
        {/* Hero Section */}
        <HeroSection>
          <HeroContent>
            <i className="fas fa-music music-icon"></i>
            <h1>Musical Hendrix</h1>
            <p className="brand-subtitle">
              Tu destino musical de confianza
            </p>
          </HeroContent>
        </HeroSection>

        {/* Carousel Section */}
        <CarouselSection>
          <div className="carousel-title">
            <h2>Nuestra Tienda</h2>
            <div className="underline"></div>
          </div>
          
          <StyledCarousel>
            <Carousel.Item>
              <img
                src="/img/Varios Instrumentos.jpg"
                alt="Varios Instrumentos"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400/2c3e50/ffffff?text=Varios+Instrumentos";
                }}
              />
              <Carousel.Caption>
                <h5>Amplia Variedad de Instrumentos</h5>
                <p>Descubre nuestra extensa colección de instrumentos musicales</p>
              </Carousel.Caption>
            </Carousel.Item>
            
            <Carousel.Item>
              <img
                src="/img/Varios Intrumentos 2.jpg"
                alt="Varios Instrumentos 2"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400/34495e/ffffff?text=Instrumentos+Musicales";
                }}
              />
              <Carousel.Caption>
                <h5>Calidad Profesional</h5>
                <p>Instrumentos de alta calidad para músicos de todos los niveles</p>
              </Carousel.Caption>
            </Carousel.Item>
          </StyledCarousel>
        </CarouselSection>

        {/* About Section */}
        <AboutSection>
          <div className="section-title">
            <h2>Sobre Nosotros</h2>
            <div className="underline"></div>
          </div>
          
          <div className="about-content">
            <p>
              <span className="highlight">Musical Hendrix</span> es una tienda de instrumentos musicales con ya más de 
              <span className="highlight"> 15 años de experiencia</span>. Tenemos el conocimiento y la capacidad como 
              para informarte acerca de las mejores elecciones para tu compra musical.
            </p>
            
            <p>
              Nos especializamos en brindar un servicio personalizado, ayudándote a encontrar el instrumento perfecto 
              que se adapte a tu estilo, nivel y presupuesto. Nuestra pasión por la música nos impulsa a ofrecer 
              solo productos de la más alta calidad.
            </p>
            
            <div className="experience-badge">
              +15 años de experiencia
            </div>
          </div>
        </AboutSection>

        {/* Features */}
        <Row>
          <Col md={4}>
            <FeatureCard>
              <i className="fas fa-award icon"></i>
              <h4>Calidad Garantizada</h4>
              <p>Solo trabajamos con las mejores marcas y productos de calidad superior.</p>
            </FeatureCard>
          </Col>
          <Col md={4}>
            <FeatureCard>
              <i className="fas fa-users icon"></i>
              <h4>Asesoramiento Experto</h4>
              <p>Nuestro equipo te guiará para encontrar el instrumento ideal para ti.</p>
            </FeatureCard>
          </Col>
          <Col md={4}>
            <FeatureCard>
              <i className="fas fa-heart icon"></i>
              <h4>Pasión por la Música</h4>
              <p>Compartimos tu amor por la música y te ayudamos a expresarlo.</p>
            </FeatureCard>
          </Col>
        </Row>
      </Container>
    </HomeContainer>
  );
};

export default Home;