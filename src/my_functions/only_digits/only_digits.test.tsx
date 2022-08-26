import { cleanup, findByTestId, render, screen, waitFor } from '@testing-library/react';
import ProductsList from 'pages/ProductsList/ProductsList';
import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import { createMemoryHistory } from 'history';
import { onlyDigits } from './only_digits';

test('Should return true if text only has digits', () => {
    expect(onlyDigits('156165161')).toBe(true)
    expect(onlyDigits('1')).toBe(true)
    expect(onlyDigits('05151')).toBe(true)
    expect(onlyDigits('84987981198')).toBe(true)

    expect(onlyDigits('')).toBe(false)
    expect(onlyDigits('asdasd')).toBe(false)
    expect(onlyDigits('1819118a')).toBe(false)
    expect(onlyDigits('bg81898')).toBe(false)
    expect(onlyDigits('1.2')).toBe(false)
    expect(onlyDigits('2,48')).toBe(false)
})

