import { Container, Grid, Title, Text } from '@mantine/core';
import React from 'react';
import classes from './AllTripsPage.module.css';
import TripCard from './TripCard';

export default function AllTripsPage() {
  const [data, setData] = React.useState<any>(null);
  const [isfavs, setisFavs] = React.useState<any>(null);

  React.useEffect(() => {
    const reqs = localStorage.getItem('requests');
    const favs = localStorage.getItem('favourites');
    if (reqs) {
      setData(JSON.parse(reqs));
    } else {
      setData([]);
    }
    if (favs) {
      setisFavs(JSON.parse(favs));
    }
  }, []);

  const reqCards = data?.map((dataItem: any, index: number) => (
    <Grid.Col span={{ base: 12, xs: 4 }} key={index}>
      <TripCard
        budget={dataItem.budget}
        people={dataItem.people}
        placesDates={dataItem.placesDates}
        prefs={dataItem.prefs}
        uniqId={dataItem.uniqId}
        setData={setData}
        isFav={isfavs ? isfavs.includes(dataItem.uniqId) : false}
        setIsFav={setisFavs}
      />
    </Grid.Col>
  ));

  return (
    <Container className={classes.wrapper} size={1000}>
      <Title ta="center" mt={-30} mb={40} order={2}>
        Your trip itenaries
      </Title>
      <Grid>
        {reqCards !== undefined && reqCards && reqCards.length !== 0 ? (
          reqCards
        ) : (
          <Grid.Col span={{ base: 12, xs: 12 }}>
            <Text ta="center">No Trips Created Yet</Text>
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
}
