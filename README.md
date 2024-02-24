## NextAuth.js y Nest.js: Inicio Rápido de autenticación
Este repositorio es una base para comenzar un proyecto cliente/servidor simple con autenticación por proveedores de servicio (por ahora, solo Google) utilizando NextAuth.js, Next.js 14 y Nest.js. En este proyecto, se implementa el intercambio de tokens (token exchange) para aprovechar el token proporcionado por el proveedor de autenticación y generar un nuevo token firmado por el servidor. Además, el proyecto también implementa la capacidad de actualizar el token (refresh token).

### Tecnologías Utilizadas
- NextAuth.js - Framework de autenticación para Next.js.
- Next.js - Framework de React para aplicaciones web.
- Nest.js - Framework de Node.js para la construcción de aplicaciones eficientes, confiables y escalables en el lado del servidor.
### Configuración carpeta "Client"
Para ejecutar este proyecto localmente, sigue estos pasos:

- Instala las dependencias de la carpeta "client" utilizando el comando npm install.
- [Configura las credenciales de autenticación de google ](https://next-auth.js.org/providers/google)
- crea un archivo .env en la raiz de la carpeta "client" y configura las variables de entorno: "NEXTAUTH_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET" y "API_URL"(http://localhost:8000).
- Corra "npm run dev"

### Configuración carpeta "Server"
Para ejecutar este proyecto localmente, sigue estos pasos:

- Instala las dependencias de la carpeta "server" utilizando el comando npm install.
- Crea un archivo .env en la raiz de la carpeta "server" y configura las variables de entorno: "GOOGLE_CLIENT_ID", "JWT_SECRET_KEY", "JWT_REFRESH_TOKEN_KEY" (Para estas 2 últimas variables, procure añadir utilizar firma de certificado (CSR), ya que serán las firmas del token)
- Corra "npm run start"

### Contribución
¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto o agregar nuevas características, no dudes en abrir un nuevo problema o enviar una solicitud de extracción.
