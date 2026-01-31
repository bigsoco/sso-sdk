npm install sso-app-sdk

# sso-app-sdk

SDK TypeScript para registrar recursos, acciones y gestionar sesiones/autenticación de aplicaciones con el backend SSO de EmpireSoft.

## Instalación

```
npm install sso-app-sdk
```

## Uso básico: Registro de recursos

```ts
import { SSOClient } from "sso-app-sdk";

const sso = new SSOClient("http://localhost:3000", "TOKEN_DE_AUTENTICACION");

await sso.registerResources("erp", [
  {
    resource: "invoices",
    action: "create",
    category: "billing",
    description: "Crear facturas",
  },
  {
    resource: "invoices",
    action: "read",
    category: "billing",
    description: "Ver facturas",
  },
]);
```

## Uso en backend de aplicaciones: Validación de sesión y autenticación

```ts
import { SSOSessionClient } from "sso-app-sdk";

const ssoSession = new SSOSessionClient({
  baseUrl: "http://localhost:3000",
  appId: "erp",
});

// Validar un session token recibido en cookie o header
const result = await ssoSession.validateSessionToken("SESSION_TOKEN");
if (result.valid) {
  // Acceso permitido, puedes usar result.user y result.tenant
}

// Intercambiar un authorization code por un session token
const tokenResult = await ssoSession.exchangeAuthCode("AUTH_CODE");
if (tokenResult.success) {
  // tokenResult.sessionToken contiene el token de sesión
}
```

## Métodos disponibles

- `registerResources(appId, resources)` — Registrar recursos y acciones de una app
- `validateSessionToken(sessionToken)` — Validar sesión de usuario (backend)
- `exchangeAuthCode(code)` — Intercambiar código de autorización por token de sesión

Próximamente: gestión de permisos, usuarios, integración avanzada.
