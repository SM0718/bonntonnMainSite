import React, { useEffect } from 'react'
import { Header } from './components'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useStore from "@/store/store";
import { getCurrentUser } from './utils/getCurrentUser';

function App() {
  const location = useLocation();
  const login = useStore((state) => state.login);

  // const getCurrentUser = async () => {
  //   const token = localStorage.getItem('accessToken');
  //   try {
  //     const request = await fetch('http://localhost:4000/api/v1/users/current-user', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       credentials: 'include',
  //     });

  //     if (request.ok) {
  //       const data = await request.json();
        
  //       if (data.statusCode === 200) {
  //         login({
  //           isLoggedIn: true,
  //           user: data.data.user,
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   var res
  //   const req = async() => {
  //     res = await getCurrentUser();
  //     // console.log(res)
  //   }
  //   req()
  // }, []);

  return (
    <div key={location.pathname}>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
