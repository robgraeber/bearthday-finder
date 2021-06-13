import React from 'react';
import Home from 'src/pages/index';
import { fireEvent, render } from 'src/tests/testUtils';

describe('Home page', () => {
  it('can submit a date and go to the next page', async () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    const router = { push: jest.fn() };
    useRouter.mockReturnValue(router);

    const { container } = render(<Home />, {});

    const dateInput = container.querySelector('input');

    if (dateInput) {
      fireEvent.change(dateInput, { target: { value: '07/20/2000' } });
    }

    (container.querySelector('#submit-button') as HTMLButtonElement).click();

    expect(router.push).toHaveBeenCalledWith('/image?date=2000-07-19');
  });
});
