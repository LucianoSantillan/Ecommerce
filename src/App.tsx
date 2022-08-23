import 'App.css';
import { ProductDetail } from 'pages/ProductDetail/ProductDetail';
import ProductsList from 'pages/ProductsList/ProductsList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsList />}>
        </Route>
        <Route path="details" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
