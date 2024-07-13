import { } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import ContactUs from './pages/ContactUs';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';
import Cart from './pages/Cart';
import { ShoppingCartProvider } from './context/ShoppingCartContext';

function App() {

  return (

    <div>
      <ShoppingCartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" />
            {/* <Route path="/" ///// element={<ClothifyHeader />} ////////  /> */}
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="my-account" element={<MyAccount />} />
            <Route path="cart" element={<Cart />} />
            {/* </Route> */}
          </Routes>
        </BrowserRouter>
      </ShoppingCartProvider>
    </div>
  );
}

export default App;

// <> below is project file starting page
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src={viteLogo} className="logo" alt="Vite logo" />
//     </a>

//     <a href="https://react.dev" target="_blank">
//       <img src={reactLogo} className="logo react" alt="React logo" />
//     </a>
//   </div>

//   <div className="card">

//     <button onClick={() => setCount((count) => count + 1)}>
//       count is {count}
//     </button>

//     <p>
//       Edit <code>src/App.tsx</code> and save to test HMR
//     </p>
//   </div>
// </>
