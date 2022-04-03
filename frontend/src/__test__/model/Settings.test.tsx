import Settings from '../../model/Settings';

const number = 64;

const settings = new Settings(number, number, number);

test('Settings class has all the attributes', () => {
  expect(settings.boardSize).toBe(number);
  expect(settings.tileAmount).toBe(number);
  expect(settings.turnLength).toBe(number);
});
