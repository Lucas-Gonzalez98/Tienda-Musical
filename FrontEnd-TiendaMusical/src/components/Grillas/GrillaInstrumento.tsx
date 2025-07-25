// pages/GrillaInstrumentos.tsx
import React, { useEffect, useState } from "react";
import { Button, Alert, Form, Row, Col, Card, Pagination } from "react-bootstrap";
import styled from "styled-components";
import TablaDatos from "../TablaDatos";
import InstrumentoService from "../../services/InstrumentoService";
import ModalInstrumentoDetalle from "../Modales/ModalInstrumentoDetalle";
import Instrumento from "../../models/Instrumento";
import { useNavigate } from "react-router-dom";
import type Categoria from "../../models/Categoria";
import CategoriaService from "../../services/CategoriaService";

// Interfaces
interface FiltrosInstrumento {
    idInstrumento?: number;
    instrumento?: string;
    precioMin?: number;
    precioMax?: number;
    eliminado?: boolean;
    idCategoria?: number;
    page?: number;
    size?: number;
    sort?: string;
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
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
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
`;

const StatValue = styled.div`
    font-size: 2rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 0.5rem;
    &.small-value {
        font-size: 1.2rem;
        font-weight: 600;
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

const ErrorAlert = styled(Alert)`
    background: rgba(220, 53, 69, 0.1);
    border: 1px solid rgba(220, 53, 69, 0.3);
    color: #ffffff;
    border-radius: 12px;
    
    .alert-heading {
        color: #ff6b6b;
        display: flex;
        align-items: center;
        gap: 0.5rem;
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

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    
    .pagination {
        .page-item {
            .page-link {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: #ffffff;
                margin: 0 0.125rem;
                border-radius: 8px;
                
                &:hover {
                    background: rgba(255, 255, 255, 0.2);
                    border-color: #007bff;
                    color: #ffffff;
                }
            }
            
            &.active .page-link {
                background: linear-gradient(135deg, #007bff, #0056b3);
                border-color: #007bff;
                color: #ffffff;
            }
            
            &.disabled .page-link {
                background: rgba(255, 255, 255, 0.05);
                border-color: rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.5);
            }
        }
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

const GrillaInstrumentos: React.FC = () => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState<Instrumento | undefined>(undefined);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);


    // Estados para paginación
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(20);

    // Estados para filtros
    const [filtros, setFiltros] = useState<FiltrosInstrumento>({
        eliminado: false,
        page: 0,
        size: 20,
        sort: "id,asc"
    });

    const navigate = useNavigate();

    const cargarInstrumentos = async () => {
        try {
            // setLoading(true);
            setError(null);

            const filtrosRequest = {
                ...filtros,
                page: currentPage,
                size: pageSize
            };

            const response: Page<Instrumento> = await InstrumentoService.filtrar(filtrosRequest);

            setInstrumentos(response.content);
            setTotalPages(response.totalPages);
            setTotalElements(response.totalElements);
            setCurrentPage(response.number);

        } catch (error) {
            setError("Error al cargar instrumentos. Intenta nuevamente.");
            console.error("Error:", error);
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        cargarInstrumentos();
    }, [filtros, currentPage, pageSize]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await CategoriaService.getAll(); // Asegurate de tener este método en tu service
                setCategorias(data);
            } catch (error) {
                console.error("Error al cargar categorías", error);
            }
        };

        fetchCategorias();
    }, []);

    const handleFiltroChange = (campo: keyof FiltrosInstrumento, valor: any) => {
        setFiltros(prev => ({
            ...prev,
            [campo]: valor,
            page: 0 // Resetear a la primera página cuando cambian los filtros
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

    const columnas = [
        { key: "id", titulo: "ID" },
        { key: "instrumento", titulo: "Instrumento" },
        { key: "marca", titulo: "Marca" },
        { key: "modelo", titulo: "Modelo" },
        { key: "precio", titulo: "Precio" },
        { key: "costoEnvio", titulo: "Envío" },
        { key: "cantidadVendida", titulo: "Vendidos" },
    ];

    const datosTabla = instrumentos.map((item) => ({
        ...item,
        precio: `$${Number(item.precio).toLocaleString("es-AR")}`,
        costoEnvio: item.costoEnvio === 0 ? "Envío Gratis" : `$${item.costoEnvio.toLocaleString("es-AR")}`,
        eliminado: item.eliminado || false
    }));

    const manejarVerDetalle = (item: Record<string, any>) => {
        const instrumento = item as Instrumento;
        setInstrumentoSeleccionado(instrumento);
        setShowModal(true);
    };

    const cerrarModal = () => {
        setShowModal(false);
        setInstrumentoSeleccionado(undefined);
    };

    const manejarEliminar = async (item: Record<string, any>) => {
        const instrumento = item as Instrumento;
        const confirmacion = window.confirm(
            `¿Estás seguro de que quieres eliminar el instrumento "${instrumento.instrumento} ${instrumento.marca} ${instrumento.modelo}"?`
        );

        if (confirmacion) {
            try {
                await InstrumentoService.delete(instrumento.id!);
                await cargarInstrumentos();
                alert('Instrumento eliminado exitosamente');
            } catch (error) {
                alert('Error al eliminar el instrumento');
                console.error('Error al eliminar:', error);
            }
        }
    };

    const manejarDarDeAlta = async (item: Record<string, any>) => {
        const instrumento = item as Instrumento;
        const confirmacion = window.confirm(
            `¿Deseas activar nuevamente el instrumento "${instrumento.instrumento} ${instrumento.marca} ${instrumento.modelo}"?`
        );

        if (confirmacion) {
            try {
                await InstrumentoService.changeEliminado(instrumento.id!);
                await cargarInstrumentos();
                alert('Instrumento activado exitosamente');
            } catch (error) {
                alert('Error al activar el instrumento');
                console.error('Error al activar:', error);
            }
        }
    };

    const handleNuevoInstrumento = () => {
        navigate('/instrumentos/nuevo');
    };

    const handleEditarInstrumento = (id: number) => {
        navigate(`/instrumentos/editar/${id}`);
    };

    const instrumentosActivos = instrumentos.filter(i => !i.eliminado);
    const totalVentas = instrumentos.reduce((total, item) => total + (item.cantidadVendida || 0), 0);
    const instrumentoMasVendido = instrumentosActivos.reduce((max, item) =>
        (item.cantidadVendida || 0) > (max?.cantidadVendida || 0) ? item : max,
        null as Instrumento | null
    );

    const renderPaginacion = () => {
        const items = [];
        const maxVisiblePages = 5;

        // Botón anterior
        items.push(
            <Pagination.Prev
                key="prev"
                disabled={currentPage === 0}
                onClick={() => handlePageChange(currentPage - 1)}
            />
        );

        // Calcular rango de páginas visibles
        let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(0, endPage - maxVisiblePages + 1);
        }

        // Primera página
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

        // Páginas visibles
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

        // Última página
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

        // Botón siguiente
        items.push(
            <Pagination.Next
                key="next"
                disabled={currentPage === totalPages - 1}
                onClick={() => handlePageChange(currentPage + 1)}
            />
        );

        return items;
    };


    if (error) {
        return (
            <PageContainer>
                <ErrorAlert>
                    <div className="alert-heading">
                        <i className="fas fa-exclamation-triangle"></i>
                        Error al cargar datos
                    </div>
                    <p>{error}</p>
                    <hr />
                    <div className="d-flex justify-content-end mb-0">
                        <ActionButton variant="primary" onClick={cargarInstrumentos}>
                            <i className="fas fa-sync-alt"></i>
                            Reintentar
                        </ActionButton>
                    </div>
                </ErrorAlert>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>
                    <i className="fas fa-guitar"></i>
                    Gestión de Instrumentos
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
                                    <Form.Label style={{ color: '#ffffff' }}>ID Instrumento</Form.Label>
                                    <StyledFormControl
                                        type="number"
                                        placeholder="Buscar por ID"
                                        value={filtros.idInstrumento || ''}
                                        onChange={(e) => handleFiltroChange('idInstrumento',
                                            e.target.value ? Number(e.target.value) : undefined)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: '#ffffff' }}>Nombre</Form.Label>
                                    <StyledFormControl
                                        type="text"
                                        placeholder="Buscar por nombre"
                                        value={filtros.instrumento || ''}
                                        onChange={(e) => handleFiltroChange('instrumento',
                                            e.target.value || undefined)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: '#ffffff' }}>Precio Mínimo</Form.Label>
                                    <StyledFormControl
                                        type="number"
                                        placeholder="$ Min"
                                        value={filtros.precioMin || ''}
                                        onChange={(e) => handleFiltroChange('precioMin',
                                            e.target.value ? Number(e.target.value) : undefined)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: '#ffffff' }}>Precio Máximo</Form.Label>
                                    <StyledFormControl
                                        type="number"
                                        placeholder="$ Max"
                                        value={filtros.precioMax || ''}
                                        onChange={(e) => handleFiltroChange('precioMax',
                                            e.target.value ? Number(e.target.value) : undefined)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
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
                                    <Form.Label style={{ color: '#ffffff' }}>Ordenar por</Form.Label>
                                    <CustomSelect
                                        value={filtros.sort || ''}
                                        onChange={(e) => handleFiltroChange('sort', e.target.value)}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.3)',
                                            color: '#ffffff',
                                            borderRadius: '8px'
                                        }}
                                    >
                                        <option value="id,desc">ID (Desc)</option>
                                        <option value="id,asc">ID (Asc)</option>
                                        <option value="instrumento,asc">Nombre (A-Z)</option>
                                        <option value="instrumento,desc">Nombre (Z-A)</option>
                                        <option value="precio,asc">Precio (Menor)</option>
                                        <option value="precio,desc">Precio (Mayor)</option>
                                        <option value="cantidadVendida,desc">Más Vendidos</option>
                                    </CustomSelect>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: '#ffffff' }}>Elementos por página</Form.Label>
                                    <CustomSelect
                                        value={pageSize}
                                        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.3)',
                                            color: '#ffffff',
                                            borderRadius: '8px'
                                        }}
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
                <StatCard>
                    <StatValue>{totalElements}</StatValue>
                    <StatLabel>
                        <i className="fas fa-guitar"></i>
                        Total Encontrados
                    </StatLabel>
                </StatCard>

                <StatCard>
                    <StatValue>{instrumentos.length}</StatValue>
                    <StatLabel>
                        <i className="fas fa-list"></i>
                        En Esta Página
                    </StatLabel>
                </StatCard>

                <StatCard>
                    <StatLabel className="stat-header">
                        <i className="fas fa-star"></i>
                        Más Vendido
                    </StatLabel>
                    <StatValue className="small-value">
                        {instrumentoMasVendido?.instrumento || 'N/A'}
                    </StatValue>
                    <StatLabel className="stat-change">
                        <i className="fas fa-chart-line"></i>
                        {instrumentoMasVendido?.cantidadVendida ?? 0} ventas
                    </StatLabel>
                </StatCard>

                <StatCard>
                    <StatValue>{totalVentas}</StatValue>
                    <StatLabel>
                        <i className="fas fa-chart-line"></i>
                        Total Vendidos
                    </StatLabel>
                </StatCard>
            </StatsContainer>

            <ContentCard>
                <ActionButtonsContainer>
                    <ActionButton
                        variant="primary"
                        onClick={handleNuevoInstrumento}
                    >
                        <i className="fas fa-plus"></i>
                        Agregar Instrumento
                    </ActionButton>
                </ActionButtonsContainer>

                <TablaDatos
                    columnas={columnas}
                    datos={datosTabla}
                    acciones={{
                        onVerDetalle: manejarVerDetalle,
                        onEditar: (item) => handleEditarInstrumento((item as Instrumento).id!),
                        onEliminar: manejarEliminar,
                        onDarDeAlta: manejarDarDeAlta
                    }}
                    campoEliminado="eliminado"
                    mostrarEstado={true}
                    textoVacio="No hay instrumentos que coincidan con los filtros"
                    iconoVacio="fas fa-guitar"
                />

                {totalPages > 1 && (
                    <PaginationContainer>
                        <Pagination>{renderPaginacion()}</Pagination>
                    </PaginationContainer>
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
                        Mostrando {currentPage * pageSize + 1} - {Math.min((currentPage + 1) * pageSize, totalElements)} de {totalElements} instrumentos
                    </span>
                    <span>
                        Página {currentPage + 1} de {totalPages}
                    </span>
                </div>
            </ContentCard>

            <ModalInstrumentoDetalle
                show={showModal}
                onHide={cerrarModal}
                instrumento={instrumentoSeleccionado ?? null}
            />
        </PageContainer>
    );
};

export default GrillaInstrumentos;