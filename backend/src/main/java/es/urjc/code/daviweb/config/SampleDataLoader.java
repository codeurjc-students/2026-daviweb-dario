package es.urjc.code.daviweb.config;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import es.urjc.code.daviweb.model.SalonService;
import es.urjc.code.daviweb.repository.SalonServiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class SampleDataLoader implements CommandLineRunner {

    private final SalonServiceRepository salonServiceRepository;

    @Override
    public void run(String... args) {
        if (salonServiceRepository.count() > 0) {
            return;
        }

        salonServiceRepository.saveAll(List.of(
                new SalonService(null, "Men's haircut", "Classic or modern cut, finished with styling.", new BigDecimal("14.00")),
                new SalonService(null, "Women's haircut", "Wash, cut and blow-dry.", new BigDecimal("22.00")),
                new SalonService(null, "Beard trim", "Beard shaping and hot towel finish.", new BigDecimal("8.00")),
                new SalonService(null, "Hair colour", "Full colour with nourishing treatment.", new BigDecimal("45.00")),
                new SalonService(null, "Highlights", "Foil highlights adapted to your tone.", new BigDecimal("60.00")),
                new SalonService(null, "Keratin treatment", "Smoothing treatment for frizzy hair.", new BigDecimal("80.00"))));

        log.info("Loaded {} sample services", salonServiceRepository.count());
    }
}
