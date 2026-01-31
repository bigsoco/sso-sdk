# @bigsoco/sso-sdk

SDK TypeScript para registrar recursos, acciones y gestionar sesiones/autenticación de aplicaciones con el backend SSO de EmpireSoft.

## Instalación

Instalar desde la línea de comandos:

```sh
$ npm install @bigsoco/sso-sdk@0.1.4
```

O agregar en tu `package.json`:

```json
"@bigsoco/sso-sdk": "0.1.4"
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

## Publicación y releases (npm production-ready)

Este SDK está preparado para publicación profesional en npm:

- Solo se publica el código compilado (`dist`), nunca el TypeScript fuente.
- El pipeline de CI publica automáticamente al crear un tag `v*` en el repositorio.
- El secret de autenticación debe llamarse `NPM_TOKEN` y ser un Automation Token de npm.
- El lockfile (`package-lock.json`) debe estar versionado.

### Proceso de release

1. Cambia la versión:

```bash
npm version patch # o minor/major
```

2. Haz push con tags:

```bash
git push --follow-tags
```

3. El pipeline compilará y publicará automáticamente a npm.

El paquete se publica bajo el scope organizacional: `@tu-org/sso-sdk`.

---

Próximamente: gestión de permisos, usuarios, integración avanzada.
