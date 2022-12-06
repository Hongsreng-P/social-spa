import { JwtModuleOptions } from "@nestjs/jwt";

export const jwtConfig: JwtModuleOptions = {
    secret: "my-secret",
    signOptions: {expiresIn: '999999999999999'}
}