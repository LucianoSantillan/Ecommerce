import { FC } from 'react';
import { Card, InputLabel, Pagination, SelectChangeEvent } from '@mui/material';
import ActionAreaCard from 'components/product';
import { Separator } from './Separator';
import { OrderBySelector } from "./List/OrderBySelector";

export const ProductList: FC<{
  products: any[];
  page: number;
  onPageChange: (value: number) => void;
  pages: number;
  totalItemsFound: number;
  onChangeOrderBy: (e: SelectChangeEvent<string>) => void;
  orderedBy: string;
}> = ({ products, page, onPageChange, pages, totalItemsFound, onChangeOrderBy, orderedBy }) => {

  return (
    <div>
      <Card style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', padding: '15px', alignItems: 'center' }}>
          <div>{totalItemsFound} Product/s found</div>
          <div style={{ flex: 1, padding: '0 20px' }}>
            <Separator />
          </div>
          <InputLabel style={{ marginRight: '5px' }} id="demo-simple-select-label">Order by</InputLabel>
          <OrderBySelector onChangeOrderBy={onChangeOrderBy} orderedBy={orderedBy} />
        </div>
      </Card>
      <div style={{ display: 'grid', gap: '5px', minWidth: '900px', }}>
        {products.length === 0 && <div>No products found</div>}
        {products.map((product, index) => {
          return (

            <div key={product.id}>
              <ActionAreaCard
                imgUrl={product.imgUrl}
                title={product.name}
                description={product.description}
                price={product.price} />
            </div>
          );
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

    </div>
  );
};
