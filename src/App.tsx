import React, { FC, useEffect } from 'react';
import './App.css';
import { Avatar, Button, Card, FormControl, FormControlLabel, Icon, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Pagination, Radio, RadioGroup, Select, Typography } from '@mui/material';
import ActionAreaCard from './components/product';
import { Navbar } from './components/navbar';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ShoppingCart } from '@mui/icons-material';

function App() {

  const [products, setProducts] = React.useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQueryParam = searchParams.get('category');
  const [category, setCategory] = React.useState<string>(categoryQueryParam ?? 't-shirt');
  const [minPrice, setMinPrice] = React.useState<string>('');
  const [maxPrice, setMaxPrice] = React.useState<string>('');
  const [forWho, setForWho] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(1);
  const [pages, setPages] = React.useState<number>(0);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/products?${searchParams.toString()}`)
      .then(function (response) {
        setProducts(response.data.products);
        setPages(response.data.pages);
      })

  }, [searchParams.toString()])

  return (
    <div className="App" style={{ backgroundColor: '#ebebeb', minHeight: '100vh', paddingBottom: '20px' }}>

      <Navbar />
      <div className='container' style={{ display: 'inline-flex', margin: 'auto' }}>
        <Filter
          category={category}
          onCategoryChange={(newValue) => {
            setCategory(newValue)
          }}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={(newValue) => {
            setMinPrice(newValue)
          }}
          onMaxPriceChange={(newValue) => {
            setMaxPrice(newValue)
          }}
          forWho={forWho}
          onForWhoChange={(newValue) => {
            setForWho(newValue)
          }}
        />
        <ProductList
          products={products}
          page={page}
          onPageChange={(newValue) => {
            setPage(newValue)
            searchParams.set('page', `${newValue}`)
            setSearchParams(searchParams)
          }}
          pages={pages}
        />

      </div>


    </div>
  );
}

const Filter: FC<{
  category: string,
  onCategoryChange: (newValue: string) => void,
  minPrice: string,
  maxPrice: string,
  onMinPriceChange: (newValue: string) => void,
  onMaxPriceChange: (newValue: string) => void,
  forWho: string,
  onForWhoChange: (newValue: string) => void,
}> = (
  {
    category,
    onCategoryChange,
    minPrice,
    maxPrice,
    onMinPriceChange,
    onMaxPriceChange,
    forWho,
    onForWhoChange
  }) => {

    let navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

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
                onChange={(event, value) => {
                  onCategoryChange(value)
                  searchParams.set('category', value)
                  navigate('?' + searchParams.toString())
                }}
              >
                <FormControlLabel value="t-shirt" control={<Radio size='small' />} label="T-shirt" />
                <FormControlLabel value="pants" control={<Radio size='small' />} label="Pants" />
                <FormControlLabel value="shoes" control={<Radio size='small' />} label="Shoes" />
              </RadioGroup>
            </FormControl>
          </div>
          <br />


          <FilterTitle title='For who?' />
          <div>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={forWho}
                name="radio-buttons-group"
                onChange={(event, value) => {
                  onForWhoChange(value)
                  searchParams.set('forWho', value)
                  if (!value) {
                    searchParams.delete('forWho')
                  }
                  setSearchParams(searchParams);
                }}
              >
                <FormControlLabel value="" control={<Radio size='small' />} label="Not specified" />
                <FormControlLabel value="man" control={<Radio size='small' />} label="Man" />
                <FormControlLabel value="woman" control={<Radio size='small' />} label="Woman" />
              </RadioGroup>
            </FormControl>
          </div>
          <br />

          <FilterTitle title='Price' />
          <div style={{ display: 'flex', alignItems: 'center' }} >
            <FormControl fullWidth sx={{ width: '100px', mr: '4px' }} size="small">
              <OutlinedInput
                id="outlined-adornment-amount"
                placeholder='Min'
                value={minPrice}
                onChange={(event) => { onMinPriceChange(event.target.value) }}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>
            <FormControl fullWidth sx={{ width: '100px', marginRight: '17px' }} size="small">
              <OutlinedInput
                id="outlined-adornment-amount"
                placeholder='Max'
                value={maxPrice}
                onChange={(event) => { onMaxPriceChange(event.target.value) }}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              style={{ backgroundColor: '#1976d2' }}
              onClick={
                () => {
                  searchParams.set('minPrice', `${minPrice}`)
                  searchParams.set('maxPrice', `${maxPrice}`)
                  if (!minPrice) {
                    searchParams.delete('minPrice')
                  }
                  if (!maxPrice) {
                    searchParams.delete('maxPrice')
                  }
                  setSearchParams(searchParams)
                }}
            ><Search /></IconButton>
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

const ProductList: FC<{
  products: any[],
  page: number,
  onPageChange: (value: number) => void,
  pages: number,
}> = ({ products, page, onPageChange, pages }) => {

  const [searchParams, setSearchParams] = useSearchParams();

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
        {products.length === 0 && <div>No products found</div>}
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
      {!!pages && (
        <Card style={{ width: 'fit-content', padding: '10px', margin: 'auto', marginTop: '15px' }}>
          <Pagination
            count={pages}
            variant="outlined"
            color="primary"
            page={page}
            size="large"
            onChange={(_, page) => onPageChange(page)} />
        </Card>
      )}

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

