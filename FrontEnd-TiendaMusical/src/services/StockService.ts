import axios from "axios";
import type Stock from "../models/Stock";

const API_URL = "http://localhost:8080/api/stock";

interface FiltrosStock {
    nivelStock?: 'sin_stock' | 'stock_bajo' | 'stock_bueno';
    eliminado?: boolean;
    nombreInstrumento?: string;
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

class StockService {
    async getAll(): Promise<Stock[]> {
        try {
            const { data } = await axios.get<Stock[]>(API_URL);
            return data;
        } catch (error) {
            console.error("Error al obtener todos los Stocks", error);
            throw error;
        }
    }

    // Trae solo Stocks no eliminados (activos)
    async getActivos(): Promise<Stock[]> {
        try {
            const { data } = await axios.get<Stock[]>(`${API_URL}/noEliminado`);
            return data;
        } catch (error) {
            console.error("Error al obtener Stocks activos", error);
            throw error;
        }
    }

    async filtrar(filtros: FiltrosStock): Promise<Page<Stock>> {
        try {
            const params = new URLSearchParams();

            if (filtros.nivelStock) params.append("nivelStock", filtros.nivelStock);
            if (filtros.eliminado !== undefined) params.append("eliminado", filtros.eliminado.toString());
            if (filtros.nombreInstrumento) params.append("nombreInstrumento", filtros.nombreInstrumento);
            if (filtros.idCategoria !== undefined) params.append("idCategoria", filtros.idCategoria.toString());
            if (filtros.page !== undefined) params.append("page", filtros.page.toString());
            if (filtros.size !== undefined) params.append("size", filtros.size.toString());
            if (filtros.sort) params.append("sort", filtros.sort);

            const { data } = await axios.get<Page<Stock>>(`${API_URL}/filtrar?${params.toString()}`);
            return data;
        } catch (error) {
            console.error("Error al filtrar stocks", error);
            throw error;
        }
    }

    async getById(id: number): Promise<Stock> {
        try {
            const { data } = await axios.get<Stock>(`${API_URL}/${id}`);
            return data;
        } catch (error) {
            console.error("Error al obtener el Stock por ID", error);
            throw error;
        }
    }

    async create(stock: Partial<Stock>): Promise<Stock> {
        try {
            const { data } = await axios.post<Stock>(API_URL, stock);
            return data;
        } catch (error) {
            console.error("Error al crear Stock", error);
            throw error;
        }
    }

    async update(id: number, stock: Stock): Promise<Stock> {
        try {
            const { data } = await axios.put<Stock>(`${API_URL}/${id}`, stock);
            return data;
        } catch (error) {
            console.error("Error al actualizar Stock", error);
            throw error;
        }
    }

    // Reactiva (da de alta) un Stock lógico
    async changeEliminado(id: number): Promise<void> {
        try {
            await axios.put(`${API_URL}/darAlta/${id}`);
        } catch (error) {
            console.error("Error al reactivar el Stock", error);
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (error) {
            console.error("Error al eliminar el Stock", error);
            throw error;
        }
    }
}

export default new StockService();
