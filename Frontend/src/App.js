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
import NotFound from './Components/NotFound';
import WriteReview from './Components/WriteReview';
import RatedShows from './Components/RatedShows';
import AdminPage from './Components/AdminPage';
import MyReviews from './Components/MyReviews';
import ShowReviews from './Components/ShowReviews';

function App() {
  return (
     <>
      <NavigationBar/>
      <div style={{marginTop: '50px'}}></div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/AllShows'>
          <Route index element={<AllShows/>} />
          <Route path=':filter/:page' element={<AllShows/>} />
          <Route path=':filter' element={<AllShows/>} />
        </Route>
        <Route path='/Show/:show' element={<Show/>} />
        <Route path='/Show/:show/reviews/:page' element={<ShowReviews/>} />
        <Route path='/Login' element={<><LoginRegisterBackground/><Login/></>} />
        <Route path='/Register' element={<><LoginRegisterBackground/><Register/></>} />
        <Route path='/WriteReview'>
          <Route index element={<WriteReview/>} />
          <Route path=':show' element={<WriteReview/>} />
        </Route>
        <Route path='/MyReviews'>
          <Route index element={<MyReviews/>} />
          <Route path=':page' element={<MyReviews/>} />
        </Route>
        <Route path='/RatedShows'>
          <Route index element={<RatedShows/>} />
          <Route path=':filter' element={<RatedShows/>} />
        </Route>
        <Route path='/Secret/Admin' element={ <AdminPage/> } />
        <Route path='*' element={<NotFound/>} />
      </Routes>
       <Footer/> 
    </>
  );
}

export default App;
