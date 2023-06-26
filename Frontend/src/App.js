import './App.css';
import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';
import Home from './Components/Home'
import Show from './Components/Show';
import AllShows from './Components/AllShows';
import LoginRegisterBackground from './Components/LoginRegisterBackground';
import Login from './Components/Login';
import Register from './Components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
     <>
      <NavigationBar/>
      <div style={{marginTop: '50px'}}></div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/AllShows/:filter'>
          <Route index element={<AllShows/>} />
          <Route path=':filter' element={<AllShows/>} />
        </Route>
        <Route path='/Show/:show' element={<Show/>} />
        <Route path='/Login' element={<><LoginRegisterBackground/><Login/></>} />
        <Route path='/Register' element={<><LoginRegisterBackground/><Register/></>} />
        {/* <Show/>
        <AllShows/>
        <LoginRegisterBackground/>
        <Login/>
        <Register/> */}
      </Routes>
       <Footer/> 
    </>
    // <Routes>
    //   <Route path='/' element={<Home/>}/>
    // </Routes>
  );
}

export default App;
