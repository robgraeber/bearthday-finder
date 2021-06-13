import { getMostRecentPastBirthDate } from 'src/utils/DateUtils';
import MockDate from 'mockdate';

describe('Unit | Utils | DateUtils', () => {
  afterEach(() => {
    MockDate.reset();
  });

  it('gets the most recent birthday that has already past', () => {
    MockDate.set(new Date('2020-06-01'));
    expect(getMostRecentPastBirthDate('2000-05-01')).toEqual('2020-05-01');

    MockDate.set(new Date('2020-04-01'));
    expect(getMostRecentPastBirthDate('2000-05-01')).toEqual('2019-05-01');

    MockDate.set(new Date('2020-05-01'));
    expect(getMostRecentPastBirthDate('2000-05-01')).toEqual('2020-05-01');

    MockDate.set(new Date('2020-06-01'));
    expect(getMostRecentPastBirthDate('2030-05-01')).toEqual('2020-05-01');
  });
});
