import { cleanup, findByTestId, render, screen, waitFor } from '@testing-library/react';
import ProductsList from 'pages/ProductsList/ProductsList';
import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import { createMemoryHistory } from 'history';



describe('ProductsList', () => {

  const axiosGet = jest.spyOn(
    axios,
    'get'
  );

  beforeEach(() => {
    axiosGet.mockResolvedValue({
      data: {
        "products": [
          { "id": 2, "name": "remera negra", "for_who": "woman", "description": "descripcion 2", "category": "t-shirt", "price": 110, "imgUrl": "https://www.estarguapas.com/pics/2021/04/20/killer-whale-camiseta-mujer-manga-corta-algodon-basica-rosa-s-47369.jpg" },
          { "id": 3, "name": "remera rosa", "for_who": "woman", "description": "descripcion 2", "category": "t-shirt", "price": 110, "imgUrl": "https://www.estarguapas.com/pics/2021/04/20/killer-whale-camiseta-mujer-manga-corta-algodon-basica-rosa-s-47369.jpg" }
        ],
        "currentPage": "1",
        "pages": 2,
        "total": 4
      }
    })
  });

  test('should get products using the correct url when filters change', async () => {
    render(<MemoryRouter>
      <ProductsList /></MemoryRouter>);

    expect(axios.get).lastCalledWith(`http://localhost:4000/api/products?category=t-shirt&page=1&orderBy=fromHighToLowPrice&forWho=&minPrice=&maxPrice=`);

    //IF SHOES CATEGORY IS SELECTED SHOULD REQUEST USING THE CORRECT QUERYPARAM
    const shoesOption = await screen.findByRole('radio', { name: 'Shoes' })
    userEvent.click(shoesOption)
    await waitFor(() => { //DO THIS TO AVOID ASYNCHRONOUS UPDATE ERROR
      screen.getByText('4 Product/s found')
    })
    expect(axios.get).lastCalledWith(`http://localhost:4000/api/products?category=shoes&page=1&orderBy=fromHighToLowPrice&forWho=&minPrice=&maxPrice=`);

    //IF FOR MAN CATEGORY IS SELECTED SHOULD REQUEST USING THE CORRECT QUERYPARAM
    const forManOption = await screen.findByRole('radio', { name: 'Man' })
    userEvent.click(forManOption)
    expect(axios.get).lastCalledWith(`http://localhost:4000/api/products?category=shoes&page=1&orderBy=fromHighToLowPrice&forWho=man&minPrice=&maxPrice=`);

    //IF fromLowToHighPrice FILTER IS SELECTED SHOULD REQUEST USING THE CORRECT QUERYPARAM
    const select = await screen.findByLabelText('Order by')
    userEvent.click(select)
    const fromLowToHighPriceOption = await screen.findByRole('option', { name: 'From low to high price' }) as HTMLOptionElement
    userEvent.click(fromLowToHighPriceOption)
    expect(axios.get).lastCalledWith(`http://localhost:4000/api/products?category=shoes&page=1&orderBy=fromLowToHighPrice&forWho=man&minPrice=&maxPrice=`);
  });

  test('should show products received from api', async () => {
    render(<MemoryRouter>
      <ProductsList /></MemoryRouter>);
    await screen.findByText('remera negra');
    await screen.findByText('remera rosa');
  });

  test('should indicate page 1 when init', async () => {
    render(<MemoryRouter>
      <ProductsList /></MemoryRouter>);
    const buttonPage1 = await screen.findByText('1', { selector: 'button' })
    expect(buttonPage1).toHaveAttribute('aria-current', 'true');
  });

  test('should show page 2 button as selected when choosed', async () => {
    render(<MemoryRouter>
      <ProductsList /></MemoryRouter>);
    const buttonPage2 = await screen.findByText('2', { selector: 'button' })
    act(() => userEvent.click(buttonPage2))
    await waitFor(() => {
      expect(buttonPage2).toHaveAttribute('aria-current', 'true');
    })
  });

  test('should show page 2 writen in url when page 2 button is clicked', async () => {
    const history = createMemoryHistory();
    render(
      <Router navigator={history} location={'/'}>
        <ProductsList />
      </Router>
    );
    const buttonPage2 = await screen.findByText('2', { selector: 'button' })
    act(() => userEvent.click(buttonPage2))
    expect(new URLSearchParams(history.location.search).get('page')).toBe('2')
  });

  test('should show found products total from request response', async () => {
    render(<MemoryRouter>
      <ProductsList /></MemoryRouter>);
    await screen.findByText('4 Product/s found');
  });

  test('should set "Lower price" option as default value', async () => {
    render(<MemoryRouter>
      <ProductsList /></MemoryRouter>);
    const select = await screen.findByLabelText('Order by')
    act(() => userEvent.click(select))
    const lowerPriceOption = await screen.findByRole('option', { name: 'From high to low price' }) as HTMLOptionElement
    expect(lowerPriceOption.selected).toBe(true);
  });

  test('should show the selected option when it is choosed', async () => {
    render(<MemoryRouter>
      <ProductsList /></MemoryRouter>);
    const select = await screen.findByLabelText('Order by')
    act(() => userEvent.click(select))
    const higherPriceOption = await screen.findByRole('option', { name: 'From low to high price' }) as HTMLOptionElement
    act(() => userEvent.click(higherPriceOption))
    expect(higherPriceOption.selected).toBe(true);
  });

  test('when we set maxPrice and we go ahead should set the url query param', async () => {
    render(<MemoryRouter>
      <ProductsList /></MemoryRouter>);
    let maxPriceInput = screen.getByPlaceholderText('Max')
    userEvent.type(maxPriceInput, '500')
    const searchBtn = await screen.findByTestId('go-search-by-price-btn')
    userEvent.click(searchBtn)
    await waitFor(() => expect(axios.get).lastCalledWith(`http://localhost:4000/api/products?category=t-shirt&page=1&orderBy=fromHighToLowPrice&forWho=&minPrice=&maxPrice=500`))
  })

  test('when we set minPrice and we go ahead should set the url query param', async () => {
    render(<MemoryRouter>
      <ProductsList /></MemoryRouter>);
    let minPriceInput
    minPriceInput = screen.getByPlaceholderText('Min')
    userEvent.type(minPriceInput, '155')
    const searchBtn = await screen.findByTestId('go-search-by-price-btn')
    userEvent.click(searchBtn)
    await waitFor(() => expect(axios.get).lastCalledWith(`http://localhost:4000/api/products?category=t-shirt&page=1&orderBy=fromHighToLowPrice&forWho=&minPrice=155&maxPrice=`))
  })

  test('when minPrice and maxPrice values are equals to url query params. Go ahead btn should be disabled', async () => {
    render(<MemoryRouter initialEntries={['/?minPrice=155&maxPrice=']}>
      <ProductsList /></MemoryRouter>);
    const searchBtn = await screen.findByTestId('go-search-by-price-btn')
    expect(searchBtn).toBeDisabled()
  })

  test('when minPrice and maxPrice values are equals to url query params. Go ahead btn should be disabled', async () => {
    render(<MemoryRouter initialEntries={['/?minPrice=155&maxPrice=']}>
      <ProductsList /></MemoryRouter>);
    const searchBtn = await screen.findByTestId('go-search-by-price-btn')
    expect(searchBtn).toBeDisabled()
  })

  test('when minPrice is different from url query param. Go ahead btn should be enabled.', async () => {
    render(<MemoryRouter initialEntries={['/?minPrice=155&maxPrice=']}>
      <ProductsList /></MemoryRouter>);
    let minPriceInput = screen.getByPlaceholderText('Min')
    act(() => userEvent.type(minPriceInput, '1'))
    const searchBtn = await screen.findByTestId('go-search-by-price-btn')
    await waitFor(() => {expect(searchBtn).not.toBeDisabled()})
  })

  test('when maxPrice is different from url query param. Go ahead btn should be enabled.', async () => {
    render(<MemoryRouter initialEntries={['/?minPrice=155&maxPrice=']}>
      <ProductsList /></MemoryRouter>);
    let maxPriceInput = screen.getByPlaceholderText('Max')
    act(() => userEvent.type(maxPriceInput, '1'))
    const searchBtn = await screen.findByTestId('go-search-by-price-btn')
    await waitFor(() => {expect(searchBtn).not.toBeDisabled()})
  })

  test('when the url comes with price query params then price inputs range should copy the same values', async () => {
    render(<MemoryRouter initialEntries={['/?minPrice=155&maxPrice=800']}>
      <ProductsList /></MemoryRouter>);
    let maxPriceInput = screen.getByPlaceholderText('Max')
    let minPriceInput = screen.getByPlaceholderText('Min')
    expect(maxPriceInput).toHaveValue('800')
    await waitFor(() => expect(minPriceInput).toHaveValue('155'))
  })

})