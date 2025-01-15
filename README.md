---

# **Insight Master**  
### *Survey Creation and Management Platform*

---

## **Description**

**Insight Master** is a comprehensive web application designed to simplify the creation, publishing, and analysis of surveys. It offers intuitive tools to design custom surveys, share them easily through URLs or QR codes, and analyze results in real-time.

---

## **Main Features**

- **Survey Creation**: Design surveys with various question types (multiple choice, open-ended, etc.).  
- **User Management**: User registration and authentication to manage their surveys.  
- **Share Surveys**: Generate unique URLs and QR codes for quick and effective distribution.  
- **Results Analysis**: Interactive visualization of results with *Chart.js* and *D3.js*.  
- **OAuth Authentication** *(future)*: Integration with social network authentication.

---

## **Architecture**

### **Frontend**  
- Developed and deployed at: [https://insight-master-frontend.onrender.com](https://insight-master-frontend.onrender.com)  

### **Backend**  
- Developed and deployed at: [https://insight-master-server.onrender.com](https://insight-master-server.onrender.com)  

---

## **Backend Routes**

The backend includes routes to manage users, surveys, questions, and answers:  

- **`/api/users`**: Registration, login, and authentication.  
- **`/api/encuestas`**: Create, retrieve, update, delete surveys, generate short URLs, and obtain results.  
- **`/api/preguntas`**: Manage survey questions.  
- **`/api/respuestas`**: Manage answers to survey questions.  
- **`/api/urls`**: Generate short URLs and QR codes for survey sharing.

---

## **Technologies Used**

### **Frontend**  
- *axios*, *bootstrap*, *bootstrap-icons*, *react*, *react-dom*, *react-router-dom*, *standard*  

### **Backend**  
- *bcrypt*, *cors*, *dotenv*, *express*, *jsonwebtoken*, *mongoose*, *qrcode*, *tinyurl*  

### **Database**  
- *MongoDB*  

### **Charts and Visualization**  
- *Chart.js*, *D3.js*  

### **QR Code Generation**  
- *qrcode*  

---

## **Installation and Execution**

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/grupo-33-devf/equipo2
   ```  

2. **Install dependencies**:  
   ```bash
   cd equipo2
   npm install
   ```  

3. **Configure environment variables**:  
   - Create a `.env` file and set up the necessary variables for database connection and other configurations.  

4. **Start the server**:  
   ```bash
   npm start
   ```  

---

## **License**

This project is licensed under the **MIT License**.  

---

## **Contact**

- **José Mario Rivera Carranza**  
  - 📧: imt_josecarranza@outlook.com
  - [GitHub](https://github.com/JoseMarioCarranza)
  - [WebPage](https://www.ingjosemario.com)
