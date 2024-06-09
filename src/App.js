import React, {useEffect, useState} from 'react';
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
import * as preloader from '../src/components/anima.json';
import { LottieAnimation } from './components/lottie';

const LazyTamilmovieDetails = React.lazy(() => import('./components/TamilmovieDetails'));
const LazySearchdetail = React.lazy(()=> import('./components/Searchdetail'))
const Lazyterms = React.lazy(()=>import('./components/Terms'))
const Lazysearchpage = React.lazy(()=> import('./components/Searchpage'))
const Lazypopulardetail  = React.lazy(()=>import('./components/Populardetail'))
const Lazylogin = React.lazy(()=> import ('./components/Login'))


const App = () => {
 const [loading , setloading] = useState(true)
  
  const theme = useSelector(store => store.theme.toggletheme)
 
  const isloginpage = window.location.pathname === '/login'
  const today = new Date().toISOString().split('T')[0];
  
   useEffect(()=>{
    const timeoutId =setTimeout(() => {
     setloading(false)
  }, 600);
  return () => {
    clearTimeout(timeoutId)
  }

   }, [])

  

  return (
   
    <div className={theme ? `bg-black` : `bg-white`}>
      
     
      
    {loading ?  
       <div className='min-h-screen justify-center flex items-center'>
       <LottieAnimation gif = {preloader} />
       </div>
        :
        <Routes>
        
        <Route
          path="/*"
          element={
           
              <>
              
                {!isloginpage &&<Header  />}
                {!isloginpage && <Searchbar  /> }
                
                <React.Suspense fallback={<div><LottieAnimation  gif={preloader}/> </div>}>
                  <Routes>
                    <Route
                      path='/'
                      element={
                        <>
                         
                         <Mainslider /> 
                         <Popular title='Up coming..' apiurl = {`https://api.themoviedb.org/3/discover/movie?&api_key=`}   sort={`popularity.desc&with_original_language=ta&release_date.gte=${today}`}/>
                        <Tamilmovies title = 'Now playing' data={tamilmovies} playgif = {playgif}/> 
                        <Tamilmovies title='Vijay hits' data={vijayhits} />
         
                       <div><Popular title='Popular Movies' apiurl = {`https://api.themoviedb.org/3/discover/movie?&api_key=`} sort={'&with_original_language=ta&sort_by =popularity.desc'} />
                        <Popular title='Comedy genres' apiurl = {`https://api.themoviedb.org/3/discover/movie?&api_key=`} sort={'popularity.desc&with_original_language=ta&release_date.gte=${today}&with_genres=35'} />
                        <Popular title='Malayalam Dubbed' apiurl = {`https://api.themoviedb.org/3/discover/movie?&api_key=`} sort={'popularity.desc&with_original_language=ml&release_date.gte=${today}&with_genres=10749'} />
                        </div>
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
      </Routes>}
   {!loading &&   <Footer />}
    </div>
   
  );
};

export default App;
