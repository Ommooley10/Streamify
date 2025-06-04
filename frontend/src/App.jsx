import React from 'react';
import { useEffect, useState } from 'react';
import { Navigate, Route , Routes} from 'react-router';
import HomePage from './pages/HomePage.jsx';
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import { axiosInstance } from './lib/axios.js';
import { useQuery } from '@tanstack/react-query';

//TANSTACK QUERY: (has a lot of advantage over tradition useState methods, also it sends request repeatedly if an error is occured, which is good as in the traditional useState it send only once i.e when it is called)
/*delete => post put delete
get => userQuery*/
const App = () => {
  const { data: authData, isLoading, error} = useQuery({
    queryKey: ["authUser"],
    queryFn: async () =>{
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      },
      retry: false, //prevents the repeated sending of requests (auth check)
  }); 
  const authUser = authData?.user;
  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" /> } />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/notifications" element={authUser ? <NotificationsPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={authUser ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/onboarding" element={authUser ? <OnboardingPage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App