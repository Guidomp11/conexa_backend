# Conexa Back-end app - Guido Martin Ponce

## Comandos
Para correr de forma local: `npm run dev`. Este comando genera una variable de entorno en modo development lo cual habilita el acceso a todos para realizar peticiones.\
En heroku, se encuentra corriendo: `npm start`. Este comando genera una variable de entorno en modo produccion lo cual permite solamente peticiones provenientes de la app con deploy en [Netlify](https://github.com/facebook/create-react-app)

## Variables de entorno
En caso de querer correr el proyecto de forma local, se debera agregar un archivo .env con las siguientes variables de entorno:\
`MONGO_DB`.\
`JWT`.