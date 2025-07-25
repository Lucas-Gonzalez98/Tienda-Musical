// components/ModalStockDetalle.tsx
import React from "react";
import { Modal, Badge, Button } from "react-bootstrap";
import styled from "styled-components";
import type Stock from "../../models/Stock";

// Styled Components
const StyledModal = styled(Modal)`
    .modal-content {
        background: rgba(26, 26, 26, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        backdrop-filter: blur(20px);
        color: #ffffff;
    }
    
    .modal-header {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 1.5rem;
        
        .modal-title {
            color: #ffffff;
            font-size: 1.5rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            
            i {
                background: linear-gradient(135deg, #17a2b8, #138496);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
        }
        
        .btn-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.7);
            transition: color 0.3s ease;
            
            &:hover {
                color: #ffffff;
            }
        }
    }
    
    .modal-body {
        padding: 0;
    }
    
    .modal-footer {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.05);
    }
`;

const DetailContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 1.5rem;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
`;

const ImageSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InstrumentImage = styled.div`
    width: 100%;
    max-width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    overflow: hidden;
    position: relative;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 14px;
    }
    
    .placeholder {
        font-size: 4rem;
        color: rgba(255, 255, 255, 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        
        span {
            font-size: 1rem;
            font-weight: 500;
        }
    }
`;

const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const InfoGroup = styled.div`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.25rem;
`;

const InfoTitle = styled.h5`
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    i {
        color: #17a2b8;
    }
`;

const InfoItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

const InfoLabel = styled.span`
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    font-weight: 500;
`;

const InfoValue = styled.span`
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 600;
    text-align: right;
`;

const StockValue = styled(InfoValue)`
    font-size: 1.2rem;
    font-weight: 700;
`;

const StatusBadge = styled(Badge)`
    font-size: 0.9rem;
    padding: 0.7rem 1.2rem;
    border-radius: 25px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    &.stock-good {
        background: linear-gradient(135deg, #28a745, #218838);
        color: white;
    }
    
    &.stock-low {
        background: linear-gradient(135deg, #ffc107, #e0a800);
        color: #212529;
    }
    
    &.stock-out {
        background: linear-gradient(135deg, #dc3545, #c82333);
        color: white;
    }
    
    &.status-inactive {
        background: linear-gradient(135deg, #6c757d, #5a6268);
        color: white;
    }
`;

const StockIndicator = styled.div<{ stockLevel: 'good' | 'low' | 'out' }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 0 auto 1rem;
    font-size: 2.5rem;
    font-weight: 900;
    border: 4px solid;
    
    ${props => {
        switch (props.stockLevel) {
            case 'good':
                return `
                    background: linear-gradient(135deg, #28a745, #20c997);
                    border-color: #28a745;
                    color: white;
                `;
            case 'low':
                return `
                    background: linear-gradient(135deg, #ffc107, #fd7e14);
                    border-color: #ffc107;
                    color: #212529;
                `;
            case 'out':
                return `
                    background: linear-gradient(135deg, #dc3545, #e83e8c);
                    border-color: #dc3545;
                    color: white;
                `;
            default:
                return `
                    background: linear-gradient(135deg, #6c757d, #adb5bd);
                    border-color: #6c757d;
                    color: white;
                `;
        }
    }}
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
`;

const StatCard = styled.div`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: translateY(-2px);
    }
`;

const StatValue = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const CloseButton = styled(Button)`
    background: linear-gradient(135deg, #6c757d, #5a6268);
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
        background: linear-gradient(135deg, #5a6268, #545b62);
        transform: translateY(-1px);
    }
`;

// Interfaces
interface ModalStockDetalleProps {
    show: boolean;
    onHide: () => void;
    stock: Stock | null;
}

const ModalStockDetalle: React.FC<ModalStockDetalleProps> = ({
    show,
    onHide,
    stock
}) => {
    if (!stock) return null;

    const obtenerEstadoStock = (stockActual: number) => {
        if (stockActual === 0) return { nivel: 'out', texto: 'Sin Stock', icono: 'fas fa-times-circle' };
        if (stockActual <= 3) return { nivel: 'low', texto: 'Stock Bajo', icono: 'fas fa-exclamation-triangle' };
        return { nivel: 'good', texto: 'Stock Óptimo', icono: 'fas fa-check-circle' };
    };

    const obtenerIconoCategoria = (categoria: string): string => {
        const iconos: { [key: string]: string } = {
            'Guitarra': 'fas fa-guitar',
            'Bajo': 'fas fa-guitar',
            'Batería': 'fas fa-drum',
            'Percusión': 'fas fa-drum',
            'Teclado': 'fas fa-keyboard',
            'Piano': 'fas fa-piano',
            'Violín': 'fas fa-music',
            'Cuerda': 'fas fa-music',
            'Viento': 'fas fa-wind',
            'Brass': 'fas fa-trumpet'
        };
        return iconos[categoria] || 'fas fa-music';
    };

    const estadoStock = obtenerEstadoStock(stock.stockActual);

    return (
        <StyledModal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header>
                <Modal.Title>
                    <i className="fas fa-boxes"></i>
                    Stock - {stock.instrumento?.instrumento} {stock.instrumento?.marca}
                </Modal.Title>
                <button
                    type="button"
                    className="btn-close"
                    onClick={onHide}
                    aria-label="Cerrar"
                >
                    <i className="fas fa-times"></i>
                </button>
            </Modal.Header>

            <Modal.Body>
                <DetailContainer>
                    <ImageSection>
                        <StockIndicator stockLevel={estadoStock.nivel as 'good' | 'low' | 'out'}>
                            {stock.stockActual}
                        </StockIndicator>
                        
                        <StatusBadge className={`stock-${estadoStock.nivel}`}>
                            <i className={`${estadoStock.icono} me-2`}></i>
                            {estadoStock.texto}
                        </StatusBadge>

                        <InstrumentImage style={{ marginTop: '1rem' }}>
                            {stock.instrumento?.imagen ? (
                                <img
                                    src={`/img/${stock.instrumento.imagen}`}
                                    alt={`${stock.instrumento.instrumento}`}
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.nextElementSibling?.classList.remove('d-none');
                                    }}
                                />
                            ) : null}
                            <div className={`placeholder ${stock.instrumento?.imagen ? 'd-none' : ''}`}>
                                <i className={obtenerIconoCategoria(
                                    typeof stock.instrumento?.categoria === 'string'
                                        ? stock.instrumento.categoria
                                        : (stock.instrumento?.categoria?.denominacion || '')
                                )}></i>
                                <span>Sin imagen</span>
                            </div>
                        </InstrumentImage>
                    </ImageSection>

                    <InfoSection>
                        <InfoGroup>
                            <InfoTitle>
                                <i className="fas fa-warehouse"></i>
                                Información de Stock
                            </InfoTitle>
                            <InfoItem>
                                <InfoLabel>ID Stock:</InfoLabel>
                                <InfoValue>#{stock.id}</InfoValue>
                            </InfoItem>
                            <InfoItem>
                                <InfoLabel>Stock Actual:</InfoLabel>
                                <StockValue>{stock.stockActual} unidades</StockValue>
                            </InfoItem>
                            <InfoItem>
                                <InfoLabel>Estado:</InfoLabel>
                                <StatusBadge className={`stock-${estadoStock.nivel}`}>
                                    <i className={`${estadoStock.icono} me-1`}></i>
                                    {estadoStock.texto}
                                </StatusBadge>
                            </InfoItem>
                        </InfoGroup>

                        {stock.instrumento && (
                            <InfoGroup>
                                <InfoTitle>
                                    <i className="fas fa-music"></i>
                                    Información del Instrumento
                                </InfoTitle>
                                <InfoItem>
                                    <InfoLabel>ID Instrumento:</InfoLabel>
                                    <InfoValue>#{stock.instrumento.id}</InfoValue>
                                </InfoItem>
                                <InfoItem>
                                    <InfoLabel>Instrumento:</InfoLabel>
                                    <InfoValue>{stock.instrumento.instrumento}</InfoValue>
                                </InfoItem>
                                <InfoItem>
                                    <InfoLabel>Marca:</InfoLabel>
                                    <InfoValue>{stock.instrumento.marca}</InfoValue>
                                </InfoItem>
                                <InfoItem>
                                    <InfoLabel>Modelo:</InfoLabel>
                                    <InfoValue>{stock.instrumento.modelo}</InfoValue>
                                </InfoItem>
                                <InfoItem>
                                    <InfoLabel>Categoría:</InfoLabel>
                                    <InfoValue>
                                        {typeof stock.instrumento.categoria === 'string'
                                            ? stock.instrumento.categoria
                                            : (stock.instrumento.categoria?.denominacion || 'No especificada')}
                                    </InfoValue>
                                </InfoItem>
                                <InfoItem>
                                    <InfoLabel>Precio:</InfoLabel>
                                    <InfoValue style={{ color: '#28a745' }}>
                                        ${stock.instrumento.precio}
                                    </InfoValue>
                                </InfoItem>
                            </InfoGroup>
                        )}

                        <StatusBadge
                            className={stock.eliminado ? 'status-inactive' : 'stock-good'}
                        >
                            <i className={`fas ${stock.eliminado ? 'fa-times' : 'fa-check'} me-1`}></i>
                            {stock.eliminado ? 'Registro Inactivo' : 'Registro Activo'}
                        </StatusBadge>
                    </InfoSection>
                </DetailContainer>

                <StatsGrid>
                    <StatCard>
                        <StatValue>{stock.stockActual}</StatValue>
                        <StatLabel>Stock Actual</StatLabel>
                    </StatCard>
                    <StatCard>
                        <StatValue>{estadoStock.texto}</StatValue>
                        <StatLabel>Estado</StatLabel>
                    </StatCard>
                    <StatCard>
                        <StatValue>
                            {stock.instrumento?.cantidadVendida || 0}
                        </StatValue>
                        <StatLabel>Vendidos</StatLabel>
                    </StatCard>
                    <StatCard>
                        <StatValue>
                            ${stock.instrumento?.precio || 0}
                        </StatValue>
                        <StatLabel>Precio</StatLabel>
                    </StatCard>
                </StatsGrid>
            </Modal.Body>

            <Modal.Footer>
                <CloseButton onClick={onHide}>
                    <i className="fas fa-times me-2"></i>
                    Cerrar
                </CloseButton>
            </Modal.Footer>
        </StyledModal>
    );
};

export default ModalStockDetalle;