// import React from "react";
// import Navigation from "./components/shared/navigation/Navigation";
// import Home from "./pages/Home/Home";
// import { Route, Routes, Navigate } from "react-router-dom";
// import "./App.css";
// import Authenticate from "./pages/Authenticate/Authenticate";
// import Activate from "./pages/Activate/Activate";
// import Rooms from "./pages/Rooms/Rooms";
// import { useSelector } from "react-redux";
// import { useLoading } from "./hooks/useLoading";
// import Loader from "./components/shared/Loader/Loader";
// import Room from "./pages/Room/Room";

// // const isAuth = false;
// // const user = {
// //   activated: false,
// // };

// const GuestRoute = ({ children }) => {
//   const { isAuth } = useSelector((state) => state.auth);
//   return isAuth ? <Navigate to="/rooms" /> : children;
// };

// const SemiProtectedRoute = ({ children }) => {
//   const { isAuth, user } = useSelector((state) => state.auth);
//   return !isAuth ? (
//     <Navigate to="/" />
//   ) : isAuth && !user.activated ? (
//     children
//   ) : (
//     <Navigate to="/rooms" />
//   );
// };

// const ProtectedRoute = ({ children }) => {
//   const { isAuth, user } = useSelector((state) => state.auth);
//   return !isAuth ? (
//     <Navigate to="/" />
//   ) : isAuth && !user.activated ? (
//     <Navigate to="/activate" />
//   ) : (
//     children
//   );
// };
// const App = () => {
//   const { loading } = useLoading();

//   return loading ? (
//     <Loader message="Loading, please wait.." />
//   ) : (
//     <div>
//       <Navigation />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         {/* <Route path="/authenticate" element={<Authenticate/>}/> */}
//         <Route
//           path="/authenticate"
//           element={
//             <GuestRoute>
//               <Authenticate />
//             </GuestRoute>
//           }
//         />
//         <Route
//           path="/activate"
//           element={
//             <SemiProtectedRoute>
//               <Activate />
//             </SemiProtectedRoute>
//           }
//         />
//         <Route
//           path="/rooms"
//           element={
//             <ProtectedRoute>
//               <Rooms />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/room/:id"
//           element={
//             <ProtectedRoute>
//               <Room />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </div>
//   );
// };

// export default App;

import React, { useMemo } from "react";
import Navigation from "./components/shared/navigation/Navigation";
import Home from "./pages/Home/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";
import { useLoading } from "./hooks/useLoading";
import Loader from "./components/shared/Loader/Loader";
import Room from "./pages/Room/Room";

const GuestRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return isAuth ? <Navigate to="/rooms" /> : children;
};

const SemiProtectedRoute = ({ children }) => {
  const { isAuth, user } = useSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate to="/" />
  ) : !user.activated ? (
    children
  ) : (
    <Navigate to="/rooms" />
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuth, user } = useSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate to="/" />
  ) : !user.activated ? (
    <Navigate to="/activate" />
  ) : (
    children
  );
};

const App = () => {
  const { loading } = useLoading();

  const routes = useMemo(
    () => (

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/authenticate"
            element={
              <GuestRoute>
                <Authenticate />
              </GuestRoute>
            }
          />
          <Route
            path="/activate"
            element={
              <SemiProtectedRoute>
                <Activate />
              </SemiProtectedRoute>
            }
          />
          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <Rooms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/room/:id"
            element={
              <ProtectedRoute>
                <Room />
              </ProtectedRoute>
            }
          />
        </Routes>

    ),
    []
  );

  return loading ? (
    <Loader message="Loading, please wait.." />
  ) : (
    <div>
      <Navigation />
      {routes}
    </div>
  );
};

export default App;
