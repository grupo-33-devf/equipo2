import './App.css'
import Encuestas from '../Pages/Encuestas'
import Home from '../Pages/Home'
import Loggin from '../Pages/Loggin'
import Signup from '../Pages/Signup'
import MisEncuestas from '../Pages/MisEncuestas'

function App() {

  return (
    <>
      <h1>Encuestas</h1>
      <Home />
      <Encuestas />
      <MisEncuestas />
      <Loggin />
      <Signup />

    </>
  )
}

export default App
