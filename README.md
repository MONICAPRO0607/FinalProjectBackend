En este proyecto se simula un sistema de gestión de pedidos y clientes en una página de una empresa de rotulación, vinilado y diseño.
Está dividido en dos partes:
- Backend: donde se utilizan las siguientes tecnologías: Node.js, Express.js, MongoDB + Mongoose, dotenv, bcrypt, cors, nodemon y jsonwebtoken.
- Frontend: realizado con HTML, CSS y JavaScript Vanilla.

Permite a clientes registrarse, iniciar sesión y gestionar sus pedidos de forma segura mediante autenticación JWT.


## 📁 Estructura del proyecto

rotulos-fullstack-back/
│
├── src/
│ ├── api/
│ │ ├── controllers/
│ │ │ ├── clientes.js
│ │ │ └── pedidos.js
│ │ ├── models/
│ │ │ ├── clientes.js
│ │ │ └── pedidos.js
│ │ └── routes/
│ │ ├── clientes.js
│ │ └── pedidos.js
│ ├── config/
│ │ └── db.js
│ ├── middlewares/
│ │ └── auth.js
│ └── utils/
│ └── jwt.js

  ├── .env
  ├── .gitignore
  ├── index.js
  ├── package-lock.json
  ├── package.json
  └── README.md


## 🔧 Instalación y configuración

1. **Clonar el repositorio**

git clone https://github.com/tuusuario/rotulos-fullstack-back.git
cd rotulos-fullstack-back

2. **Instalar dependencias**
npm install

3. **Configurar variables de entorno**
DB_URL=mongodb+srv://<usuario>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=miclaveultrasecreta

4. **Iniciar el servidor**
npm run dev
Servidor corriendo en: http://localhost:3000

## 🧩 Endpoints disponibles

🔐 Clientes (/api/v1/clientes)

| Método | Ruta        | Descripción                | Autenticación |
| ------ | ----------- | -------------------------- | ------------- |
| POST   | `/register` | Registro de nuevo cliente  | ❌             |
| POST   | `/login`    | Login y obtención de token | ❌             |
| GET    | `/`         | Obtener todos los clientes | ❌             |
| DELETE | `/:id`      | Eliminar cliente por ID    | ❌             |

📦 Pedidos (/api/v1/pedidos)

| Método | Ruta   | Descripción                       | Autenticación  |
| ------ | ------ | --------------------------------- | -------------- |
| GET    | `/`    | Obtener todos los pedidos         | ❌              |
| POST   | `/`    | Crear nuevo pedido                | ✅ Bearer Token |
| GET    | `/:id` | Obtener pedidos por cliente ID    | ❌              |
| DELETE | `/:id` | Eliminar pedido de cliente por ID | ✅ Bearer Token |

## 🧪 Ejemplo de uso con Insomnia
1. Registro de cliente: POST http://localhost:3000/api/v1/clientes/register
2. Login y obtención de token: POST http://localhost:3000/api/v1/clientes/login
3. Crear un nuevo pedido (autenticado): POST http://localhost:3000/api/v1/pedidos

## 🔐 JWT y autenticación
El middleware isAuth protege las rutas que requieren autenticación.
Hay que asegurarse de enviar el token en el header de cada petición protegida: Authorization: Bearer <token>

## 👩‍💻Autora
Desarrollado por Mónica Sánchez Carrillo

