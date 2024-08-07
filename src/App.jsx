import './App.scss'
import Menu from './pages/Menu/Menu'
import Eventkey from './pages/Eventkey/Eventkey'
import { Route, Routes, Navigate, useParams } from "react-router-dom"
import NotFound from "./pages/NotFound/NotFound";

const allowedGameIds = ['bike-game', 'chain-game', 'train-game', 'my-clone-game'];

function App() {
  return (
    <div className='main'>
      <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/:gameId" element={<Eventkey />}/>
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  )
}

export default App
