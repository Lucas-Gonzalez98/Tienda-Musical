import React from "react";
import { Table, Button, Badge } from "react-bootstrap";
import styled from "styled-components";

// Styled Components
const TableContainer = styled.div`
  background: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin: 2rem auto;
  padding: 1rem;
  max-width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTable = styled(Table)`
  margin-bottom: 0;
  color: #212529;

  thead {
    background-color: #f8f9fa;

    th {
      font-weight: 600;
      text-transform: uppercase;
      text-align: center;
      font-size: 0.9rem;
      letter-spacing: 0.5px;
      border-bottom: 2px solid #dee2e6;
      padding: 1rem;
      color: #343a40;
    }
  }

  tbody {
    tr {
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #f1f3f5;
      }

      &.eliminated {
        background-color: #f8d7da;
        color: #721c24;
      }
    }

    td {
      padding: 0.85rem 1rem;
      text-align: center;
      vertical-align: middle;
      border-top: 1px solid #dee2e6;
    }
  }
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
`;

const ActionButton = styled(Button)`
  border: none;
  border-radius: 8px;
  padding: 0.45rem 0.75rem;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.375rem;

  &.btn-view {
    background-color: #0d6efd;
    color: white;

    &:hover {
      background-color: #0b5ed7;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(13, 110, 253, 0.2);
    }
  }

  &.btn-edit {
    background-color: #ffc107;
    color: #212529;

    &:hover {
      background-color: #e0a800;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 193, 7, 0.3);
    }
  }

  &.btn-delete {
    background-color: #dc3545;
    color: white;

    &:hover {
      background-color: #c82333;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
    }
  }

  &.btn-restore {
    background-color: #28a745;
    color: white;

    &:hover {
      background-color: #218838;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const StatusBadge = styled(Badge)`
  font-size: 0.75rem;
  padding: 0.35rem 0.7rem;
  border-radius: 20px;
  font-weight: 500;

  &.status-active {
    background-color: #28a745;
    color: white;
  }

  &.status-inactive {
    background-color: #dc3545;
    color: white;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #6c757d;

  i {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.4;
  }

  p {
    font-size: 1.1rem;
    margin: 0;
  }
`;


// Interfaces
interface AccionesBotones {
  onVerDetalle?: (item: Record<string, any>) => void;
  onEditar?: (item: Record<string, any>) => void;
  onEliminar?: (item: Record<string, any>) => void;
  onDarDeAlta?: (item: Record<string, any>) => void;
}
interface Columna {
  key: string;
  titulo: string;
  render?: (item: Record<string, any>) => React.ReactNode;
}

interface TablaDatosProps {
  columnas: Columna[];
  datos: Record<string, any>[];
  acciones?: AccionesBotones;
  campoEliminado?: string; // nombre del campo que indica si está eliminado
  mostrarEstado?: boolean; // mostrar badge de estado
  textoVacio?: string; // texto cuando no hay datos
  iconoVacio?: string; // icono cuando no hay datos
}

const TablaDatos: React.FC<TablaDatosProps> = ({
  columnas,
  datos,
  acciones,
  campoEliminado = 'eliminado',
  mostrarEstado = true,
  textoVacio = 'No hay datos disponibles',
  iconoVacio = 'fas fa-inbox'
}) => {
  const formatearValor = (valor: any): string => {
    if (valor === null || valor === undefined) return '-';
    if (typeof valor === 'boolean') return valor ? 'Sí' : 'No';
    if (typeof valor === 'number') return valor.toLocaleString();
    if (valor instanceof Date) return valor.toLocaleDateString();
    return String(valor);
  };

  const tieneAcciones = acciones && (
    acciones.onVerDetalle ||
    acciones.onEditar ||
    acciones.onEliminar ||
    acciones.onDarDeAlta
  );

  if (datos.length === 0) {
    return (
      <TableContainer>
        <EmptyState>
          <i className={iconoVacio}></i>
          <p>{textoVacio}</p>
        </EmptyState>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <StyledTable responsive hover>
        <thead>
          <tr>
            {columnas.map((col) => (
              <th key={col.key}>{col.titulo}</th>
            ))}
            {mostrarEstado && <th>Estado</th>}
            {tieneAcciones && <th style={{ textAlign: 'center' }}>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {datos.length === 0 ? (
            <tr>
              <td colSpan={columnas.length + (mostrarEstado ? 1 : 0) + (tieneAcciones ? 1 : 0)} style={{ textAlign: "center", padding: "2rem" }}>
                <i className={`${iconoVacio} mb-2`} style={{ fontSize: "2rem", opacity: 0.5 }}></i>
                <p>{textoVacio}</p>
              </td>
            </tr>
          ) : (
            datos.map((fila, index) => {
              const estaEliminado = fila[campoEliminado] === true;

              return (
                <tr
                  key={index}
                  className={estaEliminado ? 'eliminated' : ''}
                >
                  {columnas.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(fila) : formatearValor(fila[col.key])}
                    </td>
                  ))}

                  {mostrarEstado && (
                    <td>
                      <StatusBadge
                        className={estaEliminado ? 'status-inactive' : 'status-active'}
                      >
                        <i className={`fas ${estaEliminado ? 'fa-times' : 'fa-check'} me-1`}></i>
                        {estaEliminado ? 'Inactivo' : 'Activo'}
                      </StatusBadge>
                    </td>
                  )}

                  {tieneAcciones && (
                    <td>
                      <ActionButtonGroup>
                        {acciones?.onVerDetalle && (
                          <ActionButton
                            size="sm"
                            className="btn-view"
                            onClick={() => acciones.onVerDetalle!(fila)}
                            title="Ver detalles"
                          >
                            <i className="fas fa-eye"></i>
                            Ver
                          </ActionButton>
                        )}

                        {acciones?.onEditar && !estaEliminado && (
                          <ActionButton
                            size="sm"
                            className="btn-edit"
                            onClick={() => acciones.onEditar!(fila)}
                            title="Editar"
                          >
                            <i className="fas fa-edit"></i>
                            Editar
                          </ActionButton>
                        )}

                        {acciones?.onEliminar && !estaEliminado && (
                          <ActionButton
                            size="sm"
                            className="btn-delete"
                            onClick={() => acciones.onEliminar!(fila)}
                            title="Eliminar"
                          >
                            <i className="fas fa-trash"></i>
                            Eliminar
                          </ActionButton>
                        )}

                        {acciones?.onDarDeAlta && estaEliminado && (
                          <ActionButton
                            size="sm"
                            className="btn-restore"
                            onClick={() => acciones.onDarDeAlta!(fila)}
                            title="Dar de alta"
                          >
                            <i className="fas fa-undo"></i>
                            Activar
                          </ActionButton>
                        )}
                      </ActionButtonGroup>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default TablaDatos;