// pages/GrillaStock.tsx
import React, { useEffect, useState } from "react";
import { Button, Alert, Form, Row, Col, Card, Pagination } from "react-bootstrap";
import styled from "styled-components";
import TablaDatos from "../TablaDatos";
import StockService from "../../services/StockService";
import Stock from "../../models/Stock";
import type Categoria from "../../models/Categoria";
import CategoriaService from "../../services/CategoriaService";
import ModalStockDetalle from "../Modales/ModalStockDetalle";
import ModalStockEditar from "../Modales/ModalStockEditar";
import InstrumentoService from "../../services/InstrumentoService";
import ModalStockAgregar from "../Modales/ModalStockAgregar";
import type Instrumento from "../../models/Instrumento";



// Interfaces
interface FiltrosStock {
    nivelStock?: 'sin_stock' | 'stock_bajo' | 'stock_bueno';
    eliminado?: boolean;
    nombreInstrumento?: string;
    idCategoria?: number;
    page?: number;
    size?: number;
    sort?: string;
}

interface DatoTablaStock {
    id: number;
    instrumento: string;
    marca: string;
    modelo: string;
    categoria: string;
    stock: number;
    eliminado: boolean;
    original: Stock; // 👈 incluís el objeto original
}


interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

// Styled Components
const PageContainer = styled.div`
    padding: 2rem;
    background: linear-gradient(135deg, #1a1a1a, #2c2c2c);
    min-height: 100vh;
`;

const PageHeader = styled.div`
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
`;

const PageTitle = styled.h2`
    color: #ffffff;
    font-size: 2rem;
    font-weight: 700;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    i {
        background: linear-gradient(135deg, #28a745, #20c997);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-size: 1.75rem;
    }
`;

const StatsContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
`;

const StatCard = styled.div`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    flex: 1;
    min-width: 200px;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: translateY(-2px);
    }
    
    &.danger {
        border-color: rgba(220, 53, 69, 0.5);
        background: rgba(220, 53, 69, 0.1);
    }
    
    &.warning {
        border-color: rgba(255, 193, 7, 0.5);
        background: rgba(255, 193, 7, 0.1);
    }
    
    &.success {
        border-color: rgba(40, 167, 69, 0.5);
        background: rgba(40, 167, 69, 0.1);
    }
`;

const StatValue = styled.div`
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.5rem;
    
    &.danger {
        color: #ff6b6b;
    }
    
    &.warning {
        color: #ffc107;
    }
    
    &.success {
        color: #28a745;
    }
`;

const StatLabel = styled.div`
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ContentCard = styled.div`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    padding: 1.5rem;
    margin-bottom: 1rem;
`;

const FiltersCard = styled(Card)`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    margin-bottom: 1rem;
    
    .card-body {
        padding: 1.5rem;
    }
    
    .card-header {
        background: rgba(255, 255, 255, 0.05);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        color: #ffffff;
        font-weight: 600;
    }
`;

const StyledFormControl = styled(Form.Control)`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #ffffff;
    border-radius: 8px;
    
    &:focus {
        background: rgba(255, 255, 255, 0.15);
        border-color: #007bff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        color: #ffffff;
    }
    
    &::placeholder {
        color: rgba(255, 255, 255, 0.6);
    }
`;


const ActionButtonsContainer = styled.div`
    justify-content: flex-end;
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    margin-right: 2.5rem;
    flex-wrap: wrap;
`;

const ActionButton = styled(Button)`
    border: none;
    border-radius: 8px;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &.btn-primary {
        background: linear-gradient(135deg, #007bff, #0056b3);
        
        &:hover {
            background: linear-gradient(135deg, #0056b3, #004085);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
        }
    }
    
    &.btn-success {
        background: linear-gradient(135deg, #28a745, #218838);
        
        &:hover {
            background: linear-gradient(135deg, #218838, #1e7e34);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
        }
    }
    
    &.btn-secondary {
        background: linear-gradient(135deg, #6c757d, #5a6268);
        
        &:hover {
            background: linear-gradient(135deg, #5a6268, #495057);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
        }
    }
    
    &:active {
        transform: translateY(0);
    }
`;

const ViewModeToggle = styled.div`
    display: flex;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 0.25rem;
    gap: 0.25rem;
`;

const ToggleButton = styled(Button) <{ active: boolean }>`
    border: none;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    transition: all 0.3s ease;
    background: ${props => props.active
        ? 'linear-gradient(135deg, #007bff, #0056b3)'
        : 'transparent'};
    color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'};
    
    &:hover {
        background: ${props => props.active
        ? 'linear-gradient(135deg, #0056b3, #004085)'
        : 'rgba(255, 255, 255, 0.1)'};
        color: #ffffff;
    }
`;

