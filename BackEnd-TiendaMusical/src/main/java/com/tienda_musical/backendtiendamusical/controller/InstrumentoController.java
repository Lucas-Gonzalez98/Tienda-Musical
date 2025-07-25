package com.tienda_musical.backendtiendamusical.controller;

import com.tienda_musical.backendtiendamusical.dto.InstrumentoDTO;
import com.tienda_musical.backendtiendamusical.mapper.InstrumentoMapper;
import com.tienda_musical.backendtiendamusical.model.Instrumento;
import com.tienda_musical.backendtiendamusical.service.InstrumentoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/instrumento")
@CrossOrigin(origins = "*")
@Tag(name = "Instrumento", description = "Operaciones relacionadas con Instrumentos")
public class InstrumentoController extends MasterControllerImpl<Instrumento, InstrumentoDTO, Long> implements MasterController<InstrumentoDTO, Long> {

    private static final Logger logger = LoggerFactory.getLogger(InstrumentoController.class);

    private final InstrumentoService instrumentoService;
    private final InstrumentoMapper instrumentoMapper;

    @Autowired
    public InstrumentoController(InstrumentoService instrumentoService, InstrumentoMapper instrumentoMapper) {
        super(instrumentoService);
        this.instrumentoMapper = instrumentoMapper;
        this.instrumentoService = instrumentoService;
    }

    @Override
    protected Instrumento toEntity(InstrumentoDTO dto) {
        return instrumentoMapper.toEntity(dto);
    }

    @Override
    protected InstrumentoDTO toDTO(Instrumento entity) {
        return instrumentoMapper.toDTO(entity);
    }

    @Operation(summary = "Filtrar instrumentos", description = "Filtra instrumentos por distintos criterios opcionales.")
    @GetMapping("/filtrar")
    public ResponseEntity<Page<InstrumentoDTO>> filtrarInstrumentos(
            @Parameter(description = "ID del instrumento") @RequestParam(required = false) Long idInstrumento,
            @Parameter(description = "Nombre del instrumento") @RequestParam(required = false) String instrumento,
            @Parameter(description = "Precio mínimo") @RequestParam(required = false) Double precioMin,
            @Parameter(description = "Precio máximo") @RequestParam(required = false) Double precioMax,
            @Parameter(description = "¿Eliminado?") @RequestParam(required = false) Boolean eliminado,
            @Parameter(description = "ID de la categoría") @RequestParam(required = false) Long idCategoria,
            Pageable pageable
    ) {
        Page<Instrumento> instrumentos = instrumentoService.buscarInstrumentoFiltros(
                idInstrumento, instrumento, precioMin, precioMax, eliminado, idCategoria, pageable
        );
        Page<InstrumentoDTO> resultado = instrumentos.map(instrumentoMapper::toDTO);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/sin-stock")
    public ResponseEntity<List<InstrumentoDTO>> getInstrumentosSinStock() {
        List<Instrumento> sinStock = instrumentoService.obtenerInstrumentosSinStock();
        List<InstrumentoDTO> sinStockDTOs = instrumentoMapper.toDTOsList(sinStock);
        return ResponseEntity.ok(sinStockDTOs);
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // Ruta absoluta al directorio del frontend
            String frontendPath = "C:\\UTN\\4to Semestre\\Tienda-Musical\\FrontEnd-TiendaMusical\\public\\img\\";
            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(frontendPath + filename);

            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            return ResponseEntity.ok(filename);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir imagen");
        }
    }
}
