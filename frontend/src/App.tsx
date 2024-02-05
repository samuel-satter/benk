// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/tauri";
// import "./App.css";

import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './admin/pages/home/Home';
import Users from './admin/pages/users/Users';
import Products from './admin/pages/products/Products';
import Navbar from './admin/components/navbar/Navbar';
import Menu from './admin/components/menu/Menu';
import Footer from './admin/components/footer/Footer';

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        // {
        //   path: "/users/:id",
        //   element: <Users />,
        // },
        // {
        //   path: "/products/:id",
        //   element: <Products />,
        // },
      ],
    },
    // {
    //   path: "/login",
    //   element: <Login onLogin={function (role: string): void {
    //     throw new Error('Function not implemented.');
    //   } } />,
    // },
  ]);
  return <RouterProvider router={router} />;
}

export default App;


// const App: React.FC = () => {
//  return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/create_account" element={<CreateAccountPage />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/users" element={<Users />} />
//         <Route path="/products" element={<Products />} />
//       </Routes>
//     </Router>
//  );
// };

// export default App;



// function App() {
//   const [greetMsg, setGreetMsg] = useState("");
//   const [name, setName] = useState("");

//   async function greet() {
//     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//     setGreetMsg(await invoke("greet", { name }));
//   }

//   return (
//     <App/>
//     <div className="container">
//       <h1>Welcome to Tauri!</h1>

//       <div className="row">
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo vite" alt="Vite logo" />
//         </a>
//         <a href="https://tauri.app" target="_blank">
//           <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>

//       <p>Click on the Tauri, Vite, and React logos to learn more.</p>

//       <form
//         className="row"
//         onSubmit={(e) => {
//           e.preventDefault();
//           greet();
//         }}
//       >
//         <input
//           id="greet-input"
//           onChange={(e) => setName(e.currentTarget.value)}
//           placeholder="Enter a name..."
//         />
//         <button type="submit">Greet</button>
//       </form>

//       <p>{greetMsg}</p>
//     </div>
//   );
// }

// export default App;