const CustomSelect = styled(Form.Select)`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #ffffff;
    border-radius: 8px;

    option {
        background-color: #ffffff;
        color: #000000;
    }
`;

const StockBadge = styled.span<{ stockLevel: 'sin_stock' | 'stock_bajo' | 'stock_bueno' }>`
    padding: 0.375rem 0.75rem;
    border-radius: 6px;
    font-weight: 600;
    font-size: 0.875rem;
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    
    ${props => {
        switch (props.stockLevel) {
            case 'sin_stock':
                return `
                    background: rgba(220, 53, 69, 0.2);
                    color: #ff6b6b;
                    border: 1px solid rgba(220, 53, 69, 0.5);
                `;
            case 'stock_bajo':
                return `
                    background: rgba(255, 193, 7, 0.2);
                    color: #ffc107;
                    border: 1px solid rgba(255, 193, 7, 0.5);
                `;
            case 'stock_bueno':
                return `
                    background: rgba(40, 167, 69, 0.2);
                    color: #28a745;
                    border: 1px solid rgba(40, 167, 69, 0.5);
                `;
        }
    }}
`;

const GrillaStock: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [stockSeleccionado, setStockSeleccionado] = useState<Stock | undefined>(undefined);
    const [modalActivo, setModalActivo] = useState<'detalle' | 'editar' | 'agregar' | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [instrumentosSinStock, setInstrumentosSinStock] = useState<Instrumento[]>([]);
    const [pageSize, setPageSize] = useState<number>(20);

    const [filtros, setFiltros] = useState<FiltrosStock>({
        eliminado: false,
        page: 0,
        size: 20,
        sort: "id,desc"
    });

    // Función para determinar el nivel de stock
    const getStockLevel = (stock: number): 'sin_stock' | 'stock_bajo' | 'stock_bueno' => {
        if (stock === 0) return 'sin_stock';
        if (stock <= 3) return 'stock_bajo';
        return 'stock_bueno';
    };

    const getInstrumentosSinStock = async () => {
        try {
            const instrumentos = await InstrumentoService.getInstrumentosSinStock();
            setInstrumentosSinStock(instrumentos);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    // Carga paginada de stocks
    const cargarStocks = async () => {
        try {
            setError(null);
            const filtrosRequest = {
                ...filtros,
                page: currentPage,
                size: pageSize
            };
            const response: Page<Stock> = await StockService.filtrar(filtrosRequest);
            setStocks(response.content);
            setTotalPages(response.totalPages);
            setTotalElements(response.totalElements);
            setCurrentPage(response.number);
        } catch (error) {
            setError("Error al cargar stocks. Intenta nuevamente.");
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        cargarStocks();
    }, [filtros, currentPage, pageSize]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await CategoriaService.getAll();
                setCategorias(data);
            } catch (error) {
                console.error("Error al cargar categorías", error);
            }
        };
        fetchCategorias();
    }, []);

    const handleFiltroChange = (campo: keyof FiltrosStock, valor: any) => {
        setFiltros(prev => ({
            ...prev,
            [campo]: valor,
            page: 0
        }));
        setCurrentPage(0);
    };

    const limpiarFiltros = () => {
        setFiltros({
            eliminado: false,
            page: 0,
            size: pageSize,
            sort: "id,desc"
        });
        setCurrentPage(0);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(0);
        setFiltros(prev => ({
            ...prev,
            size: size,
            page: 0
        }));
    };

    // Columnas para la tabla
    const columnas = [
        { key: "instrumento", titulo: "Nombre" },
        { key: "marca", titulo: "Marca" },
        { key: "modelo", titulo: "Modelo" },
        { key: "categoria", titulo: "Categoría" },
        {
            key: "stock",
            titulo: "Stock",
            render: (item: Record<string, any>) => (
                <StockBadge stockLevel={getStockLevel(item.stock)}>
                    {item.stock}
                </StockBadge>
            )
        }
    ];

    // Datos para la tabla
    const datosTabla: DatoTablaStock[] = stocks.map((item: Stock) => ({
        instrumento: item.instrumento?.instrumento ?? "",
        marca: item.instrumento?.marca ?? "",
        modelo: item.instrumento?.modelo ?? "",
        categoria: item.instrumento?.categoria?.denominacion ?? "Sin categoría",
        stock: item.stockActual,
        eliminado: item.eliminado ?? false,
        id: item.id ?? 0,
        original: item // 👈 guarda el Stock completo
    }));
    // Estadísticas
    const sinStock = stocks.filter(s => s.stockActual === 0).length;
    const stockBajo = stocks.filter(s => s.stockActual > 0 && s.stockActual <= 3).length;
    const stockBueno = stocks.filter(s => s.stockActual > 3).length;

    // Paginación
    const renderPaginacion = () => {
        const items = [];
        const maxVisiblePages = 5;
        items.push(
            <Pagination.Prev
                key="prev"
                disabled={currentPage === 0}
                onClick={() => handlePageChange(currentPage - 1)}
            />
        );
        let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(0, endPage - maxVisiblePages + 1);
        }
        if (startPage > 0) {
            items.push(
                <Pagination.Item key={0} onClick={() => handlePageChange(0)}>
                    1
                </Pagination.Item>
            );
            if (startPage > 1) {
                items.push(<Pagination.Ellipsis key="ellipsis-start" />);
            }
        }
        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => handlePageChange(i)}
                >
                    {i + 1}
                </Pagination.Item>
            );
        }
        if (endPage < totalPages - 1) {
            if (endPage < totalPages - 2) {
                items.push(<Pagination.Ellipsis key="ellipsis-end" />);
            }
            items.push(
                <Pagination.Item
                    key={totalPages - 1}
                    onClick={() => handlePageChange(totalPages - 1)}
                >
                    {totalPages}
                </Pagination.Item>
            );
        }
        items.push(
            <Pagination.Next
                key="next"
                disabled={currentPage === totalPages - 1}
                onClick={() => handlePageChange(currentPage + 1)}
            />
        );
        return items;
    };

    // Acciones
    const manejarVerDetalle = (item: DatoTablaStock) => {
        setStockSeleccionado(item.original);
        setModalActivo('detalle');
    };

    const manejarEditar = (item: DatoTablaStock) => {
        setStockSeleccionado(item.original);
        setModalActivo('editar');
    };

    const handleCreateStock = () => {
        getInstrumentosSinStock();
        setModalActivo('agregar');
    };

    const manejarEliminar = async (item: Record<string, any>) => {
        const confirmacion = window.confirm(
            `¿Estás seguro de que quieres eliminar el stock de "${item.instrumento} ${item.marca} ${item.modelo}"?`
        );
        if (confirmacion) {
            try {
                await StockService.delete(item.id!);
                await cargarStocks();
                alert('Stock eliminado exitosamente');
            } catch (error) {
                alert('Error al eliminar el stock');
                console.error('Error al eliminar:', error);
            }
        }
    };

    const manejarDarDeAlta = async (item: Record<string, any>) => {
        const confirmacion = window.confirm(
            `¿Deseas activar nuevamente el stock de "${item.instrumento} ${item.marca} ${item.modelo}"?`
        );
        if (confirmacion) {
            try {
                await StockService.changeEliminado(item.id!);
                await cargarStocks();
                alert('Stock activado exitosamente');
            } catch (error) {
                alert('Error al activar el stock');
                console.error('Error al activar:', error);
            }
        }
    };

    if (error) {
        return (
            <PageContainer>
                <Alert variant="danger">
                    <div>
                        <i className="fas fa-exclamation-triangle"></i>
                        Error al cargar datos
                    </div>
                    <p>{error}</p>
                    <Button variant="primary" onClick={cargarStocks}>
                        <i className="fas fa-sync-alt"></i>
                        Reintentar
                    </Button>
                </Alert>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>
                    <i className="fas fa-boxes"></i>
                    Gestión de Stock
                </PageTitle>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <ActionButton
                        variant="secondary"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <i className="fas fa-filter"></i>
                        Filtros
                    </ActionButton>
                    <ViewModeToggle>
                        <ToggleButton
                            active={!filtros.eliminado}
                            onClick={() => handleFiltroChange('eliminado', false)}
                        >
                            <i className="fas fa-eye"></i>
                            Activos
                        </ToggleButton>
                        <ToggleButton
                            active={!!filtros.eliminado}
                            onClick={() => handleFiltroChange('eliminado', true)}
                        >
                            <i className="fas fa-archive"></i>
                            Eliminados
                        </ToggleButton>
                    </ViewModeToggle>
                </div>
            </PageHeader>

            {showFilters && (
                <FiltersCard>
                    <Card.Header>
                        <i className="fas fa-filter"></i>
                        Filtros de Búsqueda
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: '#ffffff' }}>Nombre Instrumento</Form.Label>
                                    <StyledFormControl
                                        type="text"
                                        placeholder="Buscar por nombre"
                                        value={filtros.nombreInstrumento || ''}
                                        onChange={(e) => handleFiltroChange('nombreInstrumento',
                                            e.target.value || undefined)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: '#ffffff' }}>Categoría</Form.Label>
                                    <CustomSelect
                                        value={filtros.idCategoria || ''}
                                        onChange={(e) => handleFiltroChange('idCategoria', e.target.value)}
                                    >
                                        <option value="">Todas las categorías</option>
                                        {categorias.map(categoria => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.denominacion}
                                            </option>
                                        ))}
                                    </CustomSelect>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: '#ffffff' }}>Nivel de Stock</Form.Label>
                                    <CustomSelect
                                        value={filtros.nivelStock || ''}
                                        onChange={(e) => handleFiltroChange('nivelStock', e.target.value || undefined)}
                                    >
                                        <option value="">Todos los niveles</option>
                                        <option value="sin_stock">Sin Stock (0)</option>
                                        <option value="stock_bajo">Stock Bajo (1-3)</option>
                                        <option value="stock_bueno">Stock Bueno (4+)</option>
                                    </CustomSelect>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: '#ffffff' }}>Ordenar por</Form.Label>
                                    <CustomSelect
                                        value={filtros.sort || ''}
                                        onChange={(e) => handleFiltroChange('sort', e.target.value)}
                                    >
                                        <option value="id,desc">ID (Desc)</option>
                                        <option value="id,asc">ID (Asc)</option>
                                        <option value="instrumento.instrumento,asc">Nombre (A-Z)</option>
                                        <option value="instrumento.instrumento,desc">Nombre (Z-A)</option>
                                        <option value="cantidad,asc">Stock (Menor)</option>
                                        <option value="cantidad,desc">Stock (Mayor)</option>
                                    </CustomSelect>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: '#ffffff' }}>Elementos por página</Form.Label>
                                    <CustomSelect
                                        value={pageSize}
                                        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </CustomSelect>
                                </Form.Group>
                            </Col>
                            <Col md={3} className="d-flex align-items-end">
                                <ActionButton
                                    variant="secondary"
                                    onClick={limpiarFiltros}
                                    style={{ marginBottom: '1rem' }}
                                >
                                    <i className="fas fa-eraser"></i>
                                    Limpiar Filtros
                                </ActionButton>
                            </Col>
                        </Row>
                    </Card.Body>
                </FiltersCard>
            )}

            <StatsContainer>
                <StatCard className="danger">
                    <StatValue className="danger">{sinStock}</StatValue>
                    <StatLabel>
                        <i className="fas fa-times-circle"></i>
                        Sin Stock
                    </StatLabel>
                </StatCard>

                <StatCard className="warning">
                    <StatValue className="warning">{stockBajo}</StatValue>
                    <StatLabel>
                        <i className="fas fa-exclamation-triangle"></i>
                        Stock Bajo
                    </StatLabel>
                </StatCard>

                <StatCard className="success">
                    <StatValue className="success">{stockBueno}</StatValue>
                    <StatLabel>
                        <i className="fas fa-check-circle"></i>
                        Stock Bueno
                    </StatLabel>
                </StatCard>

                <StatCard>
                    <StatValue>{totalElements}</StatValue>
                    <StatLabel>
                        <i className="fas fa-boxes"></i>
                        Total Productos
                    </StatLabel>
                </StatCard>
            </StatsContainer>

            <ContentCard>
                <ActionButtonsContainer>
                    <ActionButton
                        variant="primary"
                        onClick={handleCreateStock}
                    >
                        <i className="fas fa-plus"></i>
                        Agregar Instrumento
                    </ActionButton>
                </ActionButtonsContainer>
                <TablaDatos
                    columnas={columnas}
                    datos={datosTabla}
                    acciones={{
                        onVerDetalle: (item) => manejarVerDetalle(item as DatoTablaStock),
                        onEditar: (item) => manejarEditar(item as DatoTablaStock),
                        onEliminar: manejarEliminar,
                        onDarDeAlta: manejarDarDeAlta
                    }}
                    campoEliminado="eliminado"
                    mostrarEstado={true}
                    textoVacio="No hay stocks que coincidan con los filtros"
                    iconoVacio="fas fa-boxes"
                />
                {totalPages > 1 && (
                    <Pagination>{renderPaginacion()}</Pagination>
                )}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.875rem'
                }}>
                    <span>
                        Mostrando {currentPage * pageSize + 1} - {Math.min((currentPage + 1) * pageSize, totalElements)} de {totalElements} stocks
                    </span>
                    <span>
                        Página {currentPage + 1} de {totalPages}
                    </span>
                </div>
            </ContentCard>
            <ModalStockDetalle
                show={modalActivo === 'detalle'}
                onHide={() => setModalActivo(null)}
                stock={stockSeleccionado ?? null}
            />

            <ModalStockEditar
                show={modalActivo === 'editar'}
                onHide={() => setModalActivo(null)}
                stock={stockSeleccionado ?? null}
                onGuardar={() => {
                    cargarStocks();
                    setModalActivo(null);
                }}
            />

            <ModalStockAgregar
                show={modalActivo === 'agregar'}
                onHide={() => setModalActivo(null)}
                instrumentosSinStock={instrumentosSinStock}
                onGuardar={() => {
                    cargarStocks();
                    setModalActivo(null);
                }}
            />
        </PageContainer>
    );
};

export default GrillaStock;