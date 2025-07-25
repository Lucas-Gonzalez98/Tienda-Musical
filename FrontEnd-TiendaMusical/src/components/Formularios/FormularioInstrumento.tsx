import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import type Instrumento from '../../models/Instrumento';
import type Categoria from '../../models/Categoria';
import InstrumentoService from '../../services/InstrumentoService';
import CategoriaService from '../../services/CategoriaService';
import axios from 'axios';

const FormularioContainer = styled(Container)`
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

const BackButton = styled(Button)`
  margin-bottom: 2rem;
  border-radius: 25px;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
  }
`;

const FormCard = styled(Card)`
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

const FormGroup = styled(Form.Group)`
  margin-bottom: 1.5rem;

  label {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      color: #0d6efd;
      font-size: 1.1rem;
    }
  }

  .form-control, .form-select {
    border-radius: 10px;
    border: 2px solid #e9ecef;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      border-color: #0d6efd;
      box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
    }

    &.is-invalid {
      border-color: #dc3545;
    }
  }

  textarea.form-control {
    min-height: 120px;
    resize: vertical;
  }

  .invalid-feedback {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`;

const ImagePreview = styled.div`
  margin-top: 1rem;
  
  .preview-container {
    max-width: 200px;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid #e9ecef;
    
    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      display: block;
    }
  }

  .no-image {
    max-width: 200px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
    border-radius: 10px;
    color: #6c757d;
    font-size: 0.9rem;
    
    i {
      margin-right: 0.5rem;
      font-size: 1.2rem;
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

    &.btn-success {
      background: linear-gradient(135deg, #28a745, #20c997);
      border: none;
      box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
      }
    }

    &.btn-outline-secondary {
      border: 2px solid #6c757d;
      color: #6c757d;
      background: transparent;

      &:hover {
        background: #6c757d;
        border-color: #6c757d;
        transform: translateY(-2px);
      }
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  flex-direction: column;
  gap: 1rem;

  .spinner-border {
    width: 3rem;
    height: 3rem;
    color: #0d6efd;
  }

  p {
    color: #6c757d;
    font-size: 1.1rem;
  }
`;

