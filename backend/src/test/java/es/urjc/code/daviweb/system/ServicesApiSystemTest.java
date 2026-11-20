package es.urjc.code.daviweb.system;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import es.urjc.code.daviweb.TestcontainersConfiguration;

import io.restassured.RestAssured;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@Import(TestcontainersConfiguration.class)
public class ServicesApiSystemTest {
    @LocalServerPort
    private int port;

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @Test
    void getServicesReturnsTheFirstPageOfTheSampleServices() {
        given()
                .queryParam("size", 2)
                .when()
                .get("/api/v1/services")
                .then()
                .statusCode(200)
                .body("content", hasSize(2))
                .body("page.totalElements", equalTo(6));
    }

    @Test
    void getServicesReturnsTheDataOfTheFirstSampleService() {
        given()
                .queryParam("size", 1)
                .when()
                .get("/api/v1/services")
                .then()
                .statusCode(200)
                .body("content[0].name", equalTo("Men's haircut"))
                .body("content[0].basePrice", equalTo(14.00f));
    }

}
