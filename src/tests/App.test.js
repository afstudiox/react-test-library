import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe(
  'Teste se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    test('O primeiro link deve possuir o texto Home.', () => {
      renderWithRouter(<App />);
      const linkElement = screen.getByRole('link', { name: /Home/i });
      expect(linkElement).toBeDefined();
    });

    test('O primeiro link deve possuir o texto About.', () => {
      renderWithRouter(<App />);
      const linkElement = screen.getByRole('link', { name: /About/i });
      expect(linkElement).toBeDefined();
    });

    test('O primeiro link deve possuir o texto Favorite Pokémons.', () => {
      renderWithRouter(<App />);
      const linkElement = screen.getByRole('link', { name: /Favorite Pokémons/i });
      expect(linkElement).toBeDefined();
    });
  },
);

test(
  'Testando redirecionamento para a rota "/" clicando no link Home.', () => {
    const { history } = renderWithRouter(<App />);
    const linkElement = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkElement);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  },
);

test(
  'Testando redirecionamento para a rota "/about" clicando no link About.', () => {
    const { history } = renderWithRouter(<App />);
    const linkElement = screen.getByRole('link', { name: /About/i });
    expect(linkElement).toBeDefined();
    userEvent.click(linkElement);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  },
);

test(
  'Testando redirecionamento para a rota "/favorites"'
  + 'clicando no link Favorite Pokémons.', () => {
    const { history } = renderWithRouter(<App />);
    const linkElement = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkElement).toBeDefined();
    userEvent.click(linkElement);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  },
);

test(
  'Testando redirecionamento para a página NotFound'
  + 'ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/url-desconhecida');

    const notFoundTitle = screen.getByRole('heading',
      { name: /Page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  },
);
