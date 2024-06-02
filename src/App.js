// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import Tamilmovies from './components/Tamilmovies';
import Chatbot from '../src/components/Chatbot'
import { Search } from './components/Search';
import { Provider } from 'react-redux';
import { Livechat } from './components/Livechat';
import {Mainslider} from './components/Mainslider'
import store from './utils/Store';
import { tamilmovies } from './utils/constans';
import { vijayhits } from './utils/constans';
import playgif from './img/play.gif'
import { Popular } from './components/Popular';
import { useSelector } from 'react-redux';




const LazyTamilmovieDetails = React.lazy(() => import('./components/TamilmovieDetails'));
const LazySearchdetail = React.lazy(()=> import('./components/Searchdetail'))
const Lazyterms = React.lazy(()=>import('./components/Terms'))





const App = () => {
  
  const theme = useSelector(store => store.theme.toggletheme)

  
  return (
   
    <div className={theme ? `bg-black` : `bg-white`}>
      <Routes>
        
        <Route
          path="/*"
          element={
           
              <>
                <Header  />
                <Searchbar  /> 
                <React.Suspense fallback={<div>loading...</div>}>
                  <Routes>
                    <Route
                      path='/'
                      element={
                        <>
                      
                         <Mainslider /> 
                         <Popular title='Up coming..' apiurl = {`https://api.themoviedb.org/3/discover/movie?page=1&api_key=`}   sort={'&with_original_language=ta&sort_by=release_date.desc'}/>
                        <Tamilmovies title = 'Now playing' data={tamilmovies} playgif = {playgif}/> 
                        <Tamilmovies title='Vijay hits' data={vijayhits} />
                        <Popular title='Popular Movies' apiurl = {`https://api.themoviedb.org/3/discover/movie?page=1&api_key=`} sort={'&with_original_language=ta&sort_by =popularity.desc'} />
                       
                        <Chatbot />
        
                        </>
                      }
                    />
                     <Route path="/moviedetail/nowplaying/:Id" element={<LazyTamilmovieDetails data={tamilmovies} />} />
                   
                     <Route path="/moviedetail/vijayhits/:Id" element={<LazyTamilmovieDetails data={vijayhits} />} />
                     <Route path='/terms/condition' element={<Lazyterms />} />
                     <Route path="/search" element={<Search/>}  />
                     <Route path="/searchdetail/:id" element={<LazySearchdetail />} />
                     <Route path='/livechat' element={<Livechat />} />
                  </Routes>
                </React.Suspense>
              </>
            
          }
        />
      </Routes>
    </div>
   
  );
};

export default App;
