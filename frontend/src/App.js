import React, {lazy} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useParams, } from 'react-router-dom';
import Header from './components/Header';
import Tamilmovies from './components/Tamilmovies';
import Chatbot from '../src/components/Chatbot'
import { Livechat } from './components/Livechat';
import {Mainslider} from './components/Mainslider'
import { ajith_hits, tamilmovies } from './utils/constans';
import { vijayhits } from './utils/constans';
import { Popular } from './components/Popular';
import { useSelector } from 'react-redux';
import Footer from './components/Footer';
import * as preloader from '../src/components/anima.json';
import { LottieAnimation } from './components/lottie';
import { Bottomnavbar } from './components/Bottomnavbar';
import Usefetchmainslider from './components/Tvseries/Usefetchmainslider';
import { Adbanner } from './components/Subscription/Adbanner';
import { Developerprofile } from './components/Developerprofile/Developerprofile';
import { Contact } from './components/Contact';
import { Adminmsgchat } from './components/Developerprofile/Admin/Adminmsgchat';
import Searchbar from './components/Search/Searchbar';
import { Index } from './components/porn/Index';
import { Detailpage } from './components/porn/Detailpage';


const LazyTamilmovieDetails = React.lazy(() => import('./components/TamilmovieDetails'));
const LazySearchdetail = React.lazy(()=> import('./components/Search/Searchdetail'))
const Lazyterms = React.lazy(()=>import('./components/Terms'))
const Lazysearchpage = React.lazy(()=> import('./components/Search/Searchpage'))
const Lazypopulardetail  = React.lazy(()=>import('./components/Populardetail'))
const Lazylogin = React.lazy(()=> import ('./components/Login'))
const Lazyuserprofile = React.lazy(() => import('./Oauth/Userprofile'))
const Lazytvseries = lazy(() => import('./components/Tvseries/Tvseries' ))
const Lazyloadrefundpolicy = lazy(() => import('./components/Refundpolicy'))
const Lazyloadprivacy = lazy(() => import('./components/Privacy'))



