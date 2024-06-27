import React, {useEffect, useState , lazy} from 'react';
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
import * as preloader from '../src/components/anima.json';
import { LottieAnimation } from './components/lottie';
import { Bottomnavbar } from './components/Bottomnavbar';
import Usefetchmainslider from './components/Tvseries/Usefetchmainslider';
import { Adbanner } from './components/Subscription/Adbanner';


const LazyTamilmovieDetails = React.lazy(() => import('./components/TamilmovieDetails'));
const LazySearchdetail = React.lazy(()=> import('./components/Searchdetail'))
const Lazyterms = React.lazy(()=>import('./components/Terms'))
const Lazysearchpage = React.lazy(()=> import('./components/Searchpage'))
const Lazypopulardetail  = React.lazy(()=>import('./components/Populardetail'))
const Lazylogin = React.lazy(()=> import ('./components/Login'))
const Lazyuserprofile = React.lazy(() => import('./Oauth/Userprofile'))
const Lazyherolighter = React.lazy(()=>import('./components/HeroLightpass'))
const Lazytvseries = lazy(() => import('./components/Tvseries/Tvseries' ))



const App = () => {
  
  const theme = useSelector(store => store.theme.toggletheme)
  const isloginpage = window.location.pathname === '/login'
  const isprofilepage = window.location.pathname === '/profile'
  const today = new Date().toISOString().split('T')[0];
  
 
   const category = 'movie'
   const data = Usefetchmainslider({category})
   const filtermovies = data?.data?.results.slice(15,20)
   
  

  return (
   
    <div className={theme ? `bg-slate-900` : `bg-white`}>
      
     
      {/* < Adbanner /> */}
   
        <Routes>
        
        <Route
          path="/*"
          element={
           
              <>
              
                {!isloginpage && !isprofilepage && <Header  />}
                {!isloginpage && !isprofilepage && <Searchbar  /> }
                
                <React.Suspense fallback={<LottieAnimation  gif={preloader}/> }>
                  <Routes>
                    <Route
                      path='/'
                      element={
                        <>
        
                         <Mainslider data = {filtermovies} /> 
                         <Popular title='Up coming..' apiurl = {`https://api.themoviedb.org/3/discover/movie?&api_key=`}   sort={`popularity.desc&with_original_language=ta&release_date.gte=${today}`}/>
                        <Tamilmovies title = 'Now playing' data={tamilmovies} playgif = {playgif}/> 
                        <Tamilmovies title='Vijay hits' data={vijayhits} />
         
                       <div>
                        <Popular title='Popular Movies' apiurl = {`https://api.themoviedb.org/3/discover/movie?&api_key=`} sort={'&with_original_language=ta&sort_by =popularity.desc'} />
                        <Popular title='Comedy genres' apiurl = {`https://api.themoviedb.org/3/discover/movie?&api_key=`} sort={'popularity.desc&with_original_language=ta&release_date.gte=${today}&with_genres=35'} />
                        <Popular title='Malayalam Dubbed' apiurl = {`https://api.themoviedb.org/3/discover/movie?&api_key=`} sort={'popularity.desc&with_original_language=ml&release_date.gte=${today}&with_genres=10749'} />
                       </div>
                       
                    
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
                     <Route path= "/3d" element={<Lazyherolighter />} />
                     <Route path='/tv-series' element={<Lazytvseries />} />
                  
                  </Routes>
                </React.Suspense>
              </>
            
          }
        />
      </Routes>
      
       
       <React.Suspense fallback={<LottieAnimation  gif={preloader}/> }>
        <Routes>
         <Route path='/profile' element={<Lazyuserprofile />} />
      </Routes>
      </React.Suspense>
      
      <Bottomnavbar />
   { !isprofilepage &&  <Footer />}
    </div>
   
  );
};

export default App;
