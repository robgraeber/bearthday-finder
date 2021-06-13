import React from 'react';
import Image, { getServerSideProps } from 'src/pages/image';
import { render } from 'src/tests/testUtils';

describe('Home page', () => {
  it('renders correctly on your bearth day', async () => {
    const { container } = render(
      <Image
        imageUrl="http://example.com/foobar.png"
        isBearthDay={true}
        selectedDate={'2020-10-01'}
      />,
      {}
    );

    expect(container.querySelector('p')?.textContent).toEqual(
      'This is your bearthday image on 2020-10-01'
    );
    expect(container.querySelector('img')?.src).toEqual('http://example.com/foobar.png');
  });

  it('renders correctly when it is not your bearth day', async () => {
    const { container } = render(
      <Image
        imageUrl="http://example.com/foobar.png"
        isBearthDay={false}
        selectedDate={'2020-10-01'}
      />,
      {}
    );

    expect(container.querySelector('p')?.textContent).toEqual(
      'This is the closest date image on 2020-10-01'
    );
    expect(container.querySelector('img')?.src).toEqual('http://example.com/foobar.png');
  });

  it('loads the data correctly initially when there is a valid bearthday', async () => {
    const NasaService = require('src/services/NasaService');

    const fetchAllValidDates = jest.spyOn(NasaService, 'fetchAllValidDates');
    fetchAllValidDates.mockReturnValue(Promise.resolve(['2020-10-01', '2020-09-01', '2020-08-01']));

    const fetchImageMetadatas = jest.spyOn(NasaService, 'fetchImageMetadatas');
    fetchImageMetadatas.mockReturnValue(
      Promise.resolve([{ image: 'foobar123', caption: 'awesome caption' }])
    );

    const context: any = {
      query: { date: '2000-10-01' },
    };

    const value = await getServerSideProps(context);

    expect(value).toEqual({
      props: {
        imageUrl:
          'https://api.nasa.gov/EPIC/archive/enhanced/2020/10/01/png/foobar123.png?api_key=DEMO_KEY',
        isBearthDay: true,
        selectedDate: '2020-10-01',
      },
    });
  });

  it('finds the next closest bearthday if there is not a valid one', async () => {
    const NasaService = require('src/services/NasaService');

    const fetchAllValidDates = jest.spyOn(NasaService, 'fetchAllValidDates');
    fetchAllValidDates.mockReturnValue(Promise.resolve(['2020-10-01', '2020-09-01', '2020-08-01']));

    const fetchImageMetadatas = jest.spyOn(NasaService, 'fetchImageMetadatas');
    fetchImageMetadatas.mockReturnValue(
      Promise.resolve([{ image: 'foobar123', caption: 'awesome caption' }])
    );

    const context: any = {
      query: { date: '2000-08-02' },
    };

    const value = await getServerSideProps(context);

    expect(value).toEqual({
      props: {
        imageUrl:
          'https://api.nasa.gov/EPIC/archive/enhanced/2020/09/01/png/foobar123.png?api_key=DEMO_KEY',
        isBearthDay: false,
        selectedDate: '2020-09-01',
      },
    });
  });
});
