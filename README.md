# App para la boda

En este proyecto se realiza una aplicación para que una amiga la pueda utilizar antes, durante y después de la boda, facilitando la organización, comunicación con invitados/as y conjunto de recuerdos de todo el proceso.
Está dividido en dos partes:

- **Backend:** Node.js, Express.js, MongoDB + Mongoose, dotenv, bcrypt, cors, nodemon y jsonwebtoken.
- **Frontend:** HTML, CSS y JavaScript Vanilla.

## 📁 Estructura del proyecto

Project13Backend/
│
├── src/
│ ├── api/
│ │ ├── controllers/
│ │ │  ├── authController.js
│ │ │  ├── dedicationController.js
│ │ │  ├── pictureController.js
│ │ │  ├── ideaController.js
│ │ │  └── guestController.js
│ │ ├── models/
│ │ │  ├── Novio.js
│ │ │  ├── Dedication.js
│ │ │  ├── Picture.js
│ │ │  ├── Idea.js
│ │ │  └── Guest.js
│ │ └── routes/
│ │ │ ├── auth.js
│ │ │ ├── dedication.js
│ │ │ ├── picture.js
│ │ │ ├── idea.js
│ │ │ └── guest.js
│ ├── config/
│ │ ├── db.js
│ │ └── guests.csv
│ ├── middlewares/
│ │ ├── auth.js
│ │ └── admin.js
│ ├── seeds/
│ │ └── seed.js
│ └── utils/
│ │ ├── cloudinary.js
│ │ └── jwt.js
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
├── README.md
└── vercel.json


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

📦 Productos (/api/v1/products)

| Método | Ruta   | Descripción                       | Autenticación  |
| ------ | ------ | --------------------------------- | -------------- |
| GET    | `/`    | Obtener todos los productos       | ❌              |
| POST   | `/`    | Crear nuevo producto              | ✅ Admin        |
| GET    | `/:id` | Obtener producto por ID           | ❌              |
| DELETE | `/:id` | Eliminar producto por ID          | ✅ Admin        |

## 🧪 Ejemplo de uso con Insomnia
1. Registro de cliente: POST https://project10-navy.vercel.app/api/v1/clientes/register
2. Login y obtención de token: POST https://project10-navy.vercel.app/api/v1/clientes/login
3. Crear un nuevo pedido (autenticado): POST https://project10-navy.vercel.app/api/v1/pedidos

## 🔐 JWT y autenticación
El middleware isAuth protege las rutas que requieren autenticación.
Hay que asegurarse de enviar el token en el header de cada petición protegida: Authorization: Bearer <token>
Para rutas de administrador, usar isAdmin.

## 👩‍💻Autora
Desarrollado por Mónica Sánchez Carrillo

