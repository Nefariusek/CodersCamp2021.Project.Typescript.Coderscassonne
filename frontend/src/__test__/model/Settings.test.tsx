import Settings from '../../model/Settings';

const number = 32;
const time = 30;

const settings = new Settings(time, number, number, number);

test('Settings class has all the attributes', () => {
  expect(settings.boardSizeX).toBe(number);
  expect(settings.boardSizeY).toBe(number);
  expect(settings.tileAmount).toBe(number);
  expect(settings.turnLength).toBe(time);
});
