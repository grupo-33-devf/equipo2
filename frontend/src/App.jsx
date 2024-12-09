import { BrowserRouter } from 'react-router-dom';
import RoutesIndex from './Routes/RoutesIndex'; // Importa las rutas
import Header from './Components/Header/Header'; // Importa el Header global
import './App.css'; // Importa los estilos globales (opcional)
import Footer from './Components/Footer/Footer';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <RoutesIndex />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
