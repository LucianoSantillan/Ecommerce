import React, { FC, useEffect } from 'react';
import './App.css';
import { Card, FormControl, FormControlLabel, InputAdornment, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, Typography } from '@mui/material';
import ActionAreaCard from './components/product';
import { Navbar } from './components/navbar';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

function App() {

  const [products, setProducts] = React.useState<any[]>([]);
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryQueryParam = searchParams.get('category');
  const [category, setCategory] = React.useState<string>(categoryQueryParam ?? 't-shirt');


  useEffect(() => {
    if (category !== categoryQueryParam) {
      console.log('renavigate')
      navigate('?category=' + category);
    }
  }, [category])

  useEffect(() => {
    console.log('useEffect')
    axios
      .get("http://localhost:4000/api/products?category=" + category)
      .then(function (response) {
        setProducts(response.data);
      })

  }, [category])

  return (
    <div className="App" style={{ backgroundColor: '#ebebeb', minHeight: '100vh', paddingBottom: '20px' }}>

      <Navbar />
      <div className='container' style={{ display: 'inline-flex', margin: 'auto' }}>
        <Filter category={category} onCategoryChange={(newValue) => {
          setCategory(newValue)
        }} />
        <ProductList products={products} />
      </div>


    </div>
  );
}

const Filter: FC<{ category: string, onCategoryChange: (newValue: string) => void }> = ({ category, onCategoryChange }) => {
  return (
    <Card style={{ padding: '10px', marginRight: '15px', height: 'auto' }}>
      <div style={{ marginRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'left', textAlign: 'left' }}>
        <FilterTitle title='Category' />
        <div>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={category}
              name="radio-buttons-group"
              onChange={(event, value) => { onCategoryChange(value) }}
            >
              <FormControlLabel value="t-shirt" control={<Radio size='small' />} label="T-shirt" />
              <FormControlLabel value="pants" control={<Radio size='small' />} label="Pants" />
              <FormControlLabel value="shoes" control={<Radio size='small' />} label="Shoes" />
            </RadioGroup>
          </FormControl>
        </div>
        <br />

        <FilterTitle title='Price' />
        <div>
          <FormControl fullWidth sx={{ width: '100px', mr: '4px' }} size="small">
            <OutlinedInput
              id="outlined-adornment-amount"
              placeholder='Min'
              value={''}
              onChange={() => { }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
          <FormControl fullWidth sx={{ width: '100px' }} size="small">
            <OutlinedInput
              id="outlined-adornment-amount"
              placeholder='Max'
              value={''}
              onChange={() => { }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
        </div>


      </div>
    </Card >
  )
}

const FilterTitle: FC<{ title: string }> = ({ title }) => {
  return (
    <Typography variant='subtitle1' style={{ fontWeight: 'bold', marginBottom: '3px' }}>{title}</Typography>
  )
}

export function Separator() {
  return (<hr style={{ border: 'none', borderTop: '1px solid #bcccdc' }} />)
}

const ProductList: FC<{ products: any[] }> = ({ products }) => {

  return (
    <div>
      <Card style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', padding: '15px', alignItems: 'center' }}>
          <div>40 Product found</div>
          <div style={{ flex: 1, padding: '0 20px' }}>
            <Separator />
          </div>
          <div style={{ marginRight: '5px' }}>Ordenar por</div>
          <OrderBySelector />
        </div>
      </Card>
      <div style={{ display: 'grid', gap: '5px', minWidth: '900px', }}>
        {products.map((product, index) => {
          return (
            <ActionAreaCard
              imgUrl={product.imgUrl}
              title={product.name}
              description={product.description}
              price={product.price} />
          )
        })}
      </div>
    </div >
  )
}

export default App;
function OrderBySelector() {
  return <FormControl size="small">
    {/* <InputLabel id="demo-simple-select-label">Order by</InputLabel> */}
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={10}
      // label="Age"
      onChange={() => { }}
    >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  </FormControl>;
}

