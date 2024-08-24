import { Title, Text, Button, Container } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Dots } from './Dots';
import classes from './LandingPage.module.css';

/**
 * LandingPage component that serves as the introductory page for the application.
 * Includes a title, description, and a call-to-action button.
 *
 * @component
 * @returns {JSX.Element} The rendered LandingPage component.
 */
export default function LandingPage() {
  return (
    <Container className={classes.wrapper} size={1400}>
      {/* Decorative dots positioned at various locations */}
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        {/* Main title with highlighted text */}
        <Title className={classes.title}>
          Your next{' '}
          <Text component="span" className={classes.highlight} inherit>
            AI Optimized
          </Text>{' '}
          Journey
        </Title>

        {/* Description of the service */}
        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Build, personalize, and optimize your itineraries with our free AI trip planner.
            Designed for vacations, workations, and everyday adventures.
          </Text>
        </Container>

        {/* Call-to-action button */}
        <div className={classes.controls}>
          <Button component={Link} to="/new-trip" className={classes.control} size="lg">
            Create a new trip
          </Button>
        </div>
      </div>
    </Container>
  );
}
