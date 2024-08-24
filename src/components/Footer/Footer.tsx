import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandInstagram } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './Footer.module.css';
import Logo from '../Navbar/Logo';

/**
 * Data structure representing the footer links.
 * Each object contains a title and an array of links associated with that title.
 * @type {Array<{ title: string, links: Array<{ label: string, link: string }> }>}
 */
const data = [
  {
    title: 'About',
    links: [
      { label: 'GitHub', link: 'https://github.com/anshgoyalevil' },
      { label: 'LinkedIn', link: 'https://www.linkedin.com/in/thisisanshg/' },
      { label: 'Portfolio', link: 'https://game.anshg.co/' },
      { label: 'Twitter', link: 'https://x.com/thisisanshg' },
    ],
  },
  {
    title: 'Project',
    links: [{ label: 'Contribute', link: 'https://github.com/anshgoyalevil' }],
  },
  {
    title: 'Community',
    links: [{ label: 'No community yet :)', link: '#' }],
  },
];

/**
 * Footer component rendering the footer of the page.
 * Includes links to various social media profiles and other relevant pages.
 * @component
 * @returns {JSX.Element} The rendered footer component.
 */
export default function Footer() {
  // Map through the data to create groups of links
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'> key={index} className={classes.link} component="a" href={link.link}>
        {link.label}
      </Text>
    ));

    // Return a group with a title and associated links
    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Logo />
          <Text ta="center" size="xs" c="dimmed" className={classes.description}>
            Build, personalize, and optimize your itineraries with our free AI trip planner.
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 | Built with ❤️ by Ansh Goyal
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon
            component={Link}
            to="https://x.com/thisisanshg"
            size="lg"
            color="gray"
            variant="subtle"
          >
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            component={Link}
            to="https://instagram.com/thisisanshg"
            size="lg"
            color="gray"
            variant="subtle"
          >
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
