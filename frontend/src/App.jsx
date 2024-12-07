import RoutesIndex from '@/Routes/RoutesIndex'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <RoutesIndex />
      </BrowserRouter>
    </>
  )
}

export default App
