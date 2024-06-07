import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import Tamilmovies from './components/Tamilmovies';
import Chatbot from '../src/components/Chatbot'
import { Search } from './components/Search';
import { Livechat } from './components/Livechat';
import {Mainslider} from './components/Mainslider'
import { tamilmovies } from './utils/constans';
import { vijayhits } from './utils/constans';
import playgif from './img/play.gif'
import { Popular } from './components/Popular';
import { useSelector } from 'react-redux';
import Footer from './components/Footer';
import { Fet } from './components/Fet';





const LazyTamilmovieDetails = React.lazy(() => import('./components/TamilmovieDetails'));
const LazySearchdetail = React.lazy(()=> import('./components/Searchdetail'))
const Lazyterms = React.lazy(()=>import('./components/Terms'))
const Lazysearchpage = React.lazy(()=> import('./components/Searchpage'))
const Lazypopulardetail  = React.lazy(()=>import('./components/Populardetail'))
const Lazylogin = React.lazy(()=> import ('./components/Login'))




const App = () => {
 
  
  const theme = useSelector(store => store.theme.toggletheme)
  const isloginpage = window.location.pathname === '/login'
  
  return (
   
    <div className={theme ? `bg-black` : `bg-white`}>
      <Routes>
        
        <Route
          path="/*"
          element={
           
              <>
              
                {!isloginpage &&<Header  />}
                {!isloginpage && <Searchbar  /> }
                
                <React.Suspense fallback={<div>loading...</div>}>
                  <Routes>
                    <Route
                      path='/'
                      element={
                        <>
                         
                         <Mainslider /> 
                         <Popular title='Up coming..' apiurl = {`https://api.themoviedb.org/3/discover/movie?&api_key=`}   sort={''}/>
                        <Tamilmovies title = 'Now playing' data={tamilmovies} playgif = {playgif}/> 
                        <Tamilmovies title='Vijay hits' data={vijayhits} />
                        <Popular title='Popular Movies' apiurl = {`https://api.themoviedb.org/3/discover/movie?&api_key=`} sort={'&with_original_language=ta&sort_by =popularity.desc'} />
                          <Fet />
                        <Chatbot />
                       
                        </>
                         
                       
                      }
                      
                      
                    />
                    
                     <Route path="/moviedetail/nowplaying/:Id" element={<LazyTamilmovieDetails data={tamilmovies} />} />
                   
                     <Route path="/moviedetail/vijayhits/:Id" element={<LazyTamilmovieDetails data={vijayhits} />} />
                     <Route path='/terms/condition' element={<Lazyterms />} />
                     <Route path="/search" element={<Search/>}  />
                     <Route path="/searchdetail/:id" element={<LazySearchdetail />} />
                     <Route path={`/searchpage`} element={<Lazysearchpage />} />
                     <Route path='/livechat' element={<Livechat />} />
                     <Route path='/popular-detail' element={<Lazypopulardetail />} />
                     <Route path= "/login" element={<Lazylogin />} />
                  </Routes>
                </React.Suspense>
              </>
            
          }
        />
      </Routes>
      <Footer />
    </div>
   
  );
};

export default App;
