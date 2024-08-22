import { Container, Timeline, Text, Title } from '@mantine/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { IconMapPin, IconClock, IconCurrencyDollar } from '@tabler/icons-react';
import classes from './TripPage.module.css';

// Sample JSON data
const sampleData = {
  data: {
    trip: [
      {
        destination: 'Bangalore',
        budget: 150.0,
        duration: 1,
        itinerary: {
          day: 1,
          activities: [
            {
              name: 'Visit the Bangalore Palace',
              cost: 10.0,
              duration: 3,
            },
            {
              name: 'Explore the Cubbon Park',
              cost: 5.0,
              duration: 2,
            },
            {
              name: 'Attend an evening Aarti at the ISKCON Temple',
              cost: 0.0,
              duration: 2,
            },
            {
              name: 'Enjoy dinner at a local restaurant',
              cost: 15.0,
              duration: 2,
            },
          ],
        },
      },
      {
        destination: 'Mysore',
        budget: 350.0,
        duration: 2,
        itinerary: {
          day: 2,
          activities: [
            {
              name: 'Visit the Mysore Zoo',
              cost: 10.0,
              duration: 3,
            },
            {
              name: "Explore the St. Philomena's Church",
              cost: 5.0,
              duration: 2,
            },
            {
              name: 'Attend a cultural performance at the Mysore Palace',
              cost: 15.0,
              duration: 2,
            },
            {
              name: 'Enjoy dinner at a rooftop restaurant with a view',
              cost: 20.0,
              duration: 2,
            },
          ],
        },
      },
    ],
  },
};

export default function TripPage() {
  const { tripId } = useParams();

  const tripData = sampleData.data.trip;

  // Group activities by day
  const activitiesByDay = tripData.reduce((acc: any, trip) => {
    const { day } = trip.itinerary as { day: number };
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(...trip.itinerary.activities);
    return acc;
  }, {});

  return (
    <Container className={classes.wrapper} size={1000}>
      <Title ta="center" mt={-30} mb={40} order={2}>
        Your trip itinerary
      </Title>
      {Object.keys(activitiesByDay).map((day) => (
        <div key={day}>
          <Title mb={20} mt={20} order={3}>
            Day {day}
          </Title>
          <Timeline active={100} bulletSize={32} radius="md" lineWidth={2}>
            {activitiesByDay[day].map((activity: any, index: number) => (
              <Timeline.Item key={index} bullet={<IconMapPin size={20} />} title={activity.name}>
                <Text c="dimmed" size="sm">
                  Destination: {tripData.find((t) => t.itinerary.day == day).destination}
                </Text>
                <Text size="xs" mt={4}>
                  <IconClock size={14} style={{ marginRight: 5 }} />
                  Duration: {activity.duration} hours
                </Text>
                <Text size="xs" mt={4}>
                  <IconCurrencyDollar size={14} style={{ marginRight: 5 }} />
                  Cost: ${activity.cost}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      ))}
    </Container>
  );
}
