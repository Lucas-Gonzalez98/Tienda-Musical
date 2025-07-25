// components/ModalInstrumentoDetalle.tsx
import React from "react";
import { Modal, Badge, Button } from "react-bootstrap";
import styled from "styled-components";
import type Instrumento from "../../models/Instrumento";

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
                background: linear-gradient(135deg, #ff6b6b, #ee5a52);
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
        color: #007bff;
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

const PriceValue = styled(InfoValue)`
    color: #28a745;
    font-size: 1.1rem;
`;

const StatusBadge = styled(Badge)`
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    
    &.status-active {
        background: linear-gradient(135deg, #28a745, #218838);
        color: white;
    }
    
    &.status-inactive {
        background: linear-gradient(135deg, #dc3545, #c82333);
        color: white;
    }
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
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
interface ModalInstrumentoDetalleProps {
    show: boolean;
    onHide: () => void;
    instrumento: Instrumento | null;
}

const ModalInstrumentoDetalle: React.FC<ModalInstrumentoDetalleProps> = ({
    show,
    onHide,
    instrumento
}) => {
    if (!instrumento) return null;


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

    return (
        <StyledModal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header>
                <Modal.Title>
                    <i className={obtenerIconoCategoria(String(instrumento.categoria || ""))}></i>
                    {instrumento.instrumento} {instrumento.marca}
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
                        <InstrumentImage>
                            {instrumento.imagen ? (
                                <img
                                    src={`/img/${instrumento.imagen}`}
                                    alt={`${instrumento.instrumento}`}
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        e.currentTarget.nextElementSibling?.classList.remove('d-none');
                                    }}
                                />
                            ) : null}
                            <div className={`placeholder ${instrumento.imagen ? 'd-none' : ''}`}>
                                <i className={obtenerIconoCategoria(
                                    typeof instrumento.categoria === 'string'
                                        ? instrumento.categoria
                                        : (instrumento.categoria?.denominacion || '')
                                )}></i>
                                <span>Sin imagen</span>
                            </div>
                        </InstrumentImage>
                        {instrumento.descripcion && (
                            <InfoGroup>
                                <InfoTitle>
                                    <i className="fas fa-file-alt"></i>
                                    Descripción
                                </InfoTitle>
                                <InfoValue style={{ textAlign: 'justify', lineHeight: '1.5' }}>
                                    {instrumento.descripcion}
                                </InfoValue>
                            </InfoGroup>
                        )}

                    </ImageSection>

                    <InfoSection>
                        <InfoGroup>
                            <InfoTitle>
                                <i className="fas fa-info-circle"></i>
                                Información General
                            </InfoTitle>
                            <InfoItem>
                                <InfoLabel>ID:</InfoLabel>
                                <InfoValue>#{instrumento.id}</InfoValue>
                            </InfoItem>
                            <InfoItem>
                                <InfoLabel>Instrumento:</InfoLabel>
                                <InfoValue>{instrumento.instrumento}</InfoValue>
                            </InfoItem>
                            <InfoItem>
                                <InfoLabel>Marca:</InfoLabel>
                                <InfoValue>{instrumento.marca}</InfoValue>
                            </InfoItem>
                            <InfoItem>
                                <InfoLabel>Modelo:</InfoLabel>
                                <InfoValue>{instrumento.modelo}</InfoValue>
                            </InfoItem>
                            <InfoItem>
                                <InfoLabel>Categoría:</InfoLabel>
                                <InfoValue>
                                    {typeof instrumento.categoria === 'string'
                                        ? instrumento.categoria
                                        : (instrumento.categoria?.denominacion || 'No especificada')}
                                </InfoValue>
                            </InfoItem>
                        </InfoGroup>

                        <InfoGroup>
                            <InfoTitle>
                                <i className="fas fa-dollar-sign"></i>
                                Información Comercial
                            </InfoTitle>
                            <InfoItem>
                                <InfoLabel>Precio:</InfoLabel>
                                <PriceValue>{instrumento.precio || 0}</PriceValue>
                            </InfoItem>
                            <InfoItem>
                                <InfoLabel>Costo de Envío:</InfoLabel>
                                <InfoValue>
                                    {instrumento.costoEnvio === 0
                                        ? 'Envío Gratis'
                                        : instrumento.costoEnvio}
                                </InfoValue>
                            </InfoItem>
                            <InfoItem>
                                <InfoLabel>Cantidad Vendida:</InfoLabel>
                                <InfoValue>{instrumento.cantidadVendida || 0} unidades</InfoValue>
                            </InfoItem>
                        </InfoGroup>
                        <StatusBadge
                            className={instrumento.eliminado ? 'status-inactive' : 'status-active'}
                        >
                            <i className={`fas ${instrumento.eliminado ? 'fa-times' : 'fa-check'} me-1`}></i>
                            {instrumento.eliminado ? 'Inactivo' : 'Activo'}
                        </StatusBadge>
                    </InfoSection>
                </DetailContainer>

                <StatsGrid>
                    <StatCard>
                        <StatValue>{instrumento.cantidadVendida || 0}</StatValue>
                        <StatLabel>Vendidos</StatLabel>
                    </StatCard>
                    <StatCard>
                        <StatValue>{instrumento.precio}</StatValue>
                        <StatLabel>Precio</StatLabel>
                    </StatCard>
                    <StatCard>
                        <StatValue>
                            {instrumento.costoEnvio === 0 ? 'Gratis' : instrumento.costoEnvio}
                        </StatValue>
                        <StatLabel>Envío</StatLabel>
                    </StatCard>
                    <StatCard>
                        <StatValue>{instrumento.eliminado ? 'No' : 'Sí'}</StatValue>
                        <StatLabel>Disponible</StatLabel>
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

export default ModalInstrumentoDetalle;