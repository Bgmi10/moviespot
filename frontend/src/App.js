import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Bottomnavbar } from './components/Bottomnavbar';
import Searchbar from './components/Search/Searchbar';
import Admin from './components/admin/Admin';
import Tvseries from './components/Tvseries/Tvseries';
import Home from './components/movies/Home';

const LazySearchdetail = lazy(() => import('./components/Search/SliderDetailPage'));
const LazyTerms = lazy(() => import('./components/Terms'));
const LazySearchpage = lazy(() => import('./components/Search/Searchpage'));
const LazyLogin = lazy(() => import('./components/Login'));
const LazyUserProfile = lazy(() => import('./Oauth/Userprofile'));
const LazyRefundPolicy = lazy(() => import('./components/Refundpolicy'));
const LazyPrivacy = lazy(() => import('./components/Privacy'));
const DeveloperProfile = lazy(() => import('./components/Developerprofile/Developerprofile'));
const Contact = lazy(() => import('./components/Contact'));
const LazySliderVideoPlayer = lazy(() => import('./components/Search/SliderVideoPlayer'));
const LazySectionDetail = lazy(() => import('./components/section/SectionDetail'));
const LazySectionDetailPage = lazy(() => import('./components/section/SectionDetailPage'));

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
          <Route path="/" element={<Home />} />
          <Route path="/section/detail/:type/:category" element={<LazySectionDetail />} />
          <Route path="/section/detail/:id" element={<LazySectionDetailPage />} />
          <Route element={<Admin />} path="/admin" />
          <Route path="/terms-condition" element={<LazyTerms />} />
          <Route path="/privacy-policy" element={<LazyPrivacy />} />
          <Route path="/slider/detail/:id" element={<LazySearchdetail />} />
          <Route path="/slider/detail/:id/:videoId" element={<LazySliderVideoPlayer />} />
          <Route path="/searchpage" element={<LazySearchpage />} />
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
     {!isAdminPage && <Footer />}
    </div>
    </>
  );
};

export default App;
