import { Container, Timeline, Text, Title, Center } from '@mantine/core';
import { IconMapPin, IconClock, IconCurrencyDollar } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './TripPage.module.css';

export default function TripPage() {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState<any>([]);

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem('response') || '[]');
    const tData = response.find((res: any) => res.uniqId === tripId);
    if (tData !== null) {
      setTripData(tData.tripData.data.trip);
    }
  }, []);

  // Group activities by day
  const activitiesByDay = tripData.reduce((acc: any, trip: any) => {
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
      {Object.keys(activitiesByDay).map((day: any) => (
        <div key={day}>
          <Title mb={20} mt={20} order={3}>
            Day {day}
          </Title>
          <Timeline active={100} bulletSize={32} radius="md" lineWidth={2}>
            {activitiesByDay[day].map((activity: any, index: number) => (
              <Timeline.Item key={index} bullet={<IconMapPin size={20} />} title={activity.name}>
                <Text c="dimmed" size="sm">
                  {/* eslint-disable-next-line eqeqeq */}
                  Destination: {tripData.find((t: any) => t.itinerary.day == day)!.destination}
                </Text>
                <Text size="xs" mt={4}>
                  <Center inline>
                    <IconClock size={14} style={{ marginRight: 5 }} />
                    Duration: {activity.duration} hours
                  </Center>
                </Text>
                <Text size="xs" mt={4}>
                  <Center inline>
                    <IconCurrencyDollar size={14} style={{ marginRight: 5 }} />
                    Cost: ${activity.cost}
                  </Center>
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      ))}
    </Container>
  );
}
