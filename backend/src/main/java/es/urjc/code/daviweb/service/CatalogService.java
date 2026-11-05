package es.urjc.code.daviweb.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import es.urjc.code.daviweb.model.SalonService;
import es.urjc.code.daviweb.repository.SalonServiceRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CatalogService {

    private final SalonServiceRepository salonServiceRepository;

    public Page<SalonService> findAll(Pageable pageable) {
        return salonServiceRepository.findAll(pageable);
    }
}
