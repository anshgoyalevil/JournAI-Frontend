import { Container, Timeline, Text, Title, Center, Grid } from '@mantine/core';
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
  }, [tripId]);

  // Group activities by destination and day
  const activitiesByDestination = tripData.reduce((acc: any, trip: any) => {
    const { destination, itinerary } = trip;
    const { day, activities } = itinerary;

    if (!acc[destination]) {
      acc[destination] = {};
    }
    if (!acc[destination][day]) {
      acc[destination][day] = [];
    }

    acc[destination][day].push(...activities);
    return acc;
  }, {});

  return (
    <Container className={classes.wrapper} size={1000}>
      <Title ta="center" mt={-30} mb={40} order={2}>
        Your trip itinerary
      </Title>
      <Grid>
        {Object.keys(activitiesByDestination).map((destination: any) => (
          <Grid.Col px={30} span={{ base: 12, xs: 6 }}>
            <div key={destination}>
              <Title mb={20} mt={20} order={3}>
                Destination: {destination}
              </Title>
              {Object.keys(activitiesByDestination[destination]).map((day: any) => (
                <div key={day}>
                  <Title mb={10} mt={10} order={4}>
                    Day {day}
                  </Title>
                  <Timeline active={100} bulletSize={32} radius="md" lineWidth={2}>
                    {activitiesByDestination[destination][day].map(
                      (activity: any, index: number) => (
                        <Timeline.Item
                          key={index}
                          bullet={<IconMapPin size={20} />}
                          title={activity.name}
                        >
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
                      )
                    )}
                  </Timeline>
                </div>
              ))}
            </div>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
