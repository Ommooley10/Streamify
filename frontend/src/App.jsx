import React from 'react';
import { useEffect, useState } from 'react';
import { Route , Routes} from 'react-router';
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
  const { data, isLoading, error} = useQuery({
    queryKey: ["todos"],
    queryFn: async () =>{
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      },
      retry: false, //prevents the repeated sending of requests (auth check)
  }); 
  console.log(data);
  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App