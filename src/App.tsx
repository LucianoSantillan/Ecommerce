import React, { FC, useEffect } from 'react';
import './App.css';
import { Card, FormControl, FormControlLabel, InputAdornment, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, Typography } from '@mui/material';
import ActionAreaCard from './components/product';
import { Navbar } from './components/navbar';
import axios from 'axios';

function App() {

  const [products, setProducts] = React.useState<any[]>([]);

  useEffect(() => {
    console.log('useEffect')
    axios
      .get("http://localhost:4000/api/products?priceRange=110-150")
      .then(function (response) {
        setProducts(response.data);
      })

  }, [])

  return (
    <div className="App" style={{ backgroundColor: '#ebebeb' }}>

      <Navbar />
      <div className='container' style={{ display: 'inline-flex', margin: 'auto' }}>
        <Filter />
        <ProductList products={products} />
      </div>


    </div>
  );
}
const FilterOptionsContainer: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div style={{ paddingLeft: '7px' }}>{children}</div>
}

function Filter() {
  return (
    <Card style={{ padding: '10px', marginRight: '15px', height: 'auto' }}>
      <div style={{ marginRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'left', textAlign: 'left' }}>
        <FilterTitle title='Category' />







        <FilterOptionsContainer>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="female" control={<Radio size='small' />} label="T-shirt" />
              <FormControlLabel value="male" control={<Radio size='small' />} label="Pants" />
              <FormControlLabel value="other" control={<Radio size='small' />} label="Shoes" />
            </RadioGroup>
          </FormControl>
        </FilterOptionsContainer>
        <br />
        <FilterTitle title='For who?' />
        <FilterOptionsContainer>
          <FormControl fullWidth style={{ width: '130px' }} size="small">
            {/* <InputLabel id="demo-simple-select-label">Order by</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={10}
              // label="Age"
              onChange={() => { }}
            >
              <MenuItem value={10}>Women</MenuItem>
              <MenuItem value={20}>Men</MenuItem>
            </Select>
          </FormControl>
        </FilterOptionsContainer>

        <br />

        <FilterTitle title='Price' />
        <FilterOptionsContainer>
          <FormControl fullWidth sx={{ width: '100px', mr: '4px' }} size="small">
            <InputLabel htmlFor="outlined-adornment-amount">From</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={100000}
              onChange={() => { }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
            />
          </FormControl>
          <FormControl fullWidth sx={{ width: '100px' }} size="small">
            <InputLabel htmlFor="outlined-adornment-amount">To</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={999999}
              onChange={() => { }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
            />
          </FormControl>
        </FilterOptionsContainer>


      </div>
    </Card>
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
      <div style={{ display: 'grid', gap: '5px' }}>
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

