import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProductDetail } from './pages/ProductDetail/ProductDetail';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>

        </Route>
        <Route path="details" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>

  // <React.StrictMode>
  //   <Router>
  //     <Switch>
  //       <Route path="/">
  //         <App />
  //       </Route>
  //       {/* <Route path="/about">
  //           <About />
  //         </Route>
  //         <Route path="/dashboard">
  //           <Dashboard />
  //         </Route> */}
  //     </Switch>
  //   </Router>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
