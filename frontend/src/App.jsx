import RoutesIndex from './Routes/RoutesIndex';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { AuthProvider } from './Context/AuthContext'; // Importa el AuthProvider
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Header />
      <main>
        <RoutesIndex />
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
