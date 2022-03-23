import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
  renderWithRouter(<App />);
  const title = screen.getByRole('heading', { name: /Encountered pokémons/i });
  expect(title).toBeDefined();
});

describe('Teste se é exibido o próximo Pokémon da lista'
  + ' quando o botão Próximo pokémon é clicado.', () => {
  test('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnNext).toHaveTextContent(/próximo pokémon/i);
  });

  test('Os próximos Pokémons da lista devem ser mostrados,'
  + ' um a um, ao clicar sucessivamente no botão'
  + ' AND '
  + ' O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,'
  + ' se estiver no último Pokémon da lista', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokemonsArray = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
      'Pikachu'];
    pokemonsArray.forEach((pokemon) => {
      const namePokemon = screen.getByText(pokemon);
      expect(namePokemon).toBeDefined();
      userEvent.click(btnNext);
    });
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const title = screen.getAllByTestId('pokemon-name');
    expect(title.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const btnFilter = screen.getAllByRole('button');
    const numFilters = 8;

    const btnCheck = btnFilter
      .filter((_item, index) => btnFilter[index]
        .className === 'button-text filter-button');

    expect(btnCheck.length).toBe(numFilters);
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    renderWithRouter(<App />);
    const btnClear = screen.getByRole('button', { name: /all/i });
    expect(btnClear).toBeDefined();

    userEvent.click(btnClear);
  });

  test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic;.', () => {
    renderWithRouter(<App />);
    const btnText = screen.getByRole('button', { name: /Psychic/i });

    userEvent.click(btnText);

    const text = screen.getByTestId('pokemon-type', { name: /Psychic/i });

    expect(btnText.innerHTML).toBe(text.innerHTML);
  });

  test('A partir da seleção de um botão de tipo, a Pokédex '
  + 'deve circular somente pelos pokémons daquele tipo.', () => {
    renderWithRouter(<App />);
    const verified = 7;
    const btnTypeTest = screen.getAllByTestId('pokemon-type-button');
    expect(btnTypeTest.length).toBe(verified);
  });
});
