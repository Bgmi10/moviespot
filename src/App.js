// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import MovieList from './components/MovieList';
import Login from './components/Login';
import Tamilmovies from './components/Tamilmovies';
import Vijayhits from './components/Vijayhits';
import Chatbot from '../src/components/Chatbot'
import { Search } from './components/Search';
import { Provider } from 'react-redux';
import { Livechat } from './components/Livechat';
import store from './utils/Store';





const LazyMovieDetails = React.lazy(() => import('./components/Moviedetails'));
const LazyTamilmovieDetails = React.lazy(() => import('./components/TamilmovieDetails'));
const LazyVijayhitsDetails = React.lazy(()=> import('./components/VijayhitsDetails'))


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);

  useEffect(() => {
    const storedAuthState = sessionStorage.getItem('authenticated');

    if (storedAuthState) {
      setAuthenticated(true);
      setPageLoad(false);
    } else {
      setPageLoad(false);
    }
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleAuthentication = () => {
    setAuthenticated(true);
    sessionStorage.setItem('authenticated', 'true');
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem('authenticated');
    setPageLoad(false);
  };

  const toggleMobileNav = () => {
    setMobileNavOpen((prev) => !prev);
  };

  const isLoginPage = window.location.pathname === '/';
  
  return (
    <Provider store={store}>
    <div className={isLoginPage ? 'bg-black pr-6' : 'bg-black '} >
      <Routes>
        <Route
          path="/login"
          element={
            <React.Suspense fallback={<div className={isLoginPage ? '' : 'bg-black'}></div>}>
              <Login onAuthentication={handleAuthentication} />
            </React.Suspense>
          }
        />
        <Route
          path="/*"
          element={
            authenticated || pageLoad ? (
              <>
                <Header onLogout={handleLogout} toggleMobileNav={toggleMobileNav} />
                <Searchbar onSearch={handleSearch} /> 
                <React.Suspense fallback={<div className={isLoginPage ? '' : 'bg-black'}></div>}>
                  <Routes>
                    <Route
                      index
                      element={
                        <> <Tamilmovies /> 
                        <Vijayhits />
                        <Chatbot />
                          {!isMobileNavOpen && <MovieList searchTerm={searchTerm} />}
                         

                        </>
                      }
                    />
                    <Route path="/movie/:id" element={<LazyMovieDetails />} />
                     <Route path="/tamilmoviedetails/:movieId" element={<LazyTamilmovieDetails />} />
                     <Route path="/vijayhitsdetails/:movieId" element={<LazyVijayhitsDetails/>} />
                     <Route path="/search" element={<Search/>}  />
                     <Route path='/livechat' element={<Livechat />} />
                  </Routes>
                </React.Suspense>
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
    </Provider>
  );
};

export default App;
