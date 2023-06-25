import './App.css';
import NavigationBar from './Components/NavigationBar';
import Footer from './Components/Footer';
import Home from './Components/Home'
import Show from './Components/Show';
import AllShows from './Components/AllShows';
import LoginRegisterBackground from './Components/LoginRegisterBackground';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <>
      <NavigationBar/>
      <div style={{marginTop: '50px'}}></div>
      {/* <Home/> */}
      {/* <Show/> */}
      {/* <AllShows/> */}
      <LoginRegisterBackground/>
      {/* <Login/> */}
      <Register/>
      <Footer/>
    </>
  );
}

export default App;
