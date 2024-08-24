import { IconHeart, IconTrash } from '@tabler/icons-react';
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import classes from './TripCard.module.css';

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
  isFav: boolean;
  setIsFav: (favs: any) => void;
  index: number;
}

const imageIDs = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

/**
 * TripCard component that displays information about a trip.
 * Includes options to add to favorites, remove from favorites, or delete the trip.
 *
 * @component
 * @param {TripCardProps} props - The properties for the TripCard component.
 * @returns {JSX.Element} The rendered TripCard component.
 */
export default function TripCard({
  budget,
  people,
  placesDates,
  prefs,
  uniqId,
  setData,
  isFav,
  setIsFav,
  index,
}: TripCardProps) {
  const preferences = prefs.map((pref) => (
    <Badge variant="light" key={pref}>
      {pref}
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
    setIsFav(favourites);
  };

  /**
   * Remove the current trip from favorites.
   */
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
    setIsFav(favourites.filter((favId: string) => favId !== uniqId));
  };

  /**
   * Delete the current trip from both requests and favorites.
   */
  const deleteTrip = () => {
    const reqs = localStorage.getItem('requests');
    let requests;

    if (reqs) {
      requests = JSON.parse(reqs);
    } else {
      requests = [];
    }

    const favs = localStorage.getItem('favourites');
    let favourites;

    if (favs) {
      favourites = JSON.parse(favs);
    } else {
      favourites = [];
    }

    localStorage.setItem(
      'requests',
      JSON.stringify(requests.filter((req: any) => req.uniqId !== uniqId))
    );
    localStorage.setItem(
      'favourites',
      JSON.stringify(favourites.filter((favId: string) => favId !== uniqId))
    );
    setIsFav(favourites.filter((favId: string) => favId !== uniqId));
    setData(requests.filter((req: any) => req.uniqId !== uniqId));
  };

  return (
    <Card h="100%" withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image
          src={`https://picsum.photos/id/${imageIDs[index % 10]}/500/300`}
          alt={placesDates[0].place}
          height={180}
        />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {placesDates[0].place}
          </Text>
          <Badge size="md" variant="light">
            {`Cost: $${budget}`}
          </Badge>
          <Badge size="md" variant="light">
            {`Size: ${people}`}
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
        <Button
          component={Link}
          to={`/trip/${uniqId}`}
          variant="light"
          radius="md"
          style={{ flex: 1 }}
        >
          Show itinerary
        </Button>
        <ActionIcon
          onClick={() => {
            if (isFav) {
              removeFromFavourites();
              notifications.show({
                title: 'Removed from favourites',
                message: 'This trip has been removed from your favourites',
              });
            } else {
              addToFavourites();
              notifications.show({
                title: 'Added to favourites',
                message: 'This trip has been added to your favourites',
              });
            }
          }}
          variant="default"
          radius="md"
          size={36}
        >
          <IconHeart fill={isFav ? '#FA5252' : '#3B3B3B'} className={classes.like} stroke={1.5} />
        </ActionIcon>
        <ActionIcon onClick={deleteTrip} variant="default" radius="md" size={36}>
          <IconTrash className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
