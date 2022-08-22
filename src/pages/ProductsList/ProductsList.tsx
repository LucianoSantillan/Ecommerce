import React, { FC, useEffect } from 'react';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Navbar } from 'components/navbar';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Filter from './Filter/Filter';
import { ProductList } from './ProductList';

function ProductsList() {

  const [products, setProducts] = React.useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryByDefault = 't-shirt'
  const pageByDefault = 1
  const orderByDefault = 'lowerPrice'
  const categoryQueryParam = searchParams.get('category') || categoryByDefault;
  const pageQueryParam = parseInt(searchParams.get('page') || '1');
  const forWhoParam = searchParams.get('forWho') || '';
  const orderByQueryParam = searchParams.get('orderBy') || orderByDefault;

  const category: string = categoryQueryParam

  const setCategory = (value: string) => {
    searchParams.set('category', value)
    setSearchParams(searchParams)
  }


  const page: number = pageQueryParam

  const setPage = (value: number) => {
    searchParams.set('page', value.toString())
    setSearchParams(searchParams)
  }

  
  const forWho: string = forWhoParam

  const setForWho = (value: string) => {
    searchParams.set('forWho', value)
    setSearchParams(searchParams)
  }

  const [minPrice, setMinPrice] = React.useState<string>('');
  const [maxPrice, setMaxPrice] = React.useState<string>('');
  const [pages, setPages] = React.useState<number>(0);
  const [totalItemsFound, setTotalItemsFound] = React.useState<number>(0);
  const [orderedBy, setOrderedBy] = React.useState<string>(orderByQueryParam);

  useEffect(() => {
    let url = new URL('http://localhost:4000/api/products')

    let _orderBy = orderByQueryParam

    if (!orderByQueryParam) {
      _orderBy = orderByDefault
    }

    url.searchParams.set('category', category);
    url.searchParams.set('page', page.toString());
    url.searchParams.set('orderBy', _orderBy.toString());
    url.searchParams.set('forWho', forWho);

    axios
      .get(url.href)
      .then(function (response) {
        setProducts(response.data.products);
        setPages(response.data.pages);
        setTotalItemsFound(response.data.total);
      })

  }, [searchParams.toString()])


  const onChangeOrderBy = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    setOrderedBy(newValue);
    searchParams.set('orderBy', newValue)
    setSearchParams(searchParams);
  }

  const onCategoryChange = (newValue: string) => {
    if (pageQueryParam !== 1) {
      setPage(1)
    }
    setCategory(newValue)
  }

  const onForWhoChange = (newValue: string) => {
    if (pageQueryParam !== 1) {
      setPage(1)
    }
    setForWho(newValue)
  }

  return (
    <div className="App" style={{ backgroundColor: '#ebebeb', minHeight: '100vh', paddingBottom: '20px' }}>

      <Navbar />
      <div className='container' style={{ display: 'inline-flex', margin: 'auto' }}>
        <Filter
          category={category}
          onCategoryChange={onCategoryChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={(newValue) => {
            setMinPrice(newValue)
          }}
          onMaxPriceChange={(newValue) => {
            setMaxPrice(newValue)
          }}
          forWho={forWho}
          onForWhoChange={onForWhoChange}
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
          totalItemsFound={totalItemsFound}
          orderedBy={orderedBy}
          onChangeOrderBy={onChangeOrderBy}
        />

      </div>


    </div>
  );
}

export default ProductsList;
export const OrderBySelector: FC<{ onChangeOrderBy: (e: SelectChangeEvent<string>) => void, orderedBy: string }> = ({ onChangeOrderBy, orderedBy }) => {
  return <FormControl size="small" sx={{ minWidth: '145px' }}>
    {/* <InputLabel id="demo-simple-select-label">Order by</InputLabel> */}
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={orderedBy}
      onChange={onChangeOrderBy}
    >
      <MenuItem value={'lowerPrice'}>Lower price</MenuItem>
      <MenuItem value={'higherPrice'}>Higher price</MenuItem>
    </Select>
  </FormControl>;
}
