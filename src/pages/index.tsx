import { KeyboardDatePicker } from '@material-ui/pickers';
import { format } from 'date-fns';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from 'src/styles/Home.module.css';

export default function Home() {
  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const router = useRouter();

  function onSubmitButtonClick() {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');

    router.push(`/image?date=${formattedDate}`);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Bearthday Finder</title>
        <meta name="description" content="Find your birthday earth picture" />
      </Head>

      <main className={styles.main}>
        <h1>Bearthday Finder</h1>

        <h3>Enter your birthday to find your Bearthday Image:</h3>
        <KeyboardDatePicker
          disableFuture={true}
          inputVariant="outlined"
          autoOk={true}
          openTo="year"
          variant="inline"
          format="MM/dd/yyyy"
          onChange={(date) => {
            if (date) {
              date.setUTCHours(0, 0, 0, 0);
              setSelectedDate(date);
            }
          }}
          value={selectedDate}
        />

        <button id="submit-button" className={styles.submitButton} onClick={onSubmitButtonClick}>
          Submit
        </button>
      </main>
    </div>
  );
}
