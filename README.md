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
│ │ │  ├── admin.js
│ │ │  ├── dedication.js
│ │ │  ├── guest.js
│ │ │  ├── idea.js
│ │ │  └── picture.js
│ │ ├── models/
│ │ │  ├── admin.js
│ │ │  ├── dedication.js
│ │ │  ├── guest.js
│ │ │  ├── idea.js
│ │ │  └── picture.js
│ │ └── routes/
│ │ │ ├── admin.js
│ │ │ ├── dedication.js
│ │ │ ├── guest.js
│ │ │ ├── idea.js
│ │ │ └── picture.js
│ ├── config/
│ │ ├── db.js
│ │ ├── guests.csv
│ │ └── loadGuests.js
│ ├── middlewares/
│ │ └──auth.js
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

Dedication (/api/v1/dedication)

| Método | Ruta        | Descripción                | Autenticación |
| ------ | ----------- | -------------------------- | ------------- |
| GET    | `/`         | Obtener las dedicatorias   | ❌            |
| POST   | `/`         | Creación de decicatoria    | ❌            |
| DELETE | `/:id`      | Eliminar cliente por ID    | ❌            |

Invitado (/api/v1/guest)

| Método | Ruta   | Descripción                       | Autenticación  |
| ------ | ------ | --------------------------------- | -------------- |
| GET    | `/`    | Obtener todos los invitados       | ❌             |
| GETBYTOKEN | `/token/:token` | Obtener por token    | ✅             |
| POST   | `/`    | Generar token                     | ❌             |
| POST   | `/Token` | Actualiza datos enviados        | ✅             |

Idea (/api/v1/idea)

| Método | Ruta   | Descripción                       | Autenticación  |
| ------ | ------ | --------------------------------- | -------------- |
| GET    | `/`    | Obtener las ideas                 | ❌             |
| POST   | `/`    | Crear nueva idea                  | ❌             |
| GET    | `/admin` | Obtener ideas enviadas          | ❌             |
| DELETE | `/:id` | Eliminar idea                     | ✅             |

Picture (/api/v1/picture)

| Método | Ruta   | Descripción                       | Autenticación  |
| ------ | ------ | --------------------------------- | -------------- |
| GET    | `/`    | Obtener las imágenes              | ❌             |
| POST   | `/`    | Enviar imagen                     | ❌             |
| DELETE | `/:id` | Eliminar imagen                   | ❌             |


## 🔐 JWT y autenticación
El middleware isAuth protege las rutas que requieren autenticación.
Hay que asegurarse de enviar el token en el header de cada petición protegida: Authorization: Bearer <token>
Para rutas de administrador, usar isAdmin.

## 👩‍💻Autora
Desarrollado por Mónica Sánchez Carrillo

