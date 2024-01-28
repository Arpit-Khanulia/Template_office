import HomeScreen from './screen/HomeScreen.tsx'
import LoginScreen from './screen/LoginScreen.tsx'
import RegisterScreen from './screen/RegisterScreen.tsx'
import Payment from './Components/Payment.tsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux/store.ts'

const App = () => {



  return (<>

      <BrowserRouter>

        <Provider store={store}>

              <Routes>

                <Route path='/login' element = {<LoginScreen/>}/>
                <Route path='/register' element = {<RegisterScreen/>}/>
                <Route path='/' element={<HomeScreen/>}>
                  <Route path='/pay' element={<Payment/>} />
                  
                </Route>
              </Routes>
          
        </Provider>
        
      </BrowserRouter>

    
  </>

  )
}

export default App
