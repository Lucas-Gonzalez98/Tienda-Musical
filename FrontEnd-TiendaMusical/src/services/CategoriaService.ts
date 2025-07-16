import axios from "axios";
import type Categoria from "../models/Categoria";

const API_URL = "http://localhost:8080/api/categoria";

class CategoriaService {
    async getAll(): Promise<Categoria[]> {
        try {
            const { data } = await axios.get<Categoria[]>(API_URL);
            return data;
        } catch (error) {
            console.error("Error al obtener categorías", error);
            throw error;
        }
    }

    async getById(id: number): Promise<Categoria> {
        try {
            const { data } = await axios.get<Categoria>(`${API_URL}/${id}`);
            return data;
        } catch (error) {
            console.error("Error al obtener la categoría por ID", error);
            throw error;
        }
    }

    async getByDenominacion(denominacion: string): Promise<Categoria[]> {
        try {
            const { data } = await axios.get<Categoria[]>(`${API_URL}/buscar`, {
                params: { denominacion }
            });
            return data;
        } catch (error) {
            console.error("Error al obtener la categoría por denominación", error);
            throw error;
        }
    }

    async create(categoria: Partial<Categoria>): Promise<Categoria> {
        try {
            const { data } = await axios.post<Categoria>(API_URL, categoria);
            return data;
        } catch (error) {
            console.error("Error al crear la categoría", error);
            throw error;
        }
    }

    async update(id: number, categoria: Categoria): Promise<Categoria> {
        try {
            const { data } = await axios.put<Categoria>(`${API_URL}/${id}`, categoria);
            return data;
        } catch (error) {
            console.error("Error al actualizar la categoría", error);
            throw error;
        }
    }

    async changeEliminado(id: number): Promise<void> {
        try {
            await axios.put(`${API_URL}/darAlta/${id}`);
        } catch (error) {
            console.error("Error al cambiar el estado eliminado de la categoría", error);
            throw error;
        }
    }
}

export default new CategoriaService();
