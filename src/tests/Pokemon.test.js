import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// test('', () => {});

const linkPikachu = '/pokemons/25';

test('O nome correto do Pokémon deve ser mostrado na tela', () => {
  const { history } = renderWithRouter(<App />);
  history.push(linkPikachu);
  const nome = screen.getByTestId('pokemon-name');
  expect(nome).toBeDefined();
  expect(nome.innerHTML).not.toBeUndefined();
});

test('O tipo correto do Pokémon deve ser mostrado na tela', () => {
  const { history } = renderWithRouter(<App />);
  history.push(linkPikachu);
  const tipo = screen.getByTestId('pokemon-type');
  expect(tipo).toBeDefined();
  console.log(tipo.innerHTML);
  expect(tipo.innerHTML).toBe('Electric');
});

test('_O peso médio do pokémon deve ser exibido com um texto no formato'
+ 'Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit>'
+ 'são, respectivamente, o peso médio do pokémon e sua unidade de medida.', () => {
  const { history } = renderWithRouter(<App />);
  history.push(linkPikachu);
  const correctText = 'Average weight: 6.0 kg';
  const peso = screen.getByTestId('pokemon-weight');
  expect(peso.innerHTML).toBe(correctText);
});

test('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo'
+ 'src com a URL da imagem e um atributo alt com o texto <name> sprite,'
+ 'onde <name> é o nome do pokémon', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/pokemons/25');
  const sprite = screen.getByRole('img', { name: /pikachu sprite/i });
  expect(sprite.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(sprite.alt).toBe('Pikachu sprite');
});

test('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo'
+ 'src com a URL da imagem e um atributo alt com o texto <name> sprite,'
+ 'onde <name> é o nome do pokémon', () => {
  renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: /more details/i });
  expect(link.href).toContain(linkPikachu);
});

test('Teste se ao clicar no link de navegação do Pokémon, '
+ 'é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
  renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: /more details/i });
  userEvent.click(link);
  const title = screen.getByRole('heading', { name: /pikachu details/i });
  expect(title).toBeDefined();
});

test('Teste também se a URL exibida no navegador muda para /pokemon/<id>, '
+ 'onde <id> é o id do Pokémon cujos detalhes se deseja ver.', () => {
  const { history } = renderWithRouter(<App />);
  history.push(linkPikachu);
  const url = history.location.pathname;
  expect(url).toBe(linkPikachu);
});

test('O ícone deve ser uma imagem com o atributo src contendo'
+ ' o caminho /star-icon.svg', () => {
  const { history } = renderWithRouter(<App />);
  history.push(linkPikachu);
  const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });

  if (!checkFavorite.checked) { userEvent.click(checkFavorite); }

  const imagem = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(imagem.src).toContain('/star-icon.svg');
});

test('A imagem deve ter o atributo alt igual a <pokemon> is marked '
+ ' as favorite, onde <pokemon> é o nome do Pokémon exibido.', () => {
  const { history } = renderWithRouter(<App />);
  history.push(linkPikachu);
  const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });

  if (!checkFavorite.checked) { userEvent.click(checkFavorite); }

  const imagem = screen.getByAltText(/pikachu is marked as favorite/i);
  expect(imagem).toBeDefined();
});
