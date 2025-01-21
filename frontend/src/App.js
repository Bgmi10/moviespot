import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Bottomnavbar } from './components/Bottomnavbar';
import Searchbar from './components/Search/Searchbar';
import Admin from './components/admin/Admin';
import MoviesHome from './components/movies/MoviesHome';
import SeriesHome from './components/series/SeriesHome';


// issue 1 => inital mount on / page is not caching the data on store after navigate to /tv-series its working 

// todo: cache the section detail page, reterive the data from store in /slider/detail/:id/:videoId

const LazyTerms = lazy(() => import('./components/Terms'));
const LazySearchpage = lazy(() => import('./components/Search/Searchpage'));
const LazyRefundPolicy = lazy(() => import('./components/Refundpolicy'));
const LazyPrivacy = lazy(() => import('./components/Privacy'));
const DeveloperProfile = lazy(() => import('./components/Developerprofile/Developerprofile'));
const Contact = lazy(() => import('./components/Contact'));
const LazySliderVideoPlayer = lazy(() => import('./components/Search/VideoPlayer'));
const LazySectionDetail = lazy(() => import('./components/section/SectionDetail'));
const LazySectionDetailPage = lazy(() => import('./components/section/SectionDetailPage'));
const LazySliderDetailPage = lazy(() => import("./components/slider/SliderDetailPage"));

const App = () => {
  const location = useLocation();
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
          <Route path="/" element={<MoviesHome />} />
          <Route path="/section/detail/:type/:category" element={<LazySectionDetail />} />
          <Route path="/section/detail/:type/:category/:id" element={<LazySectionDetailPage />} />
          <Route element={<Admin />} path="/admin" />
          <Route path="/terms-condition" element={<LazyTerms />} />
          <Route path="/privacy-policy" element={<LazyPrivacy />} />
          <Route path="/slider/detail/:id" element={<LazySliderDetailPage />} />
          <Route path="/slider/detail/:id/:videoId" element={<LazySliderVideoPlayer />} />
          <Route path="/searchpage" element={<LazySearchpage />} />
          <Route path="/tv-series" element={<SeriesHome />} />
          <Route path="/refund-policy" element={<LazyRefundPolicy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
      <Suspense>
       <Routes>
         <Route path="/developer-profile" element={<DeveloperProfile />} />
       </Routes>
      </Suspense>
      {!isDeveloperPage && !isAdminPage && <Bottomnavbar />}
     {!isAdminPage && <Footer />}
    </div>
    </>
  );
};

export default App;
