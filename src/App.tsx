import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Registration from './pages/Registration/Registration';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import ProductPage from './pages/ProductPage/ProductPage';
import AppRoutes from './routes/AppRoutes';

function App() {
  return <AppRoutes />;
}

export default App;
