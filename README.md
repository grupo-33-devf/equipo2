---

# **Insight Master**  
### *Plataforma de Creación y Gestión de Encuestas*

---

## **Descripción**

**Insight Master** es una aplicación web integral diseñada para facilitar la creación, publicación y análisis de encuestas. Ofrece herramientas intuitivas para diseñar encuestas personalizadas, compartirlas fácilmente a través de URLs o códigos QR y analizar los resultados en tiempo real.

---

## **Funcionalidades Principales**

- **Creación de encuestas**: Diseña encuestas con diferentes tipos de preguntas (opción múltiple, abiertas, etc.).  
- **Gestión de usuarios**: Registro y autenticación de usuarios para administrar sus encuestas.  
- **Compartir encuestas**: Genera URLs únicas y códigos QR para una distribución rápida y efectiva.  
- **Análisis de resultados**: Visualización interactiva de resultados con *Chart.js* y *D3.js*.  
- **Autenticación con OAuth** *(futuro)*: Integración de autenticación con redes sociales.  

---

## **Arquitectura**

### **Frontend**  
- Desarrollado y desplegado en: [https://insight-master-frontend.onrender.com](https://insight-master-frontend.onrender.com)  

### **Backend**  
- Desarrollado y desplegado en: [https://insight-master-server.onrender.com](https://insight-master-server.onrender.com)  

---

## **Rutas del Backend**

El backend incluye rutas para gestionar usuarios, encuestas, preguntas y respuestas:  

- **`/api/users`**: Registro, inicio de sesión y autenticación.  
- **`/api/encuestas`**: Creación, consulta, modificación, eliminación de encuestas, generación de URLs cortas y obtención de resultados.  
- **`/api/preguntas`**: Gestión de preguntas dentro de encuestas.  
- **`/api/respuestas`**: Gestión de respuestas a las preguntas.  
- **`/api/urls`**: Generación de URLs cortas y códigos QR para compartir encuestas.  

---

## **Tecnologías Utilizadas**

### **Frontend**  
- *axios*, *bootstrap*, *bootstrap-icons*, *react*, *react-dom*, *react-router-dom*, *standard*  

### **Backend**  
- *bcrypt*, *cors*, *dotenv*, *express*, *jsonwebtoken*, *mongoose*, *qrcode*, *tinyurl*  

### **Base de Datos**  
- *MongoDB*  

### **Gráficos y Visualización**  
- *Chart.js*, *D3.js*  

### **Generación de Códigos QR**  
- *qrcode*  

---

## **Instalación y Ejecución**

1. **Clonar el repositorio**:  
   ```bash
   git clone https://github.com/grupo-33-devf/equipo2
   ```  

2. **Instalar dependencias**:  
   ```bash
   cd equipo2
   npm install
   ```  

3. **Configurar variables de entorno**:  
   - Crear un archivo `.env` y configurar las variables necesarias para la conexión a la base de datos y otras configuraciones.  

4. **Iniciar el servidor**:  
   ```bash
   npm start
   ```  

---

## **Licencia**

Este proyecto está bajo la licencia **MIT**.  

---

## **Contacto**

- **José Mario Rivera Carranza**  
  - 📧: imt_josecarranza@outlook.com  
