import { IconHeart, IconTrash } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import classes from './TripCard.module.css';
import React from 'react';

interface TripCardProps {
  budget: string;
  people: string | number;
  placesDates: [
    {
      place: string;
      date: [Date, Date];
    },
  ];
  prefs: string[];
  uniqId: string;
  setData: (requests: any) => void;
}

const imageIDs = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

export default function TripCard({
  budget,
  people,
  placesDates,
  prefs,
  uniqId,
  setData,
}: TripCardProps) {
  const [cardData, setCardData] = React.useState<any>(null);

  React.useEffect(() => {
    const favs = localStorage.getItem('favourites');
    setCardData({
      budget,
      people,
      placesDates,
      prefs,
      uniqId,
      setData,
      isFav: favs ? JSON.parse(favs).includes(uniqId) : false,
    });
  }, []);

  const preferences = prefs.map((pref) => (
    <Badge variant="light" key={pref}>
      {cardData.pref}
    </Badge>
  ));

  const addToFavourites = () => {
    const favs = localStorage.getItem('favourites');
    let favourites;

    if (favs) {
      favourites = JSON.parse(favs);
    } else {
      favourites = [];
    }

    favourites.push(uniqId);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    cardData.favs.push(uniqId);
  };

  const removeFromFavourites = () => {
    const favs = localStorage.getItem('favourites');
    let favourites;

    if (favs) {
      favourites = JSON.parse(favs);
    } else {
      favourites = [];
    }

    localStorage.setItem(
      'favourites',
      JSON.stringify(favourites.filter((favId: string) => favId !== uniqId))
    );
    setCardData({ ...cardData, favs: cardData.favs.filter((favId: string) => favId !== uniqId) });
  };

  const deleteTrip = () => {
    const reqs = localStorage.getItem('requests');
    let requests;

    if (reqs) {
      requests = JSON.parse(reqs);
    } else {
      requests = [];
    }

    localStorage.setItem(
      'requests',
      JSON.stringify(requests.filter((req: any) => req.uniqId !== uniqId))
    );
    setData(requests.filter((req: any) => req.uniqId !== uniqId));
  };

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image
          src={`https://picsum.photos/id/${imageIDs[Math.floor(Math.random() * imageIDs.length)]}/500/300`}
          alt={cardData.placesDates[0].place}
          height={180}
        />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {cardData.placesDates[0].place}
          </Text>
          <Badge size="md" variant="light">
            {`Cost: ${cardData.budget}`}
          </Badge>
          <Badge size="md" variant="light">
            {cardData.people}
          </Badge>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          Activities included
        </Text>
        <Group gap={7} mt={5}>
          {preferences}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Show itinerary
        </Button>
        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className={classes.like} stroke={1.5} />
        </ActionIcon>
        <ActionIcon onClick={deleteTrip} variant="default" radius="md" size={36}>
          <IconTrash className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
