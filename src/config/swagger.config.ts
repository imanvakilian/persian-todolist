import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export function initSwagger(app: INestApplication) {
    const document = new DocumentBuilder()
    .setTitle("Persian ToDoList")
    .setDescription("the backend section of application")
    .setContact("iman vakilian", "", "imanvakiliangit@gmail.com")
    .addBearerAuth(addBearerAuth(), "Authorization")
    .build();
    const buildDocument = SwaggerModule.createDocument(app, document);
    SwaggerModule.setup("/swagger", app, buildDocument);
}

function addBearerAuth(): SecuritySchemeObject {
    return {
        type: "http",
        bearerFormat: "JWT",
        in: "header",
        scheme: "bearer",
    }
}