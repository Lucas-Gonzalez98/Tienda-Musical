import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

const StyledNavbar = styled(BootstrapNavbar)`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-bottom: 3px solid #0d6efd;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0.75rem 0;
`;

const BrandName = styled(BootstrapNavbar.Brand)`
  color: #ffffff !important;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #0d6efd !important;
    transform: translateY(-1px);
  }

  i {
    font-size: 1.6rem;
    color: #0d6efd;
  }
`;

const NavItem = styled(Nav.Item)`
  margin: 0 0.5rem;
`;

const NavLinkStyled = styled(Nav.Link)<{ $isActive: boolean }>`
  color: ${props => props.$isActive ? '#0d6efd' : '#ffffff'} !important;
  font-weight: ${props => props.$isActive ? '600' : '500'};
  font-size: 1.1rem;
  padding: 0.5rem 1rem !important;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background-color: #0d6efd;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #0d6efd !important;
    background-color: rgba(13, 110, 253, 0.1);
    transform: translateY(-2px);

    &::after {
      width: 100%;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.3);
  }
`;

const TogglerButton = styled(BootstrapNavbar.Toggle)`
  border: none;
  padding: 0.25rem 0.5rem;
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.3);
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.8%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }
`;

const Navbar: React.FC = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: 'fas fa-home' },
    { path: '/ubicacion', label: 'Ubicación', icon: 'fas fa-map-marker-alt' },
    { path: '/productos', label: 'Productos', icon: 'fas fa-guitar' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <StyledNavbar expand="lg" expanded={expanded} onToggle={setExpanded}>
      <Container>
        <BrandName as={Link} to="/" onClick={() => setExpanded(false)}>
          <i className="fas fa-music"></i>
          Musical Hendrix
        </BrandName>
        
        <TogglerButton 
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {navItems.map((item) => (
              <NavItem key={item.path}>
                <NavLinkStyled
                  as={Link}
                  to={item.path}
                  $isActive={isActive(item.path)}
                  onClick={() => setExpanded(false)}
                >
                  <i className={`${item.icon} me-2`}></i>
                  {item.label}
                </NavLinkStyled>
              </NavItem>
            ))}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;