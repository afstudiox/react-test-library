import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Teste se é exibido na tela a mensagem No favorite pokemon found,'
+ ' se a pessoa não tiver pokémons favoritos.', () => {
  renderWithRouter(<App />);
  const linkElement = screen.getByRole('link', { name: /Favorite Pokémons/i });

  userEvent.click(linkElement);

  const msg = screen.getByText(/no favorite pokemon found/i);
  expect(msg).toBeDefined();
});

test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
  const { history } = renderWithRouter(<App />);

  const details = screen.getByRole('link', { name: /More Details/i });
  expect(details).toBeDefined();

  userEvent.click(details);

  const check = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  expect(check).toBeDefined();

  userEvent.click(check);

  history.push('/favorites');

  const favorite = screen.getByText(/electric/i);
  expect(favorite).toBeDefined();
});
