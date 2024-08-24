import { Group, Button, Divider, Box, Burger, Drawer, ScrollArea, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import Logo from './Logo';
import ColorSchemeToggle from '../ColorSchemeToggle/ColorSchemeToggle';

/**
 * Navbar component that renders the navigation bar for the application.
 * The navigation bar includes links to different pages, a color scheme toggle, and a responsive drawer for mobile devices.
 *
 * @component
 * @returns {JSX.Element} The rendered Navbar component.
 */
export function Navbar() {
  // State and handlers for controlling the drawer's open/close state
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box pb={20}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Logo />

          {/* Navigation links visible on larger screens */}
          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/new-trip" className={classes.link}>
              New Trip
            </Link>
            <Link to="/my-trips" className={classes.link}>
              My Trips
            </Link>
          </Group>

          {/* Color scheme toggle and "Add a trip" button visible on larger screens */}
          <Group visibleFrom="sm">
            <ColorSchemeToggle />
            <Button component={Link} to="/new-trip">
              Add a trip
            </Button>
          </Group>

          {/* Burger icon for toggling the drawer on smaller screens */}
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      {/* Drawer component for navigation on smaller screens */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          {/* Drawer navigation links */}
          <Link to="/" onClick={closeDrawer} className={classes.link}>
            Home
          </Link>
          <Link to="/new-trip" onClick={closeDrawer} className={classes.link}>
            New Trip
          </Link>
          <Link to="/my-trips" onClick={closeDrawer} className={classes.link}>
            My Trips
          </Link>
          <Divider my="sm" />

          {/* Drawer content including color scheme toggle and "Add a trip" button */}
          <Group justify="center" pb="xl" px="md">
            <ColorSchemeToggle />
            <Button onClick={closeDrawer} component={Link} to="/new-trip">
              Add a trip
            </Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
