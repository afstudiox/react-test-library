import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('Teste se página contém um heading h2 com o texto Page requested not found', () => {
  renderWithRouter(<NotFound />);
  const titleElement = screen.getByRole('heading', {
    name: /page requested not found/i, level: 2 });
  expect(titleElement).toBeDefined();
});

test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  renderWithRouter(<NotFound />);
  const imgPoke = screen.getAllByRole('img');
  expect(imgPoke[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
