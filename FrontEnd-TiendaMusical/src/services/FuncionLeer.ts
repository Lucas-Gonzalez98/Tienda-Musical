import Instrumento from "../models/Instrumento";

export async function leerInstrumentos(): Promise<Instrumento[]> {
    const response = await fetch("/instrumentos.json");
    const data = await response.json();
    return data.instrumentos;
}

