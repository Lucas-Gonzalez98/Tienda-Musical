import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Badge, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Instrumento from '../../models/Instrumento';
import InstrumentoService from '../../services/InstrumentoService';
import StockService from '../../services/StockService';
import type Stock from '../../models/Stock';


interface AdminContainerProps {
  isOpen: boolean;
}

const AdminContainer = styled.div<AdminContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  height: 100vh;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  box-shadow: 5px 0 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow-y: auto;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`;

const ToggleButton = styled(Button)`
  position: fixed;
  top: 50%;
  left: ${props => props.isOpen ? '320px' : '0'};
  transform: translateY(-50%);
  z-index: 1001;
  background: linear-gradient(135deg, #0d6efd, #6c5ce7);
  border: none;
  border-radius: 0px 8px 8px 0px;
  padding: 1rem 0.5rem;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: linear-gradient(135deg, #0056b3, #5a4fcf);
    transform: translateY(-50%) scale(1.05);
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.3);
  }
`;

const PanelHeader = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;

  h3 {
    color: #ffffff;
    margin: 0;
    font-weight: 600;
    font-size: 1.3rem;
  }

  .subtitle {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
`;

const NavSection = styled(Nav)`
  flex-direction: column;
  padding: 1rem 0;

  .nav-link {
    color: rgba(255, 255, 255, 0.8);
    padding: 0.75rem 1.5rem;
    margin: 0.25rem 0;
    border-radius: 0;
    font-weight: 500;
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
      transform: translateX(5px);
    }

    &.active {
      background: linear-gradient(135deg, #0d6efd, #6c5ce7);
      color: #ffffff;
      box-shadow: 0 2px 10px rgba(13, 110, 253, 0.3);
      
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: #ffffff;
      }
    }

    i {
      font-size: 1.1rem;
      width: 20px;
      text-align: center;
    }

    .nav-text {
      flex: 1;
    }

    .nav-badge {
      background: rgba(255, 255, 255, 0.2);
      color: #ffffff;
      font-size: 0.8rem;
      padding: 0.2rem 0.5rem;
      border-radius: 10px;
      min-width: 20px;
      text-align: center;
    }
  }
`;

const ContentArea = styled.div`
  padding: 1rem;
  flex: 1;
`;

const StatsCard = styled(Card)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  .card-body {
    padding: 1rem;
    color: #ffffff;
  }

  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;

    h6 {
      margin: 0;
      font-size: 0.9rem;
      opacity: 0.9;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    i {
      font-size: 1.2rem;
      opacity: 0.7;
    }
  }

  .stat-value {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0;
    color: #0d6efd;
  }

  .stat-change {
    font-size: 0.8rem;
    margin-top: 0.25rem;
    opacity: 0.8;

    &.positive {
      color: #28a745;
    }

    &.negative {
      color: #dc3545;
    }
  }
`;

const QuickActionCard = styled(Card)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);

  .card-body {
    padding: 1rem;
  }

  .card-title {
    color: #ffffff;
    font-size: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn {
    width: 100%;
    margin-bottom: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    font-size: 0.9rem;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }

    &:last-child {
      margin-bottom: 0;
    }

    i {
      margin-right: 0.5rem;
    }
  }
`;

