Insight Master - Plataforma de Creación y Gestión de Encuestas
Descripción

Insight Master es una aplicación web completa diseñada para facilitar la creación, publicación y análisis de encuestas. Permite a los usuarios crear encuestas personalizadas, compartirlas a través de una URL pública y visualizar los resultados en tiempo real.

Funcionalidades Principales

Creación de encuestas: Diseña encuestas intuitivamente con diferentes tipos de preguntas (opción múltiple, abierta, etc.).
Gestión de usuarios: Permite a los usuarios registrarse y autenticarse para administrar sus encuestas.
Compartir encuestas: Genera URLs únicas para compartir las encuestas y códigos QR para una distribución fácil.
Análisis de resultados: Visualiza los resultados de las encuestas en gráficos interactivos utilizando Chart.js y D3.js.
Autenticación con OAuth: En futuras versiones se implementará la autenticación con redes sociales.
Arquitectura

Frontend: Desarrollado desplegado en https://insight-master-frontend.onrender.com
Backend: Desarrollado desplegado en https://insight-master-server.onrender.com

Rutas del Backend

El backend expone las siguientes rutas para la gestión de usuarios, encuestas, preguntas y respuestas:

/api/users: Maneja el registro, inicio de sesión y autenticación de usuarios.
/api/encuestas: Permite crear, obtener, modificar y eliminar encuestas, así como obtener sus resultados y generar URLs cortas.
/api/preguntas: Permite crear, modificar y eliminar preguntas dentro de una encuesta.
/api/respuestas: Maneja la creación y obtención de respuestas a las preguntas.
/api/urls: Genera URLs cortas para compartir las encuestas y códigos QR.
Tecnologías Utilizadas

Frontend: axios, bootstrap, bootstrap-icons, react, react-dom, react-router-dom, standard
Backend: bcrypt, cors, dotenv, express, jsonwebtoken, mongoose, qrcode, tinyurl
Base de datos: MongoDB
Gráficos: Chart.js, D3.js
Generación de códigos QR: qrcode
Instalación y Ejecución

Clonar el repositorio:
Bash
git clone https://github.com/grupo-33-devf/equipo2
Instalar dependencias:
Bash
cd equipo2
npm install
Configurar variables de entorno:
Crear un archivo .env y configurar las variables de entorno necesarias para la conexión a la base de datos y otras configuraciones.
Iniciar el servidor:
Bash
npm start
 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir nuevas características o mejoras.

Licencia

Este proyecto está bajo la licencia MIT

¡No dudes en contactarme si tienes alguna pregunta!

José Mario Rivera Carranza
imt_josecarranza@outlook.com

¡Espero que este README sea útil!
