// components/ModalStockEditar.tsx
import React, { useState, useEffect } from "react";
import { Modal, Badge, Button, Form } from "react-bootstrap";
import styled from "styled-components";
import type Stock from "../../models/Stock";
import StockService from "../../services/StockService";

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
                background: linear-gradient(135deg, #28a745, #20c997);
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
        padding: 1.5rem;
    }
    
    .modal-footer {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.05);
        gap: 1rem;
    }
`;

const InfoSection = styled.div`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.25rem;
    margin-bottom: 1.5rem;
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
        color: #28a745;
    }
`;

const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
`;

const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

const InfoLabel = styled.span`
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const InfoValue = styled.span`
    color: #ffffff;
    font-size: 1rem;
    font-weight: 600;
`;

const PriceValue = styled(InfoValue)`
    color: #28a745;
    font-size: 1.1rem;
`;

const EditSection = styled.div`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
`;

const StockControls = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 1.5rem 0;
`;

const StockButton = styled(Button)`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    border: none;
    transition: all 0.3s ease;
    
    &.btn-subtract {
        background: linear-gradient(135deg, #dc3545, #c82333);
        
        &:hover:not(:disabled) {
            background: linear-gradient(135deg, #c82333, #bd2130);
            transform: scale(1.1);
        }
    }
    
    &.btn-add {
        background: linear-gradient(135deg, #28a745, #218838);
        
        &:hover:not(:disabled) {
            background: linear-gradient(135deg, #218838, #1e7e34);
            transform: scale(1.1);
        }
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const StockInput = styled(Form.Control)`
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 700;
    text-align: center;
    width: 120px;
    height: 60px;
    
    &:focus {
        background: rgba(255, 255, 255, 0.15);
        border-color: #28a745;
        color: #ffffff;
        box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
    }
    
    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;

const ResultSection = styled.div`
    background: rgba(255, 255, 255, 0.08);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    padding: 1.5rem;
    text-align: center;
`;

const ResultGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 1rem;
`;

const ResultCard = styled.div`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
`;

const ResultValue = styled.div`
    font-size: 1.8rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
