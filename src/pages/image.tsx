import { NextPageContext } from 'next';
import Head from 'next/head';
import React from 'react';
import {
  fetchAllValidDates,
  fetchImageMetadatas,
  getEarthImageUrl,
} from 'src/services/NasaService';
import styles from 'src/styles/Image.module.css';
import { getMostRecentPastBirthDate } from 'src/utils/DateUtils';

type PageProps = {
  imageUrl: string;
  selectedDate: string;
  isBearthDay: Boolean;
};

export async function getServerSideProps(context: NextPageContext) {
  // Valid dates is expected to be sorted from newest to oldest from the API.
  const validDates = await fetchAllValidDates();
  const birthday = typeof context.query.date === 'string' ? context.query.date : null;
  const mostRecentPastBirthDate = birthday ? getMostRecentPastBirthDate(birthday) : null;
  let selectedDate = mostRecentPastBirthDate;

  // If date is not in validDates list, then find next valid date after the date.
  if (selectedDate && !validDates.includes(selectedDate)) {
    const targetDate = new Date(selectedDate);
    const reverseValidDates = [...validDates].reverse();

    selectedDate = reverseValidDates.find((dateStr) => new Date(dateStr) > targetDate) || null;
  }

  // If no date is still found, then use the most recent valid date.
  if (!selectedDate) {
    selectedDate = validDates[0];
  }

  const imageMetadatas = await fetchImageMetadatas(selectedDate);

  if (imageMetadatas.length) {
    return {
      props: {
        selectedDate,
        imageUrl: getEarthImageUrl(selectedDate, imageMetadatas[0].image),
        isBearthDay: selectedDate === mostRecentPastBirthDate,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Image(props: PageProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bearthday Finder</title>
        <meta name="description" content="See your exclusive bearthday picture" />
      </Head>

      <main className={styles.main}>
        <h1>Your Bearthday Image</h1>
        <img className={styles.earthImage} src={props.imageUrl}></img>
        <p>
          {props.isBearthDay
            ? `This is your bearthday image on ${props.selectedDate}`
            : `This is the closest date image on ${props.selectedDate}`}
        </p>
      </main>
    </div>
  );
}
