import { Title, Text, Button, Container } from '@mantine/core';
import { Dots } from './Dots';
import classes from './LandingPage.module.css';

export default function LandingPage() {
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Your next{' '}
          <Text component="span" className={classes.highlight} inherit>
            AI Optimized
          </Text>{' '}
          Journey
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Build, personalize, and optimize your itineraries with our free AI trip planner.
            Designed for vacations, workations, and everyday adventures.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} size="lg">
            Create a new trip
          </Button>
        </div>
      </div>
    </Container>
  );
}
