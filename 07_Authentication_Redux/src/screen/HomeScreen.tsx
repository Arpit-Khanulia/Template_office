
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'

const HomeScreen = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default HomeScreen
