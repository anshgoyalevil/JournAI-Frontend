import React from 'react';
import { Center, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import JournAI from '../../assets/logos/JounrnAI.png';
import JournAIDark from '../../assets/logos/JounrnAIDark.png';

export default function Logo() {
  const { colorScheme } = useMantineColorScheme();
  return (
    <div>
      <Center component={Link} to="/">
        <img src={colorScheme === 'dark' ? JournAIDark : JournAI} alt="" width={150} />
      </Center>
    </div>
  );
}
