import { BrowserRouter,Routes,Route } from "react-router-dom"
import LoginScreen from "./screen/LoginScreen"
import RegisterScreen from "./screen/RegisterScreen"
import HomeScreen from "./screen/HomeScreen"
import Payment from "./Components/Payment"
import Tempredux from "./Components/tempredux"


const App = () => {
  return (
    <BrowserRouter>

      <Routes>
          <Route path="/tempredux"  element={<Tempredux/> } />
          <Route path="/login"  element={<LoginScreen/> } />
          <Route path="/register"  element={<RegisterScreen/> } />

          <Route path="/" element = {<HomeScreen/>}>
            <Route path="/pay" element={<Payment/>} />
          </Route>

      </Routes>
    
    </BrowserRouter>
  )
}

export default App