const App = () => {
  
  const theme = useSelector(store => store.theme.toggletheme)
  const isloginpage = window.location.pathname === '/login'
  const isprofilepage = window.location.pathname === '/profile'
  const today = new Date().toISOString().split('T')[0]; 
  const location = useLocation()
  const category = 'movie'
  const data = Usefetchmainslider({category})
  const filtermovies = data?.data?.results.slice(15,20)
  const ishomepage = location.pathname === '/'
  const developroute = window.location.pathname === '/developer-profile'
  const adminroute  = window.location.pathname === '/admin'
  const contactroute  = window.location.pathname === '/contact'
  const search_catagory =  window.location.pathname === '/search-catagory'
  
  

  return (
   
    <div className={theme ? `bg-slate-950` : `bg-white`}>
      
        <Routes>
        
        <Route
          path="/*"
          element={
           
              <>
              
                {!isloginpage && !isprofilepage && !developroute  && <Header  />}  
                 {search_catagory && <Searchbar />}
                
                <React.Suspense fallback={<LottieAnimation  gif={preloader}/> }>
                  <Routes>
                    <Route
                      path='/'
                      element={
                        <>
        
                        <Mainslider data = {filtermovies} /> 
                        <Popular title='Up coming..' apiurl = {`https://api.themoviedb.org/3/discover/movie?&api_key=`}   sort={`popularity.desc&with_original_language=ta&release_date.gte=${today}`}/>
                        <Tamilmovies title = 'Now playing' data={tamilmovies}/> 
                        <Tamilmovies title='Vijay hits' data={vijayhits} />
                        <Tamilmovies title='Ajith hits' data={ajith_hits} />
                      
                       <div>
                        <Popular title='Popular Movies' apiurl = {`https://api.themoviedb.org/3/discover/movie?&api_key=`} sort={'with_original_language=ta'} />
                        <Popular title='Comedy genres' apiurl = {`https://api.themoviedb.org/3/discover/movie?&api_key=`} sort={'with_original_language=ta&with_genres=35'} />
                        <Popular title='Malayalam Dubbed' apiurl = {`https://api.themoviedb.org/3/discover/movie?&api_key=`} sort={'with_original_language=ml&with_genres=10749'} />
                       </div>
                       
                    
                        <Chatbot />
                      
                        </>
                       
                      }
                      
                    />
                    
                     <Route path="/moviedetail/nowplaying/:Id" element={<LazyTamilmovieDetails data={tamilmovies} />} />
                     <Route path="/moviedetail/vijayhits/:Id" element={<LazyTamilmovieDetails data={vijayhits} />} />
                     <Route path='/terms-condition' element={<Lazyterms title={'Terms & Conditions'} welcome={` Welcome to Movie Spot's Privacy Policy. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy or practices with regards to your personal information, please contact us at moviesspot@gmail.com.`} policy1={'1. Acceptance of Terms'} policy1info={' By accessing and using Movie Spot, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions, as well as any applicable laws and regulations'} policy2={'2. External Links Disclaimer'} policy2info={' Movie Spot does not host any content on its servers. All movies, TV shows, and related media accessible through our website are provided by external sources. We do not take responsibility for the accuracy, legality, or content of the external sites or for that of subsequent links.'} policy3={'3. Content Use'} policy3info={' All content provided on Movie Spot is for informational purposes only. Movie Spot makes no representations as to the accuracy or completeness of any content found on this site or by following any link on this site. Movie Spot will not be liable for any errors or omissions in this information nor for the availability of this information. Movie Spot will not be liable for any losses, injuries, or damages from the display or use of this information.'} policy4={'4. Intellectual Property Rights'} policy4info={' All trademarks, service marks, logos, and copyrights of third parties referred to on Movie Spot are the property of their respective owners. Movie Spot does not claim ownership of any content accessed through external links. We encourage users to respect the intellectual property rights of others.'} policy5={'5. User Conduct'} policy5info={'You agree not to use Movie Spot for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the website in any way that could damage the website, the services, or the general business of Movie Spot.'} policy6={'6. Disclaimer of Warranties'} policy6info={'Movie Spot is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'} policy7={'7. Limitation of Liability'} policy7info={'   In no event shall Movie Spot, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the website; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein; (iii) any interruption or cessation of transmission to or from our website; (iv) any bugs, viruses, trojan horses, or the like that may be transmitted to or through our website by any third party; and/or (v) any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the website, whether based on warranty, contract, tort (including negligence), or any other legal theory, and whether or not we have been advised of the possibility of such damages.'} policy8={'8. Changes to Terms and Conditions'} policy8info={`  Movie Spot reserves the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.`}/>} />
                     <Route path='/privacy-policy' element={<Lazyloadprivacy />} />
                     <Route path="/searchdetail/:id" element={<LazySearchdetail />} />
                     <Route path={`/searchpage`} element={<Lazysearchpage />} />
                     <Route path='/livechat' element={<Livechat />} />
                     <Route path='/popular-detail' element={<Lazypopulardetail />} />
                     <Route path= "/login" element={<Lazylogin />} />
                     <Route path='/tv-series' element={<Lazytvseries/>} />
                     <Route path='/developer-profile' element={<Developerprofile />} />
                     <Route path='/refund-policy' element={<Lazyloadrefundpolicy />} />
                     <Route path='/contact' element={<Contact />} />
                     <Route path='/porn' element={<Index />} />
                     <Route path='/porn/detail/:id' element={<Detailpage />} />
                 
                   </Routes>
                </React.Suspense>
              </>
            
          }
          
        />
         
         <Route path='/admin'  element={<Adminmsgchat /> }/>
      </Routes>
      
       
       <React.Suspense fallback={<LottieAnimation  gif={preloader}/> }>
        <Routes>
         <Route path='/profile' element={<Lazyuserprofile />} />
      </Routes>
      </React.Suspense>
      
     {!developroute &&  !adminroute && <Bottomnavbar />}
   {/* { !isprofilepage  && !developroute && !adminroute && !contactroute && <Footer />} */}
    </div>
   
  );
};

export default App;
