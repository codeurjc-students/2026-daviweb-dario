package es.urjc.code.daviweb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI daviwebOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("DaviWeb API")
                        .description("REST API of DaviWeb, a booking and management app for hair salons.")
                        .version("v1"))
                .addServersItem(new Server().url("/").description("Same origin as the API"));
    }
}
