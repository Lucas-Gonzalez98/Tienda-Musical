// components/ModalStockAgregar.tsx
import React, { useState, useEffect } from "react";
import { Modal, Badge, Button, Form } from "react-bootstrap";
import styled from "styled-components";
import type Stock from "../../models/Stock";
import type Instrumento from "../../models/Instrumento";
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
                background: linear-gradient(135deg, #20c997, #17a2b8);
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
        max-height: 70vh;
        overflow-y: auto;
    }
    
    .modal-footer {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.05);
        gap: 1rem;
    }
`;

const FormSection = styled.div`
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h5`
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    i {
        color: #20c997;
    }
`;

const StyledSelect = styled(Form.Select)`
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: #ffffff;
    font-size: 1rem;
    padding: 0.75rem;
    
    &:focus {
        background: rgba(255, 255, 255, 0.15);
        border-color: #20c997;
        color: #ffffff;
        box-shadow: 0 0 0 0.2rem rgba(32, 201, 151, 0.25);
    }
    
    option {
        background: #1a1a1a;
        color: #ffffff;
        padding: 0.5rem;
    }
`;

const InstrumentPreview = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1.5rem;
    align-items: start;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        text-align: center;
    }
`;

const InstrumentImage = styled.div`
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
    
    .placeholder {
        font-size: 3rem;
        color: rgba(255, 255, 255, 0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        
        span {
            font-size: 0.9rem;
            font-weight: 500;
        }
    }
`;

const InstrumentDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const DetailGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
`;

const DetailItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

const DetailLabel = styled.span`
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const DetailValue = styled.span`
    color: #ffffff;
    font-size: 1rem;
    font-weight: 600;
`;

const PriceValue = styled(DetailValue)`
    color: #20c997;
    font-size: 1.2rem;
    font-weight: 700;
`;

const StockInputSection = styled.div`
    text-align: center;
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
        background: linear-gradient(135deg, #20c997, #17a2b8);
        
        &:hover:not(:disabled) {
            background: linear-gradient(135deg, #17a2b8, #138496);
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
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    width: 120px;
    height: 60px;
    
    &:focus {
        background: rgba(255, 255, 255, 0.15);
        border-color: #20c997;
        color: #ffffff;
        box-shadow: 0 0 0 0.2rem rgba(32, 201, 151, 0.25);
    }
    
    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }
`;

const StockPreview = styled.div`
    background: rgba(32, 201, 151, 0.1);
    border: 2px solid rgba(32, 201, 151, 0.3);
    border-radius: 12px;
    padding: 1rem;
    margin-top: 1rem;
    text-align: center;
`;

const PreviewValue = styled.div`
    font-size: 2rem;
    font-weight: 900;
    color: #20c997;
    margin-bottom: 0.5rem;
`;

const PreviewLabel = styled.div`
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const StatusBadge = styled(Badge)`
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 0.5rem;
    
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
    
    &.btn-create {
        background: linear-gradient(135deg, #20c997, #17a2b8);
        
        &:hover:not(:disabled) {
            background: linear-gradient(135deg, #17a2b8, #138496);
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

const EmptyState = styled.div`
    text-align: center;
    padding: 2rem;
    color: rgba(255, 255, 255, 0.6);
    
    i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: rgba(255, 255, 255, 0.3);
    }
    
    h5 {
        margin-bottom: 0.5rem;
        color: rgba(255, 255, 255, 0.8);
    }
`;

// Interfaces
interface ModalStockAgregarProps {
    show: boolean;
    onHide: () => void;
    instrumentosSinStock: Instrumento[];
    onGuardar: () => void;
}

const ModalStockAgregar: React.FC<ModalStockAgregarProps> = ({
    show,
    onHide,
    instrumentosSinStock,
    onGuardar
}) => {
    const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState<Instrumento | null>(null);
    const [cantidadStock, setCantidadStock] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (show) {
            setInstrumentoSeleccionado(null);
            setCantidadStock(1);
        }
    }, [show]);

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

    const obtenerEstadoStock = (stock: number) => {
        if (stock === 0) return { nivel: 'out', texto: 'Sin Stock' };
        if (stock <= 3) return { nivel: 'low', texto: 'Stock Bajo' };
        return { nivel: 'good', texto: 'Stock Óptimo' };
    };

    const handleInstrumentoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const instrumentoId = parseInt(e.target.value);
        const instrumento = instrumentosSinStock.find(i => i.id === instrumentoId);
        setInstrumentoSeleccionado(instrumento || null);
    };

    const handleCantidadChange = (nuevaCantidad: number) => {
        setCantidadStock(Math.max(0, nuevaCantidad));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        setCantidadStock(Math.max(0, value));
    };

    const handleAgregarStock = async () => {
        if (!instrumentoSeleccionado || cantidadStock <= 0) return;

        setIsLoading(true);
        try {
            const nuevoStock: Partial<Stock> = {
                stockActual: cantidadStock,
                instrumento: instrumentoSeleccionado,
                eliminado: false
            };

            await StockService.create(nuevoStock);
            onHide();
            onGuardar();
        } catch (error) {
            console.error('Error al crear stock:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const estadoStock = obtenerEstadoStock(cantidadStock);

    return (
        <StyledModal show={show} onHide={onHide} size="xl" centered>
            <Modal.Header>
                <Modal.Title>
                    <i className="fas fa-plus-circle"></i>
                    Agregar Nuevo Stock
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
                <FormSection>
                    <SectionTitle>
                        <i className="fas fa-search"></i>
                        Seleccionar Instrumento
                    </SectionTitle>

                    {instrumentosSinStock.length === 0 ? (
                        <EmptyState>
                            <i className="fas fa-inbox"></i>
                            <h5>No hay instrumentos disponibles</h5>
                            <p>Todos los instrumentos ya tienen stock asignado.</p>
                        </EmptyState>
                    ) : (
                        <StyledSelect
                            value={instrumentoSeleccionado?.id || ''}
                            onChange={handleInstrumentoChange}
                        >
                            <option value="">Seleccione un instrumento...</option>
                            {instrumentosSinStock.map((instrumento) => (
                                <option key={instrumento.id} value={instrumento.id}>
                                    {instrumento.instrumento} - {instrumento.marca} {instrumento.modelo}
                                </option>
                            ))}
                        </StyledSelect>
                    )}
                </FormSection>

                {instrumentoSeleccionado && (
                    <>
                        <FormSection>
                            <SectionTitle>
                                <i className="fas fa-info-circle"></i>
                                Detalles del Instrumento
                            </SectionTitle>

                            <InstrumentPreview>
                                <InstrumentImage>
                                    {instrumentoSeleccionado.imagen ? (
                                        <img
                                            src={`/img/${instrumentoSeleccionado.imagen}`}
                                            alt={instrumentoSeleccionado.instrumento}
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.nextElementSibling?.classList.remove('d-none');
                                            }}
                                        />
                                    ) : null}
                                    <div className={`placeholder ${instrumentoSeleccionado.imagen ? 'd-none' : ''}`}>
                                        <i className={obtenerIconoCategoria(
                                            typeof instrumentoSeleccionado.categoria === 'string'
                                                ? instrumentoSeleccionado.categoria
                                                : (instrumentoSeleccionado.categoria?.denominacion || '')
                                        )}></i>
                                        <span>Sin imagen</span>
                                    </div>
                                </InstrumentImage>

                                <InstrumentDetails>
                                    <DetailGrid>
                                        <DetailItem>
                                            <DetailLabel>Instrumento</DetailLabel>
                                            <DetailValue>{instrumentoSeleccionado.instrumento}</DetailValue>
                                        </DetailItem>
                                        <DetailItem>
                                            <DetailLabel>Marca</DetailLabel>
                                            <DetailValue>{instrumentoSeleccionado.marca}</DetailValue>
                                        </DetailItem>
                                        <DetailItem>
                                            <DetailLabel>Modelo</DetailLabel>
                                            <DetailValue>{instrumentoSeleccionado.modelo}</DetailValue>
                                        </DetailItem>
                                        <DetailItem>
                                            <DetailLabel>Categoría</DetailLabel>
                                            <DetailValue>
                                                {typeof instrumentoSeleccionado.categoria === 'string'
                                                    ? instrumentoSeleccionado.categoria
                                                    : (instrumentoSeleccionado.categoria?.denominacion || 'No especificada')}
                                            </DetailValue>
                                        </DetailItem>
                                        <DetailItem>
                                            <DetailLabel>Precio</DetailLabel>
                                            <PriceValue>${instrumentoSeleccionado.precio}</PriceValue>
                                        </DetailItem>
                                        <DetailItem>
                                            <DetailLabel>Costo Envío</DetailLabel>
                                            <DetailValue>${instrumentoSeleccionado.costoEnvio}</DetailValue>
                                        </DetailItem>
                                    </DetailGrid>
                                    
                                    {instrumentoSeleccionado.descripcion && (
                                        <DetailItem>
                                            <DetailLabel>Descripción</DetailLabel>
                                            <DetailValue>{instrumentoSeleccionado.descripcion}</DetailValue>
                                        </DetailItem>
                                    )}
                                </InstrumentDetails>
                            </InstrumentPreview>
                        </FormSection>

                        <FormSection>
                            <SectionTitle>
                                <i className="fas fa-boxes"></i>
                                Definir Cantidad de Stock
                            </SectionTitle>

                            <StockInputSection>
                                <StockControls>
                                    <StockButton
                                        className="btn-subtract"
                                        onClick={() => handleCantidadChange(cantidadStock - 1)}
                                        disabled={cantidadStock <= 1}
                                    >
                                        <i className="fas fa-minus"></i>
                                    </StockButton>

                                    <StockInput
                                        type="number"
                                        value={cantidadStock}
                                        onChange={handleInputChange}
                                        min="0"
                                        placeholder="1"
                                    />

                                    <StockButton
                                        className="btn-add"
                                        onClick={() => handleCantidadChange(cantidadStock + 1)}
                                    >
                                        <i className="fas fa-plus"></i>
                                    </StockButton>
                                </StockControls>

                                <StockPreview>
                                    <PreviewValue>{cantidadStock}</PreviewValue>
                                    <PreviewLabel>Unidades de Stock Inicial</PreviewLabel>
                                    <StatusBadge className={`stock-${estadoStock.nivel}`}>
                                        {estadoStock.texto}
                                    </StatusBadge>
                                </StockPreview>
                            </StockInputSection>
                        </FormSection>
                    </>
                )}
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
                    className="btn-create"
                    onClick={handleAgregarStock}
                    disabled={!instrumentoSeleccionado || cantidadStock <= 0 || isLoading}
                >
                    <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-plus'} me-2`}></i>
                    {isLoading ? 'Creando...' : 'Crear Stock'}
                </ActionButton>
            </Modal.Footer>
        </StyledModal>
    );
};

export default ModalStockAgregar;