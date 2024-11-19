import { it, expect, describe, vi } from 'vitest';
import { Game } from './game';

describe('Game', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });
  it('should return an instance of a game', () => {
    // This is mostly a dummy test.
    const game = new Game();
    expect(game).toBeInstanceOf(Game);
    const secret = game.secretNumber;
    expect(secret).toBeTypeOf('number');
  });

  it('should return Too low! if number is lower than the secret', () => {
    const game = new Game(2, 20);
    const secret = game.secretNumber;

    const guess = game.guess(secret - 1);
    expect(guess).toBe('Too low!');
  });

  it('should return Too high! if the guess is higher than the secret', () => {
    const game = new Game(2, 20);
    const secret = game.secretNumber;

    const guess = game.guess(secret + 1);
    expect(guess).toBe('Too high!');
  });

  it('should return You already guessed that number! if the user guesses the same number', () => {
    const game = new Game(2, 20);
    const secret = game.secretNumber;
    game.guess(secret + 1);
    const guess = game.guess(secret + 1);
    expect(guess).toBe('You already guessed that number!');
  });

  it('should return correct message if the user guesses the secret', () => {
    const game = new Game(2, 20);
    const secret = game.secretNumber;

    game.guess(secret + 1);
    game.guess(secret - 1);
    game.guess(secret - 1);
    const guess = game.guess(secret);
    expect(guess).toBe('Correct! You guessed the number in 3 attempts.');
  });
});