const AlertItem = styled.div`
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  color: #ffffff;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    color: #dc3545;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const navigate = useNavigate();
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [stock, setStock] = useState<Stock[]>([]);


  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (section: string) => {
    setActiveSection(section);
  };

  useEffect(() => {
    InstrumentoService.getAll()
      .then(setInstrumentos)
      .catch(console.error);
  }, []);

  useEffect(() => {
    StockService.getAll()
      .then(setStock)
      .catch(console.error);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'pedidos':
        return (
          <div>
            <StatsCard>
              <Card.Body>
                <div className="stat-header">
                  <h6>Pedidos Hoy</h6>
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="stat-value">12</div>
                <div className="stat-change positive">
                  <i className="fas fa-arrow-up"></i> +3 desde ayer
                </div>
              </Card.Body>
            </StatsCard>

            <StatsCard>
              <Card.Body>
                <div className="stat-header">
                  <h6>Pendientes</h6>
                  <i className="fas fa-clock"></i>
                </div>
                <div className="stat-value">5</div>
                <div className="stat-change">
                  <i className="fas fa-exclamation-triangle"></i> Requieren atención
                </div>
              </Card.Body>
            </StatsCard>

            <QuickActionCard>
              <Card.Body>
                <Card.Title>
                  <i className="fas fa-tasks"></i>
                  Acciones Rápidas
                </Card.Title>
                <Button>
                  <i className="fas fa-plus"></i>
                  Nuevo Pedido
                </Button>
                <Button>
                  <i className="fas fa-eye"></i>
                  Ver Pendientes
                </Button>
                <Button>
                  <i className="fas fa-check"></i>
                  Marcar Completado
                </Button>
              </Card.Body>
            </QuickActionCard>
          </div>
        );

      case 'stock':
        return (
          <div>
            <StatsCard>
              <Card.Body>
                <div className="stat-header">
                  <h6>Stock Total</h6>
                  <i className="fas fa-boxes"></i>
                </div>
                <div className="stat-value">342</div>
                <div className="stat-change negative">
                  <i className="fas fa-arrow-down"></i> -15 esta semana
                </div>
              </Card.Body>
            </StatsCard>

            <StatsCard>
              <Card.Body>
                <div className="stat-header">
                  <h6>Stock Bajo</h6>
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="stat-value">7</div>
                <div className="stat-change negative">
                  <i className="fas fa-warning"></i> Revisar urgente
                </div>
              </Card.Body>
            </StatsCard>

            <QuickActionCard>
              <Card.Body>
                <Card.Title>
                  <i className="fas fa-warehouse"></i>
                  Inventario
                </Card.Title>
                <Button>
                  <i className="fas fa-plus"></i>
                  Agregar Stock
                </Button>
                <Button>
                  <i className="fas fa-sync"></i>
                  Actualizar Inventario
                </Button>
                <Button>
                  <i className="fas fa-download"></i>
                  Exportar Reporte
                </Button>
              </Card.Body>
            </QuickActionCard>

            <Card style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)'
            }}>
              <Card.Body style={{ padding: '1rem' }}>
                <Card.Title style={{
                  color: '#ffffff',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <i className="fas fa-bell"></i>
                  Alertas de Stock
                </Card.Title>
                <AlertItem>
                  <i className="fas fa-exclamation-triangle"></i>
                  Guitarras eléctricas: Solo 2 unidades
                </AlertItem>
                <AlertItem>
                  <i className="fas fa-exclamation-triangle"></i>
                  Baterías: Stock agotado
                </AlertItem>
                <AlertItem>
                  <i className="fas fa-exclamation-triangle"></i>
                  Violines: 1 unidad restante
                </AlertItem>
              </Card.Body>
            </Card>
          </div>
        );

      default:
        return (
          <div>
            <StatsCard>
              <Card.Body>
                <div className="stat-header">
                  <h6>Ventas Hoy</h6>
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <div className="stat-value">$45,200</div>
                <div className="stat-change positive">
                  <i className="fas fa-arrow-up"></i> +12% vs ayer
                </div>
              </Card.Body>
            </StatsCard>

            <StatsCard>
              <Card.Body>
                <div className="stat-header">
                  <h6>Pedidos Activos</h6>
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="stat-value">23</div>
                <div className="stat-change">
                  <i className="fas fa-clock"></i> 5 pendientes
                </div>
              </Card.Body>
            </StatsCard>

            <StatsCard>
              <Card.Body>
                <div className="stat-header">
                  <h6>Productos</h6>
                  <i className="fas fa-guitar"></i>
                </div>
                <div className="stat-value">156</div>
                <div className="stat-change">
                  <i className="fas fa-warehouse"></i> 342 en stock
                </div>
              </Card.Body>
            </StatsCard>
          </div>
        );
    }
  };

  return (
    <>
      <ToggleButton
        onClick={togglePanel}
        isOpen={isOpen}
        aria-label="Toggle Admin Panel"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-cog'}`}></i>
      </ToggleButton>

      <AdminContainer isOpen={isOpen}>
        <PanelHeader>
          <h3>
            <i className="fas fa-shield-alt me-2"></i>
            Panel Admin
          </h3>
          <div className="subtitle">Musical Hendrix</div>
        </PanelHeader>

        <NavSection>
          <Nav.Link
            className={activeSection === 'dashboard' ? 'active' : ''}
            onClick={() => handleNavClick('dashboard')}
          >
            <i className="fas fa-tachometer-alt"></i>
            <span className="nav-text">Dashboard</span>
          </Nav.Link>

          <Nav.Link
            className={activeSection === 'pedidos' ? 'active' : ''}
            onClick={() => handleNavClick('pedidos')}
          >
            <i className="fas fa-shopping-cart"></i>
            <span className="nav-text">Pedidos</span>
            <Badge className="nav-badge">5</Badge>
          </Nav.Link>

          <Nav.Link
            className={activeSection === 'instrumentos' ? 'active' : ''}
            onClick={() => navigate('/instrumentos')}
          >
            <i className="fas fa-guitar"></i>
            <span className="nav-text">Instrumentos</span>
            <Badge className="nav-badge">{instrumentos.length}</Badge>
          </Nav.Link>

          <Nav.Link
            className={activeSection === 'stock' ? 'active' : ''}
            onClick={() => navigate('/stock')}
          >
            <i className="fas fa-boxes"></i>
            <span className="nav-text">Stock</span>
            <Badge className="nav-badge bg-warning">{stock.length}</Badge>
          </Nav.Link>
        </NavSection>

        <ContentArea>
          {renderContent()}
        </ContentArea>
      </AdminContainer>
    </>
  );
};

export default AdminPanel;