import { FC } from 'react';
import { Card, FormControl, FormControlLabel, IconButton, InputAdornment, OutlinedInput, Radio, RadioGroup, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { Search } from '@mui/icons-material';

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
        const [searchParams, setSearchParams] = useSearchParams();
        return (
            <Card style={{ padding: '10px', marginRight: '15px', height: 'auto' }}>
                <div style={{ marginRight: '10px', display: 'flex', flexDirection: 'column', alignItems: 'left', textAlign: 'left' }}>
                    <FilterTitle title='Category' />
                    <div>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={category}
                                name="radio-buttons-group"
                                onChange={(event, value) => {
                                    onCategoryChange(value)
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
                                value={forWho}
                                name="radio-buttons-group"
                                onChange={(event, value) => {
                                    onForWhoChange(value)
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

export default Filter