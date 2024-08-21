import { Group, Button, Divider, Box, Burger, Drawer, ScrollArea, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import Logo from './Logo';
import ColorSchemeToggle from '../ColorSchemeToggle/ColorSchemeToggle';

export function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box pb={20}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Logo />

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

          <Group visibleFrom="sm">
            <ColorSchemeToggle />
            <Button>Add a trip</Button>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

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

          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/new-trip" className={classes.link}>
            New Trip
          </Link>
          <Link to="/my-trips" className={classes.link}>
            My Trips
          </Link>
          <Divider my="sm" />
          <Group justify="center" pb="xl" px="md">
            <ColorSchemeToggle />
            <Button>Add a trip</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
