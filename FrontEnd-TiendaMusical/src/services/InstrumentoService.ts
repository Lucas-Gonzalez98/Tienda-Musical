import axios from "axios";
import type Instrumento from "../models/Instrumento";

const API_URL = "http://localhost:8080/api/instrumento";

class InstrumentoService {
    // Trae todos los instrumentos, eliminados y no eliminados
    async getAll(): Promise<Instrumento[]> {
        try {
            const { data } = await axios.get<Instrumento[]>(API_URL);
            return data;
        } catch (error) {
            console.error("Error al obtener todos los instrumentos", error);
            throw error;
        }
    }

    // Trae solo instrumentos no eliminados (activos)
    async getActivos(): Promise<Instrumento[]> {
        try {
            const { data } = await axios.get<Instrumento[]>(`${API_URL}/noEliminado`);
            return data;
        } catch (error) {
            console.error("Error al obtener instrumentos activos", error);
            throw error;
        }
    }

    async getById(id: number): Promise<Instrumento> {
        try {
            const { data } = await axios.get<Instrumento>(`${API_URL}/${id}`);
            return data;
        } catch (error) {
            console.error("Error al obtener el instrumento por ID", error);
            throw error;
        }
    }

    async create(instrumento: Partial<Instrumento>): Promise<Instrumento> {
        try {
            const { data } = await axios.post<Instrumento>(API_URL, instrumento);
            return data;
        } catch (error) {
            console.error("Error al crear instrumento", error);
            throw error;
        }
    }

    async update(id: number, instrumento: Instrumento): Promise<Instrumento> {
        try {
            const { data } = await axios.put<Instrumento>(`${API_URL}/${id}`, instrumento);
            return data;
        } catch (error) {
            console.error("Error al actualizar instrumento", error);
            throw error;
        }
    }

    // Reactiva (da de alta) un instrumento lógico
    async changeEliminado(id: number): Promise<void> {
        try {
            await axios.put(`${API_URL}/darAlta/${id}`);
        } catch (error) {
            console.error("Error al reactivar el instrumento", error);
            throw error;
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (error) {
            console.error("Error al eliminar el instrumento", error);
            throw error;
        }
    }
}

export default new InstrumentoService();