const FormularioInstrumento: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEdit = !!id;

    const [formData, setFormData] = useState<Instrumento>({
        instrumento: '',
        marca: '',
        modelo: '',
        imagen: '',
        precio: 0,
        costoEnvio: 0,
        cantidadVendida: 0,
        descripcion: '',
        categoria: undefined,
        eliminado: false
    });

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    // Simulación de carga de datos (reemplaza con tus servicios reales)
    useEffect(() => {
        const loadData = async () => {
            try {
                setPageLoading(true);

                // Cargar categorías reales
                const categoriasData = await CategoriaService.getAll();
                setCategorias(categoriasData);

                // Si es edición, cargar datos reales del instrumento
                if (isEdit && id) {
                    const instrumentoData = await InstrumentoService.getById(Number(id));
                    setFormData({
                        ...instrumentoData,
                    });
                }
            } catch (error) {
                console.error('Error cargando datos:', error);
            } finally {
                setPageLoading(false);
            }
        };

        loadData();
    }, [isEdit, id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'categoria') {
            const selectedCategoria = categorias.find(cat => cat.id === parseInt(value));
            setFormData(prev => ({
                ...prev,
                categoria: selectedCategoria
            }));
        } else if (name === 'precio' || name === 'costoEnvio' || name === 'cantidadVendida') {
            setFormData(prev => ({
                ...prev,
                [name]: parseFloat(value) || 0
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }

        // Limpiar error del campo
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.instrumento.trim()) {
            newErrors.instrumento = 'El nombre del instrumento es requerido';
        }

        if (!formData.marca.trim()) {
            newErrors.marca = 'La marca es requerida';
        }

        if (!formData.modelo.trim()) {
            newErrors.modelo = 'El modelo es requerido';
        }

        if (formData.precio === undefined || formData.precio === null) {
            newErrors.precio = 'El precio es requerido';
        } else if (isNaN(Number(formData.precio))) {
            newErrors.precio = 'El precio debe ser un número válido';
        }

        if (!formData.descripcion.trim()) {
            newErrors.descripcion = 'La descripción es requerida';
        }

        if (!formData.categoria) {
            newErrors.categoria = 'La categoría es requerida';
        }

        if (formData.costoEnvio < 0) {
            newErrors.costoEnvio = 'El costo de envío no puede ser negativo';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
            return;
        }

        try {
            setLoading(true);

            if (isEdit && id) {
                await InstrumentoService.update(Number(id), formData);
            } else {
                await InstrumentoService.create(formData);
            }
            
            navigate('/instrumentos', {
                state: {
                    message: isEdit
                        ? 'Instrumento actualizado exitosamente'
                        : 'Instrumento creado exitosamente',
                    type: 'success'
                }
            });
        } catch (error) {
            console.error('Error:', error);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post<string>("http://localhost:8080/api/instrumento/upload-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setFormData(prev => ({ ...prev, imagen: `${response.data}` }));
        } catch (error) {
            console.error("Error al subir imagen:", error);
            alert("No se pudo subir la imagen");
        }
    };

    const handleCancel = () => {
        navigate('/instrumentos');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    if (pageLoading) {
        return (
            <FormularioContainer fluid>
                <Container>
                    <LoadingContainer>
                        <Spinner animation="border" />
                        <p>Cargando formulario...</p>
                    </LoadingContainer>
                </Container>
            </FormularioContainer>
        );
    }

    return (
        <FormularioContainer fluid>
            <Container>
                <BackButton variant="outline-secondary" onClick={handleGoBack}>
                    <i className="fas fa-arrow-left me-2"></i>
                    Volver
                </BackButton>

                <PageHeader>
                    <h1>
                        <i className={`fas ${isEdit ? 'fa-edit' : 'fa-plus-circle'} me-3`}></i>
                        {isEdit ? 'Editar Instrumento' : 'Nuevo Instrumento'}
                    </h1>
                    <div className="underline"></div>
                    <p className="subtitle">
                        {isEdit ? 'Modifica los datos del instrumento' : 'Completa la información del nuevo instrumento'}
                    </p>
                </PageHeader>

                {showAlert && (
                    <Alert variant="danger" className="mb-4">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        Por favor, corrige los errores en el formulario antes de continuar.
                    </Alert>
                )}

                <Row>
                    <Col lg={8} className="mx-auto">
                        <FormCard>
                            <Card.Header>
                                <h3>
                                    <i className="fas fa-guitar me-2"></i>
                                    Información del Instrumento
                                </h3>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Form.Label>
                                                    <i className="fas fa-guitar"></i>
                                                    Nombre del Instrumento
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="instrumento"
                                                    value={formData.instrumento}
                                                    onChange={handleInputChange}
                                                    placeholder="Ej: Guitarra Eléctrica"
                                                    className={errors.instrumento ? 'is-invalid' : ''}
                                                />
                                                {errors.instrumento && (
                                                    <div className="invalid-feedback">{errors.instrumento}</div>
                                                )}
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <FormGroup>
                                                <Form.Label>
                                                    <i className="fas fa-tag"></i>
                                                    Marca
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="marca"
                                                    value={formData.marca}
                                                    onChange={handleInputChange}
                                                    placeholder="Ej: Fender"
                                                    className={errors.marca ? 'is-invalid' : ''}
                                                />
                                                {errors.marca && (
                                                    <div className="invalid-feedback">{errors.marca}</div>
                                                )}
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Form.Label>
                                                    <i className="fas fa-barcode"></i>
                                                    Modelo
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="modelo"
                                                    value={formData.modelo}
                                                    onChange={handleInputChange}
                                                    placeholder="Ej: Stratocaster"
                                                    className={errors.modelo ? 'is-invalid' : ''}
                                                />
                                                {errors.modelo && (
                                                    <div className="invalid-feedback">{errors.modelo}</div>
                                                )}
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <FormGroup>
                                                <Form.Label>
                                                    <i className="fas fa-list"></i>
                                                    Categoría
                                                </Form.Label>
                                                <Form.Select
                                                    name="categoria"
                                                    value={formData.categoria?.id || ''}
                                                    onChange={handleInputChange}
                                                    className={errors.categoria ? 'is-invalid' : ''}
                                                >
                                                    <option value="">Selecciona una categoría</option>
                                                    {categorias.map(categoria => (
                                                        <option key={categoria.id} value={categoria.id}>
                                                            {categoria.denominacion}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                {errors.categoria && (
                                                    <div className="invalid-feedback">{errors.categoria}</div>
                                                )}
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Form.Label>
                                                    <i className="fas fa-dollar-sign"></i>
                                                    Precio
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="precio"
                                                    value={formData.precio}
                                                    onChange={handleInputChange}
                                                    placeholder="Ej: 150000"
                                                    className={errors.precio ? 'is-invalid' : ''}
                                                />
                                                {errors.precio && (
                                                    <div className="invalid-feedback">{errors.precio}</div>
                                                )}
                                            </FormGroup>
                                        </Col>

                                        <Col md={4}>
                                            <FormGroup>
                                                <Form.Label>
                                                    <i className="fas fa-truck"></i>
                                                    Costo de Envío
                                                </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="costoEnvio"
                                                    value={formData.costoEnvio}
                                                    onChange={handleInputChange}
                                                    placeholder="0"
                                                    min="0"
                                                    className={errors.costoEnvio ? 'is-invalid' : ''}
                                                />
                                                {errors.costoEnvio && (
                                                    <div className="invalid-feedback">{errors.costoEnvio}</div>
                                                )}
                                            </FormGroup>
                                        </Col>
                                        {isEdit && (
                                        <Col md={4}>
                                            <FormGroup>
                                                <Form.Label>
                                                    <i className="fas fa-box"></i>
                                                    Cantidad Vendida
                                                </Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="cantidadVendida"
                                                    value={formData.cantidadVendida}
                                                    onChange={handleInputChange}
                                                    placeholder="0"
                                                    min="0"
                                                    className={errors.cantidadVendida ? 'is-invalid' : ''}
                                                />
                                                {errors.cantidadVendida && (
                                                    <div className="invalid-feedback">{errors.cantidadVendida}</div>
                                                )}
                                            </FormGroup>
                                        </Col>
                                        )}
                                    </Row>

                                    <FormGroup>
                                        <Form.Group controlId="formImagen">
                                            <Form.Label>
                                                <i className="fas fa-image me-2"></i>
                                                Imagen del Instrumento
                                            </Form.Label>
                                            <Form.Control type="file" accept="image/*" onChange={handleFileUpload} />
                                        </Form.Group>

                                        <ImagePreview>
                                            {formData.imagen ? (
                                                <div className="preview-container">
                                                    <img
                                                        src={`/img/${formData.imagen}`}
                                                        alt="Vista previa"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="no-image">
                                                    <i className="fas fa-image"></i>
                                                    Sin imagen
                                                </div>
                                            )}
                                        </ImagePreview>
                                    </FormGroup>

                                    <FormGroup>
                                        <Form.Label>
                                            <i className="fas fa-align-left"></i>
                                            Descripción
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="descripcion"
                                            value={formData.descripcion}
                                            onChange={handleInputChange}
                                            placeholder="Describe las características y detalles del instrumento..."
                                            className={errors.descripcion ? 'is-invalid' : ''}
                                        />
                                        {errors.descripcion && (
                                            <div className="invalid-feedback">{errors.descripcion}</div>
                                        )}
                                    </FormGroup>

                                    <ActionButtons>
                                        <Button
                                            variant={isEdit ? 'success' : 'primary'}
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <Spinner animation="border" size="sm" className="me-2" />
                                                    Guardando...
                                                </>
                                            ) : (
                                                <>
                                                    <i className={`fas ${isEdit ? 'fa-save' : 'fa-plus'} me-2`}></i>
                                                    {isEdit ? 'Actualizar' : 'Crear'} Instrumento
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            type="button"
                                            onClick={handleCancel}
                                            disabled={loading}
                                        >
                                            <i className="fas fa-times me-2"></i>
                                            Cancelar
                                        </Button>
                                    </ActionButtons>
                                </Form>
                            </Card.Body>
                        </FormCard>
                    </Col>
                </Row>
            </Container>
        </FormularioContainer>
    );
};

export default FormularioInstrumento;