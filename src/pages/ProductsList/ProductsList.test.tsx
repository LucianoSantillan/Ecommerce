import { render, screen, waitFor } from '@testing-library/react';
import ProductsList from 'pages/ProductsList/ProductsList';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import axios from 'axios';

test('should get products using the correct url when filters change', async () => {
  const axiosGet = jest.spyOn(
    axios,
    'get'
  );
  axiosGet.mockResolvedValue({
    data: {
      "products": [
        { "id": 2, "name": "remera rosa", "for_who": "woman", "description": "descripcion 2", "category": "t-shirt", "price": 110, "imgUrl": "https://www.estarguapas.com/pics/2021/04/20/killer-whale-camiseta-mujer-manga-corta-algodon-basica-rosa-s-47369.jpg" }
      ],
      "currentPage": "1",
      "pages": 2,
      "total": 4
    }
  })
  render(<BrowserRouter>
    <ProductsList /></BrowserRouter>);

  expect(axios.get).lastCalledWith(`http://localhost:4000/api/products?category=t-shirt&page=1&orderBy=fromHighToLowPrice&forWho=`);

  //IF SHOES CATEGORY IS SELECTED SHOULD REQUEST USING THE CORRECT QUERYPARAM
  const shoesOption = await screen.findByRole('radio', { name: 'Shoes' })
  userEvent.click(shoesOption)
  await waitFor(() => { //DO THIS TO AVOID ASYNCHRONOUS UPDATE ERROR
    screen.getByText('4 Product/s found')
  })
  expect(axios.get).lastCalledWith(`http://localhost:4000/api/products?category=shoes&page=1&orderBy=fromHighToLowPrice&forWho=`);

  //IF FOR MAN CATEGORY IS SELECTED SHOULD REQUEST USING THE CORRECT QUERYPARAM
  const forManOption = await screen.findByRole('radio', { name: 'Man' })
  userEvent.click(forManOption)
  expect(axios.get).lastCalledWith(`http://localhost:4000/api/products?category=shoes&page=1&orderBy=fromHighToLowPrice&forWho=man`);

  //IF fromLowToHighPrice FILTER IS SELECTED SHOULD REQUEST USING THE CORRECT QUERYPARAM
  const select = await screen.findByLabelText('Order by')
  userEvent.click(select)
  const fromLowToHighPriceOption = await screen.findByRole('option', { name: 'From low to high price' }) as HTMLOptionElement
  userEvent.click(fromLowToHighPriceOption)
  expect(axios.get).lastCalledWith(`http://localhost:4000/api/products?category=shoes&page=1&orderBy=fromLowToHighPrice&forWho=man`);
});

test('should show products received from api', async () => {
  render(<BrowserRouter>
    <ProductsList /></BrowserRouter>);
  await screen.findByText('remera negra');
  await screen.findByText('remera rosa');
});

test('should indicate page 1 when init', async () => {
  render(<BrowserRouter>
    <ProductsList /></BrowserRouter>);
  const buttonPage1 = await screen.findByText('1', { selector: 'button' })
  expect(buttonPage1).toHaveAttribute('aria-current', 'true');
});

test('should show page 2 button as selected when choosed', async () => {
  await render(<BrowserRouter>
    <ProductsList /></BrowserRouter>);
  const buttonPage2 = await screen.findByText('2', { selector: 'button' })
  await act(() => userEvent.click(buttonPage2))
  await waitFor(() => {
    expect(buttonPage2).toHaveAttribute('aria-current', 'true');
  })
});

test('should show page 2 writen in url when page 2 button is clicked', async () => {
  render(<BrowserRouter>
    <ProductsList /></BrowserRouter>);
  const buttonPage2 = await screen.findByText('2', { selector: 'button' })
  await act(() => userEvent.click(buttonPage2))
  expect(new URLSearchParams(window.location.search).get('page')).toBe('2')
});

test('should show found products total from request response', async () => {
  render(<BrowserRouter>
    <ProductsList /></BrowserRouter>);
  await screen.findByText('4 Product/s found');
});

test('should set "Lower price" option as default value', async () => {
  await render(<BrowserRouter>
    <ProductsList /></BrowserRouter>);
  const select = await screen.findByLabelText('Order by')
  await act(() => userEvent.click(select))
  const lowerPriceOption = await screen.findByRole('option', { name: 'From high to low price' }) as HTMLOptionElement
  expect(lowerPriceOption.selected).toBe(true);
});

test('should show the selected option when it is choosed', async () => {
  await render(<BrowserRouter>
    <ProductsList /></BrowserRouter>);
  const select = await screen.findByLabelText('Order by')
  await act(() => userEvent.click(select))
  const higherPriceOption = await screen.findByRole('option', { name: 'From low to high price' }) as HTMLOptionElement
  await act(() => userEvent.click(higherPriceOption))
  expect(higherPriceOption.selected).toBe(true);
});
