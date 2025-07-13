import { useEffect, useState } from "react";
import Instrumento from "./models/Instrumento";
import { leerInstrumentos } from "./services/FuncionLeer";
import InstrumentoCard from "./components/InstrumentoCard";

function App() {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  useEffect(() => {
  leerInstrumentos().then(data => {
    setInstrumentos(data);
  });
}, []);

  return (
    <div className="container mt-4 text-center">
      <h1 className="mb-2">Lista de Instrumentos</h1>
      <div
              style={{
                height: "4px",
                width: "80%",
                maxWidth: "500px",
                backgroundColor: "#0d6efd",
                margin: "0 auto 1rem auto",
                borderRadius: "2px",
              }}
            ></div>
      <div className="d-flex flex-wrap justify-content-start">
        {instrumentos.map((inst) => (
          <InstrumentoCard key={inst.id} instrumento={inst} />
        ))}
      </div>
    </div>
  );
}

export default App;