import { BrowserRouter } from 'react-router-dom'
import RoutesIndex from './Routes/RoutesIndex'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import './App.css'

function App() {
  return (
    <div id="root">
      <BrowserRouter>
        <Header />
        <main>
          <RoutesIndex />
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
