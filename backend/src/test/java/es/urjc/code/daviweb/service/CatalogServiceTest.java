package es.urjc.code.daviweb.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import es.urjc.code.daviweb.model.SalonService;
import es.urjc.code.daviweb.repository.SalonServiceRepository;

@ExtendWith(MockitoExtension.class)
class CatalogServiceTest {

    @Mock
    private SalonServiceRepository salonServiceRepository;

    @InjectMocks
    private CatalogService catalogService;

    @Test
    void findAllReturnsTheRequestedPageFromTheRepository() {
        Pageable pageable = PageRequest.of(0, 2);
        List<SalonService> services = List.of(
                new SalonService(1L, "Men's haircut", "Classic cut.", new BigDecimal("14.00")),
                new SalonService(2L, "Beard trim", "Beard shaping.", new BigDecimal("8.00")));
        when(salonServiceRepository.findAll(pageable)).thenReturn(new PageImpl<>(services, pageable, 6));

        Page<SalonService> result = catalogService.findAll(pageable);

        assertThat(result.getContent()).containsExactlyElementsOf(services);
        assertThat(result.getTotalElements()).isEqualTo(6);
        verify(salonServiceRepository).findAll(pageable);
    }

    @Test
    void findAllReturnsAnEmptyPageWhenThereAreNoServices() {
        Pageable pageable = PageRequest.of(0, 10);
        when(salonServiceRepository.findAll(pageable)).thenReturn(Page.empty(pageable));

        Page<SalonService> result = catalogService.findAll(pageable);

        assertThat(result.getContent()).isEmpty();
    }
}
