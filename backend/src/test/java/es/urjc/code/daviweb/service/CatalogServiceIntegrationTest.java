package es.urjc.code.daviweb.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;

import es.urjc.code.daviweb.TestcontainersConfiguration;
import es.urjc.code.daviweb.model.SalonService;

@SpringBootTest
@ActiveProfiles("test")
@Import(TestcontainersConfiguration.class)
class CatalogServiceIntegrationTest {

    @Autowired
    private CatalogService catalogService;

    @Test
    void findAllReturnsTheFirstPageOfTheSampleServices() {
        Page<SalonService> page = catalogService.findAll(PageRequest.of(0, 2));

        assertThat(page.getContent()).hasSize(2);
        assertThat(page.getTotalElements()).isEqualTo(6);
        assertThat(page.getTotalPages()).isEqualTo(3);
    }

    @Test
    void findAllReturnsTheRemainingServicesOnTheLastPage() {
        Page<SalonService> page = catalogService.findAll(PageRequest.of(1, 4));

        assertThat(page.getContent()).hasSize(2);
        assertThat(page.hasNext()).isFalse();
    }
}
