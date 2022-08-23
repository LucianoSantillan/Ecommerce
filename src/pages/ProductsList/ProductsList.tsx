import React, { useEffect } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { Navbar } from 'components/navbar';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Filter from './Filter/Filter';
import { List } from './List/List';
import { optionValues } from './List/OrderBySelector';

function ProductsList() {

  const [products, setProducts] = React.useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const forWhoParam = searchParams.get('forWho') || '';
  const orderBy = searchParams.get('orderBy') || optionValues.fromHighToLowPrice;

  const setOrderedBy = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    searchParams.set('orderBy', newValue)
    setSearchParams(searchParams);
  }


  const category: string = searchParams.get('category') || 't-shirt';

  const setCategory = (value: string) => {
    searchParams.set('category', value)
    setSearchParams(searchParams)
  }


  const page: number = parseInt(searchParams.get('page') || '1');

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

  useEffect(() => {
    let url = new URL('http://localhost:4000/api/products')

    url.searchParams.set('category', category);
    url.searchParams.set('page', page.toString());
    url.searchParams.set('orderBy', orderBy);
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
    setOrderedBy(event);
  }

  const onCategoryChange = (newValue: string) => {
    if (page !== 1) {
      setPage(1)
    }
    setCategory(newValue)
  }

  const onForWhoChange = (newValue: string) => {
    if (page !== 1) {
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
        <List
          products={products}
          page={page}
          onPageChange={(newValue) => {
            setPage(newValue)
            searchParams.set('page', `${newValue}`)
            setSearchParams(searchParams)
          }}
          pages={pages}
          totalItemsFound={totalItemsFound}
          orderedBy={orderBy}
          onChangeOrderBy={onChangeOrderBy}
        />

      </div>
    </div>
  );
}

export default ProductsList;

