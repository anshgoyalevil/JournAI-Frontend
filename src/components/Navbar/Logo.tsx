import React from 'react';
import { Center, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import JournAI from '../../assets/logos/JounrnAI.png';
import JournAIDark from '../../assets/logos/JounrnAIDark.png';

/**
 * Logo component that displays the application logo.
 * The logo changes based on the current color scheme (dark or light).
 *
 * @component
 * @returns {JSX.Element} The rendered Logo component.
 */
export default function Logo() {
  // Retrieve the current color scheme (dark or light)
  const { colorScheme } = useMantineColorScheme();

  return (
    <div>
      <Center component={Link} to="/">
        {/* Display the appropriate logo based on the color scheme */}
        <img src={colorScheme === 'dark' ? JournAIDark : JournAI} alt="JournAI Logo" width={150} />
      </Center>
    </div>
  );
}
