import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Tamilmovies from './components/Tamilmovies';
import Chatbot from './components/Chatbot';
import { Mainslider } from './components/Mainslider';
import { ajith_hits, tamilmovies, vijayhits } from './utils/constans';
import { Popular } from './components/Popular';
import Footer from './components/Footer';
import { Bottomnavbar } from './components/Bottomnavbar';
import Searchbar from './components/Search/Searchbar';
import Admin from './components/admin/Admin';
import useFetchSlider from './components/Hooks/useFetchSlider';
import Tvseries from './components/Tvseries/Tvseries';

const LazyTamilmovieDetails = lazy(() => import('./components/TamilmovieDetails'));
const LazySearchdetail = lazy(() => import('./components/Search/SliderDetailPage'));
const LazyTerms = lazy(() => import('./components/Terms'));
const LazySearchpage = lazy(() => import('./components/Search/Searchpage'));
const LazyPopulardetail = lazy(() => import('./components/Populardetail'));
const LazyLogin = lazy(() => import('./components/Login'));
const LazyUserProfile = lazy(() => import('./Oauth/Userprofile'));
const LazyRefundPolicy = lazy(() => import('./components/Refundpolicy'));
const LazyPrivacy = lazy(() => import('./components/Privacy'));
const DeveloperProfile = lazy(() => import('./components/Developerprofile/Developerprofile'));
const Contact = lazy(() => import('./components/Contact'));

const App = () => {
  const location = useLocation();
  const { moviessliderdata, loader } = useFetchSlider("movies"); 
  const today = new Date().toISOString().split('T')[0];
  const isLoginPage = location.pathname === '/login';
  const isProfilePage = location.pathname === '/profile';
  const isDeveloperPage = location.pathname === '/developer-profile';
  const isAdminPage = location.pathname === '/admin';
  const isSearchCategory = location.pathname === '/search-catagory';

  return (
    <>  
    {!isLoginPage && !isProfilePage && !isDeveloperPage &&  !isAdminPage && <Header />}
    <div className="from-[#131314] via-black to-black bg-gradient-to-l">
      {isSearchCategory && <Searchbar />}
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Mainslider data={moviessliderdata} loader={loader} />
                {/* <Popular
                  title="Upcoming Movies"
                  apiurl={`https://api.themoviedb.org/3/discover/movie?&api_key=`}
                  sort={`popularity.desc&with_original_language=ta&release_date.gte=${today}`}
                />
                <Tamilmovies title="Now Playing" data={tamilmovies} />
                <Tamilmovies title="Vijay Hits" data={vijayhits} />
                <Tamilmovies title="Ajith Hits" data={ajith_hits} />
                <Popular title="Popular Movies" apiurl={`https://api.themoviedb.org/3/discover/movie?&api_key=`} sort="with_original_language=ta" />
                <Popular title="Comedy Genres" apiurl={`https://api.themoviedb.org/3/discover/movie?&api_key=`} sort="with_original_language=ta&with_genres=35" />
                <Popular title="Malayalam Dubbed" apiurl={`https://api.themoviedb.org/3/discover/movie?&api_key=`} sort="with_original_language=ml&with_genres=10749" />
                <Chatbot /> */}
              </>
            }
          />
          <Route element={ <Admin /> } path="/admin" />
          <Route path="/moviedetail/nowplaying/:Id" element={<LazyTamilmovieDetails data={tamilmovies} />} />
          <Route path="/moviedetail/vijayhits/:Id" element={<LazyTamilmovieDetails data={vijayhits} />} />
          <Route path="/terms-condition" element={<LazyTerms />} />
          <Route path="/privacy-policy" element={<LazyPrivacy />} />
          <Route path="/slider/detail/:id" element={<LazySearchdetail />} />
          <Route path="/searchpage" element={<LazySearchpage />} />
          <Route path="/popular-detail" element={<LazyPopulardetail />} />
          <Route path="/tv-series" element={ <Tvseries /> } />
          <Route path="/refund-policy" element={<LazyRefundPolicy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
       </Suspense>
         <Suspense>
          <Routes>
            <Route path="/login" element={<LazyLogin />} />
            <Route path="/profile" element={<LazyUserProfile />} />
            <Route path="/developer-profile" element={<DeveloperProfile />} />
          </Routes>
         </Suspense>
      {!isDeveloperPage && !isAdminPage && <Bottomnavbar />}
    </div>
    </>
  );
};

export default App;
