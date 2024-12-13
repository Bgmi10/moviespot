import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Tamilmovies from './components/Tamilmovies';
import Chatbot from './components/Chatbot';
import { Livechat } from './components/Livechat';
import { Mainslider } from './components/Mainslider';
import { ajith_hits, tamilmovies, vijayhits } from './utils/constans';
import { Popular } from './components/Popular';
import Footer from './components/Footer';
import * as preloader from './components/anima.json';
import { LottieAnimation } from './components/lottie';
import { Bottomnavbar } from './components/Bottomnavbar';
import Usefetchmainslider from './components/Tvseries/Usefetchmainslider';
import { Adbanner } from './components/Subscription/Adbanner';
import Searchbar from './components/Search/Searchbar';

const LazyTamilmovieDetails = lazy(() => import('./components/TamilmovieDetails'));
const LazySearchdetail = lazy(() => import('./components/Search/Searchdetail'));
const LazyTerms = lazy(() => import('./components/Terms'));
const LazySearchpage = lazy(() => import('./components/Search/Searchpage'));
const LazyPopulardetail = lazy(() => import('./components/Populardetail'));
const LazyLogin = lazy(() => import('./components/Login'));
const LazyUserProfile = lazy(() => import('./Oauth/Userprofile'));
const LazyTvseries = lazy(() => import('./components/Tvseries/Tvseries'));
const LazyRefundPolicy = lazy(() => import('./components/Refundpolicy'));
const LazyPrivacy = lazy(() => import('./components/Privacy'));
const DeveloperProfile = lazy(() => import('./components/Developerprofile/Developerprofile'));
const AdminMsgChat = lazy(() => import('./components/Developerprofile/Admin/Adminmsgchat'));
const Contact = lazy(() => import('./components/Contact'));

const App = () => {
  const theme = useSelector(store => store.theme.toggletheme);
  const location = useLocation();

  const today = new Date().toISOString().split('T')[0];
  const category = 'movie';
  const data = Usefetchmainslider({ category });
  const filterMovies = data?.data?.results.slice(15, 20);

  const isHomepage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';
  const isProfilePage = location.pathname === '/profile';
  const isDeveloperPage = location.pathname === '/developer-profile';
  const isAdminPage = location.pathname === '/admin';
  const isContactPage = location.pathname === '/contact';
  const isSearchCategory = location.pathname === '/search-catagory';

  return (
    <div className={theme ? `bg-slate-950` : `bg-white`}>
      {!isLoginPage && !isProfilePage && !isDeveloperPage &&  !isAdminPage && <Header />}
      {isSearchCategory && <Searchbar />}

      <Suspense fallback={<LottieAnimation gif={preloader} />}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Mainslider data={filterMovies} />
                <Popular
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
                <Chatbot />
              </>
            }
          />

          <Route path="/moviedetail/nowplaying/:Id" element={<LazyTamilmovieDetails data={tamilmovies} />} />
          <Route path="/moviedetail/vijayhits/:Id" element={<LazyTamilmovieDetails data={vijayhits} />} />
          <Route path="/terms-condition" element={<LazyTerms />} />
          <Route path="/privacy-policy" element={<LazyPrivacy />} />
          <Route path="/searchdetail/:id" element={<LazySearchdetail />} />
          <Route path="/searchpage" element={<LazySearchpage />} />
          <Route path="/livechat" element={<Livechat />} />
          <Route path="/popular-detail" element={<LazyPopulardetail />} />
          <Route path="/tv-series" element={<LazyTvseries />} />
          <Route path="/refund-policy" element={<LazyRefundPolicy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
         <Suspense>
          <Routes>
            <Route path="/login" element={<LazyLogin />} />
            <Route path="/profile" element={<LazyUserProfile />} />
            <Route path="/developer-profile" element={<DeveloperProfile />} />
            <Route path="/admin" element={<AdminMsgChat />} />
          </Routes>
         </Suspense>


      {!isDeveloperPage && !isAdminPage && <Bottomnavbar />}
    </div>
  );
};

export default App;
