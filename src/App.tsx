import React, { FC } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Card, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import { fontWeight } from '@mui/system';
import ActionAreaCard from './components/product';

function App() {

  return (
    <div className="App" style={{ backgroundColor: '#ebebeb' }}>
      <div className='container' style={{ display: 'inline-flex', margin: 'auto' }}>
        <Filter />
        <ProductList />
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
          <FilterOption title='t-shirt' />
          <FilterOption title='pants' />
          <FilterOption title='shoes' />
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
          <FormControl fullWidth sx={{ m: 1, width: '100px' }} size="small">
            <InputLabel htmlFor="outlined-adornment-amount">From</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              value={100000}
              onChange={() => { }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Amount"
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1, width: '100px' }} size="small">
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
    <Typography variant='subtitle1' style={{ fontWeight: 'bold' }}>{title}</Typography>
  )
}

const FilterOption: FC<{ title: string }> = ({ title }) => {
  return <Typography variant='subtitle1'>{title}</Typography>
}

function ProductList() {
  const img = { maxHeight: '230px', maxWidth: '230px', display: 'flex' }

  return (
    <div style={{ maxWidth: '940px' }}>
      <Card style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', padding: '15px', alignItems: 'center' }}>
          <div style={{ marginRight: '25px' }}>
            <FormatListBulletedIcon style={{ marginRight: '5px' }} />
            <GridViewIcon />
          </div>
          <div>40 Product found</div>
          <div style={{ flex: 1, padding: '0 20px' }}>
            <hr style={{ border: 'none', borderTop: '1px solid #bcccdc' }} />
          </div>
          <div style={{ marginRight: '5px' }}>Ordenar por</div>
          <OrderBySelector />
        </div>
      </Card>
      <div style={{ display: 'grid', gap: '5px' }}>
        <ActionAreaCard />
        <ActionAreaCard />
        <ActionAreaCard />
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