`;

const ResultLabel = styled.div`
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.5px;
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
`;

const ActionButton = styled(Button)`
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
    
    &.btn-save {
        background: linear-gradient(135deg, #28a745, #218838);
        
        &:hover:not(:disabled) {
            background: linear-gradient(135deg, #218838, #1e7e34);
            transform: translateY(-1px);
        }
    }
    
    &.btn-cancel {
        background: linear-gradient(135deg, #6c757d, #5a6268);
        
        &:hover {
            background: linear-gradient(135deg, #5a6268, #545b62);
            transform: translateY(-1px);
        }
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

const WarningAlert = styled.div`
    background: linear-gradient(135deg, rgba(220, 53, 69, 0.2), rgba(200, 35, 51, 0.2));
    border: 1px solid rgba(220, 53, 69, 0.3);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    color: #ffffff;
    
    i {
        color: #dc3545;
        margin-right: 0.5rem;
    }
`;

const ImageSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const InstrumentImage = styled.div`
    position: relative;
    width: 220px;
    height: 220px;
    border-radius: 16px;
    overflow: hidden;
    background: #f1f1f1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .placeholder {
        width: 100%;
        height: 100%;
        color: #999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        gap: 0.5rem;
        i {
            font-size: 2rem;
        }
    }
`;

// Interfaces
interface ModalStockEditarProps {
    show: boolean;
    onHide: () => void;
    stock: Stock | null;
    onGuardar: () => void;
}

const ModalStockEditar: React.FC<ModalStockEditarProps> = ({
    show,
    onHide,
    stock,
    onGuardar,
}) => {
    const [cantidadCambio, setCantidadCambio] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (show) {
            setCantidadCambio(0);
        }
    }, [show]);

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

    const stockFinal = Math.max(0, stock.stockActual + cantidadCambio);
    const estadoActual = obtenerEstadoStock(stock.stockActual);
    const estadoFinal = obtenerEstadoStock(stockFinal);

    const handleCantidadChange = (value: number) => {
        setCantidadCambio(value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setCantidadCambio(value);
    };

    const handleEditarStock = async () => {
        if (cantidadCambio === 0) return;

        setIsLoading(true);
        try {
            // Crea el objeto Stock actualizado
            const stockActualizado = {
                ...stock,
                stockActual: stockFinal
            };
            await StockService.update(stock.id!, stockActualizado);
            onHide();
            onGuardar();
        } catch (error) {
            console.error('Error al actualizar stock:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const showWarning = stockFinal === 0 || (stock.stockActual > 3 && stockFinal <= 3);

    return (
        <StyledModal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header>
                <Modal.Title>
                    <i className="fas fa-edit"></i>
                    Editar Stock - {stock.instrumento?.instrumento} {stock.instrumento?.marca}
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
                <InfoSection>
                    <InfoTitle>
                        <i className="fas fa-music"></i>
                        Información del Instrumento
                    </InfoTitle>
                    <ImageSection>
                        <InstrumentImage>
                            {stock.instrumento?.imagen ? (
                                <img
                                    src={`/img/${stock.instrumento.imagen}`}
                                    alt={stock.instrumento.instrumento}
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
                    <InfoGrid>
                        <InfoItem>
                            <InfoLabel>Instrumento</InfoLabel>
                            <InfoValue>
                                {stock.instrumento?.instrumento} {stock.instrumento?.marca}
                            </InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoLabel>Modelo</InfoLabel>
                            <InfoValue>{stock.instrumento?.modelo}</InfoValue>
                        </InfoItem>
                        <InfoItem>
                            <InfoLabel>Precio</InfoLabel>
                            <PriceValue>${stock.instrumento?.precio}</PriceValue>
                        </InfoItem>
                    </InfoGrid>
                </InfoSection>

                <EditSection>
                    <InfoTitle>
                        <i className="fas fa-boxes"></i>
                        Editar Cantidad de Stock
                    </InfoTitle>

                    {showWarning && (
                        <WarningAlert>
                            <i className="fas fa-exclamation-triangle"></i>
                            {stockFinal === 0
                                ? 'Atención: El stock quedará en 0 (Sin Stock)'
                                : 'Atención: El stock quedará en nivel bajo (≤ 3 unidades)'
                            }
                        </WarningAlert>
                    )}

                    <StockControls>
                        <StockButton
                            className="btn-subtract"
                            onClick={() => handleCantidadChange(cantidadCambio - 1)}
                            disabled={stockFinal <= 0 && cantidadCambio <= -stock.stockActual}
                        >
                            <i className="fas fa-minus"></i>
                        </StockButton>

                        <StockInput
                            type="number"
                            value={cantidadCambio}
                            onChange={handleInputChange}
                            placeholder="0"
                        />

                        <StockButton
                            className="btn-add"
                            onClick={() => handleCantidadChange(cantidadCambio + 1)}
                        >
                            <i className="fas fa-plus"></i>
                        </StockButton>
                    </StockControls>
                </EditSection>

                <ResultSection>
                    <InfoTitle>
                        <i className="fas fa-calculator"></i>
                        Resumen del Cambio
                    </InfoTitle>

                    <ResultGrid>
                        <ResultCard>
                            <ResultValue style={{ color: '#ffffff' }}>
                                {stock.stockActual}
                            </ResultValue>
                            <ResultLabel>Stock Actual</ResultLabel>
                            <StatusBadge className={`stock-${estadoActual.nivel}`}>
                                <i className={`${estadoActual.icono} me-1`}></i>
                                {estadoActual.texto}
                            </StatusBadge>
                        </ResultCard>

                        <ResultCard>
                            <ResultValue style={{
                                color: cantidadCambio > 0 ? '#28a745' : cantidadCambio < 0 ? '#dc3545' : '#ffffff'
                            }}>
                                {cantidadCambio > 0 ? '+' : ''}{cantidadCambio}
                            </ResultValue>
                            <ResultLabel>Cambio</ResultLabel>
                            <Badge style={{
                                background: cantidadCambio > 0
                                    ? 'linear-gradient(135deg, #28a745, #218838)'
                                    : cantidadCambio < 0
                                        ? 'linear-gradient(135deg, #dc3545, #c82333)'
                                        : 'linear-gradient(135deg, #6c757d, #5a6268)',
                                color: 'white'
                            }}>
                                <i className={`fas ${cantidadCambio > 0 ? 'fa-arrow-up' : cantidadCambio < 0 ? 'fa-arrow-down' : 'fa-minus'} me-1`}></i>
                                {cantidadCambio > 0 ? 'Aumentar' : cantidadCambio < 0 ? 'Reducir' : 'Sin cambio'}
                            </Badge>
                        </ResultCard>

                        <ResultCard>
                            <ResultValue style={{
                                color: stockFinal > stock.stockActual ? '#28a745' :
                                    stockFinal < stock.stockActual ? '#dc3545' : '#ffffff'
                            }}>
                                {stockFinal}
                            </ResultValue>
                            <ResultLabel>Stock Final</ResultLabel>
                            <StatusBadge className={`stock-${estadoFinal.nivel}`}>
                                <i className={`${estadoFinal.icono} me-1`}></i>
                                {estadoFinal.texto}
                            </StatusBadge>
                        </ResultCard>
                    </ResultGrid>
                </ResultSection>
            </Modal.Body>

            <Modal.Footer>
                <ActionButton
                    className="btn-cancel"
                    onClick={onHide}
                    disabled={isLoading}
                >
                    <i className="fas fa-times me-2"></i>
                    Cancelar
                </ActionButton>

                <ActionButton
                    className="btn-save"
                    onClick={handleEditarStock}
                    disabled={cantidadCambio === 0 || isLoading}
                >
                    <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-save'} me-2`}></i>
                    {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                </ActionButton>
            </Modal.Footer>
        </StyledModal>
    );
};

export default ModalStockEditar;