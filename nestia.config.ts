import { INestiaConfig } from "@nestia/sdk";
 
const config: INestiaConfig = {
    input: "src/**/**.controller.ts",
    swagger: {
        output: "bin/swagger.json",
        security: {
            bearer: {
                type: "apiKey",
                name: "Authorization",
                in: "header",
            },
        },
        servers: [
            {
                url: process.env.SERVER_URL? process.env.SERVER_URL : "http://localhost:8000",   
                description: "Local Server"
            }
        ],
        decompose:true
    }
};
export default config;