import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

test('Teste se a página contém as informações sobre a Pokédex.', () => {
  renderWithRouter(<About />);
  const titleElement = screen.getByRole('heading', { name: /about pokédex/i });
  expect(titleElement).toBeDefined();
});

test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
  renderWithRouter(<About />);
  const titleElement = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
  expect(titleElement).toBeDefined();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex..', () => {
  renderWithRouter(<About />);
  const p1 = 'This application simulates a Pokédex,'
  + ' a digital encyclopedia containing all Pokémons';
  const p1Element = screen.getByText(p1);
  expect(p1Element).toBeDefined();

  const p2 = 'One can filter Pokémons by type, and see'
  + ' more details for each one of them';
  const p2Element = screen.getByText(p2);
  expect(p2Element).toBeDefined();
});

test('Teste se a página contém a seguinte imagem de uma Pokédex: '
    + 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
  renderWithRouter(<About />);
  const source = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const imgElement = screen.getByRole('img');
  expect(imgElement).toHaveAttribute('src', source);
});
