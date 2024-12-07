import RoutesIndex from '../Routes/RoutesIndex'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <h1>Encuestas</h1>
        <RoutesIndex />
      </BrowserRouter>
    </>
  )
}

export default App
