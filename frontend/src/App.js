import React, { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Bottomnavbar } from './components/Bottomnavbar';
import SearchBar from './components/Search/Searchbar';
import Admin from './components/admin/Admin';
import MoviesHome from './components/movies/MoviesHome';
import SeriesHome from './components/series/SeriesHome';
import UserRequestNotification from './components/UserRequestNotification';
import { Donate } from './components/Donate';

const LazyTerms = lazy(() => import('./components/Terms'));
const LazyRefundPolicy = lazy(() => import('./components/Refundpolicy'));
const LazyPrivacy = lazy(() => import('./components/Privacy'));
const DeveloperProfile = lazy(() => import('./components/Developerprofile/Developerprofile'));
const Contact = lazy(() => import('./components/Contact'));
const LazyVideoPlayer = lazy(() => import('./components/player/VideoPlayer'));
const LazySectionDetailPage = lazy(() => import('./components/section/SectionDetailPage'));
const LazySliderDetailPage = lazy(() => import("./components/slider/SliderDetailPage"));
const LazySearchDetailPage = lazy(() => import("./components/Search/SearchDetailPage"));
const LazySectionPage = lazy(() => import("./components/section/SectionPage"));

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isProfilePage = location.pathname === '/profile';
  const isDeveloperPage = location.pathname === '/developer-profile';
  const isAdminPage = location.pathname === '/admin';

  return (
    <>  
    {!isLoginPage && !isProfilePage && !isDeveloperPage &&  !isAdminPage && <Header />}
    <div className="from-[#131314] via-black to-black bg-gradient-to-l">
      <Suspense>
        <Routes> 
          <Route path="/search" element={<SearchBar />} />
          <Route path="/search/detail/:id" element={<LazySearchDetailPage />} />
          <Route path="/" element={<MoviesHome />} />
          <Route path="/section/detail/:type/:category/:id" element={<LazySectionDetailPage />} />
          <Route path="/section/:title/:type/:category" element={<LazySectionPage />} />
          <Route element={<Admin />} path="/admin" />
          <Route path="/terms-condition" element={<LazyTerms />} />
          <Route path="/privacy-policy" element={<LazyPrivacy />} />
          <Route path="/slider/detail/:id" element={<LazySliderDetailPage />} />
          <Route path="/slider/detail/:id/:videoId" element={<LazyVideoPlayer />} />
          <Route path="/series" element={<SeriesHome />} />
          <Route path="/refund-policy" element={<LazyRefundPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
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
      {/* <UserRequestNotification /> */}
    </>
  );
};

export default App;
