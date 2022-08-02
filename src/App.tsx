import React, { FC } from 'react';
import logo from './assets/images/logo.png';
import logoNombre from './assets/images/logo-nombre.webp';
import './App.css';
import { Button, Card, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, Typography } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import { fontWeight } from '@mui/system';
import ActionAreaCard from './components/product';
import ShoppingCart from '@mui/icons-material/ShoppingCart';


function App() {

  return (
    <div className="App" style={{ backgroundColor: '#ebebeb' }}>
      <div style={{
        width: '100%',
        background: '#fff',
        padding: '6px',
        marginBottom: '20px',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px',

      }}>
        <div
          className='container'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: 'auto'
          }}>
          <div>
            <img src={logo} alt="" height={'60px'} />
            <img src={logoNombre} alt="" height={'60px'} style={{marginLeft: '-35px'}}/>
          </div>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          ><ShoppingCart /></IconButton>
        </div>
      </div>
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

const FilterOption: FC<{ title: string }> = ({ title }) => {
  return <Typography variant='subtitle1'>{title}</Typography>
}

function ProductList() {
  const img = { maxHeight: '230px', maxWidth: '230px', display: 'flex' }

  return (
    <div>
      <Card style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', padding: '15px', alignItems: 'center' }}>
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

