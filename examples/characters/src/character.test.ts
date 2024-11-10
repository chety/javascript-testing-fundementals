import { describe, it, expect, vi } from 'vitest';
import { Character } from './character.js';
import { Person } from './person.js';

describe('Character', () => {
  const firstName = 'Grace';
  const lastName = 'Hopper';
  const role = 'Wizard';
  const level = 3;

  let character;

  beforeEach(() => {
    vi.spyOn(Math, 'random').mockImplementation(() => 0.9);
    character = new Character({ firstName, lastName, role, level });
  });

  it('should create a character with a first name, last name, and role', () => {
    expect(character).toEqual(
      expect.objectContaining({
        firstName: 'Grace',
        lastName: 'Hopper',
        role: 'Wizard',
        id: expect.stringContaining('person-'),
        strength: expect.any(Number),
        wisdom: 18,
      }),
    );
  });

  it('should allow you to increase the level', () => {
    expect(character.level).toBe(level);
    character.levelUp();

    expect(character.level).toBe(level + 1);
  });

  it('should update the last modified date when leveling up', () => {
    const originalDate = character.lastModified;

    character.levelUp();

    expect(character.lastModified).not.toBe(originalDate);
  });

  it('should roll a dice 6  times', () => {
    const rollMock = vi.fn(() => 10);
    character = new Character({
      firstName,
      lastName,
      role,
      level,
      roll: rollMock,
    });

    expect(character.strength).toBe(10);
    expect(rollMock).toHaveBeenCalledTimes(6);
    expect(rollMock).toHaveBeenCalledWith(4, 6);
    console.log(rollMock.mock.results);
  });
});
