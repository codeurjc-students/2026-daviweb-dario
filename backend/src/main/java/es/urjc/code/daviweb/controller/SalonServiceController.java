package es.urjc.code.daviweb.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.urjc.code.daviweb.model.SalonService;
import es.urjc.code.daviweb.service.CatalogService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/services")
@RequiredArgsConstructor
public class SalonServiceController {

    private final CatalogService catalogService;

    @GetMapping
    public PagedModel<SalonService> findAll(@PageableDefault(size = 10) Pageable pageable) {
        return new PagedModel<>(catalogService.findAll(pageable));
    }
}
