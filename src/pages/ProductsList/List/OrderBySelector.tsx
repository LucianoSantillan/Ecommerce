import { FC } from 'react';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

export const OrderBySelector: FC<{ onChangeOrderBy: (e: SelectChangeEvent<string>) => void; orderedBy: string; }> = ({ onChangeOrderBy, orderedBy }) => {
  return <FormControl size="small" sx={{ minWidth: '145px' }}>
    {/* <InputLabel id="demo-simple-select-label">Order by</InputLabel> */}
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={orderedBy}
      onChange={onChangeOrderBy}
    >
      <MenuItem value={optionValues.fromHighToLowPrice}>From high to low price</MenuItem>
      <MenuItem value={optionValues.fromLowToHighPrice}>From low to high price</MenuItem>
    </Select>
  </FormControl>;
};

export const optionValues = {
  fromHighToLowPrice: 'fromHighToLowPrice',
  fromLowToHighPrice: 'fromLowToHighPrice'
}
