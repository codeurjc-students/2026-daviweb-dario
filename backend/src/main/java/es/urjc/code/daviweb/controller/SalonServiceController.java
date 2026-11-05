package es.urjc.code.daviweb.controller;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.urjc.code.daviweb.model.SalonService;
import es.urjc.code.daviweb.service.CatalogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/services")
@RequiredArgsConstructor
@Tag(name = "Services", description = "Catalog of services offered by the salon")
public class SalonServiceController {

    private final CatalogService catalogService;

    @GetMapping
    @Operation(summary = "List services", description = "Returns a page of services. Use the page and size query parameters to paginate; the default page size is 10.")
    public PagedModel<SalonService> findAll(@ParameterObject @PageableDefault(size = 10) Pageable pageable) {
        return new PagedModel<>(catalogService.findAll(pageable));
    }
}
