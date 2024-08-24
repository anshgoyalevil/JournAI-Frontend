import { Container, Grid, Title, Text } from '@mantine/core';
import React from 'react';
import classes from './AllTripsPage.module.css';
import TripCard from './TripCard';

/**
 * AllTripsPage component that displays a list of trip itineraries.
 * Fetches trip data and favorite status from local storage and renders
 * a grid of TripCard components.
 *
 * @component
 * @returns {JSX.Element} The rendered AllTripsPage component.
 */
export default function AllTripsPage() {
  // State variables to hold trip data and favorite status
  const [data, setData] = React.useState<any>(null);
  const [isfavs, setisFavs] = React.useState<any>(null);

  // Fetch data from local storage when component mounts
  React.useEffect(() => {
    const reqs = localStorage.getItem('requests');
    const favs = localStorage.getItem('favourites');

    if (reqs) {
      // Set trip data from local storage
      setData(JSON.parse(reqs));
    } else {
      // Initialize with empty array if no data
      setData([]);
    }

    if (favs) {
      // Set favorite IDs from local storage
      setisFavs(JSON.parse(favs));
    }
  }, []);

  // Generate grid columns with TripCard components for each trip
  const reqCards = data?.map((dataItem: any, index: number) => (
    <Grid.Col span={{ base: 12, xs: 4 }} key={index}>
      <TripCard
        budget={dataItem.budget}
        people={dataItem.people}
        placesDates={dataItem.placesDates}
        prefs={dataItem.prefs}
        uniqId={dataItem.uniqId}
        setData={setData}
        isFav={isfavs ? isfavs.includes(dataItem.uniqId) : false} // Check if the trip is a favorite
        setIsFav={setisFavs}
        index={index}
      />
    </Grid.Col>
  ));

  return (
    <Container className={classes.wrapper} size={1000}>
      <Title ta="center" mt={-30} mb={40} order={2}>
        Your trip itineraries
      </Title>
      <Grid>
        {reqCards && reqCards.length > 0 ? (
          reqCards // Render trip cards if there are any
        ) : (
          <Grid.Col span={{ base: 12, xs: 12 }}>
            <Text ta="center">No Trips Created Yet</Text>
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
}
