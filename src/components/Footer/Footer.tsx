import { Text, Container, ActionIcon, Group, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandInstagram } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import classes from './Footer.module.css';
import Logo from '../Navbar/Logo';

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

export default function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<'a'>
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
      >
        {link.label}
      </Text>
    ));

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
