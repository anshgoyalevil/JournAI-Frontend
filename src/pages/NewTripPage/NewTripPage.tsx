import {
  Box,
  Button,
  Center,
  Container,
  rem,
  TextInput,
  Title,
  Text,
  Divider,
  Chip,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCalendar, IconLocation, IconMoneybag, IconTrash } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import classes from './NewTripPage.module.css';

export default function NewTripPage() {
  const [prefs, setPrefs] = useState(['Museums', 'Historical']);
  const [budget, setBudget] = useState('');
  const form = useForm({
    initialValues: {
      placesDates: [
        {
          place: '',
          date: [null, null],
        },
      ],
    },
  });

  const addPlaceDate = () => {
    form.setFieldValue('placesDates', [
      ...form.values.placesDates,
      {
        place: '',
        date: [null, null],
      },
    ]);
  };

  const deletePlaceDate = (index: number) => {
    form.setFieldValue(
      'placesDates',
      form.values.placesDates.filter((_, i) => i !== index)
    );
  };

  const submitNewTrip = () => {};

  return (
    <Container className={classes.wrapper} size={1400}>
      <Title ta="center" order={2}>
        Plan your next adventure
      </Title>
      <Center>
        <Box mt={40} w={500}>
          <form onSubmit={form.onSubmit(submitNewTrip)}>
            <Text fw={600}>Where do you want to go?</Text>
            {form.values.placesDates.map((placeDate: any, index) => (
              <Box key={index} mt={index === 0 ? 15 : 0} display="flex">
                <Box flex={1}>
                  <TextInput
                    placeholder="Enter a city or country"
                    value={placeDate.place}
                    onChange={(event) =>
                      form.setFieldValue(`placesDates.${index}.place`, event.currentTarget.value)
                    }
                    required
                    leftSection={<IconLocation style={{ width: rem(18), height: rem(18) }} />}
                  />
                  <DatePickerInput
                    mt={10}
                    type="range"
                    placeholder="Select dates"
                    value={placeDate.date}
                    onChange={(dates) => form.setFieldValue(`placesDates.${index}.date`, dates)}
                    clearable
                    required
                    leftSection={<IconCalendar style={{ width: rem(18), height: rem(18) }} />}
                  />
                  {index !== form.values.placesDates.length - 1 && (
                    <Divider ml={30} h={30} size="sm" orientation="vertical" />
                  )}
                </Box>
                {index > 0 && (
                  <Button
                    mt={0}
                    ml={10}
                    color="red"
                    variant="light"
                    onClick={() => deletePlaceDate(index)}
                  >
                    <IconTrash size={16} />
                  </Button>
                )}
              </Box>
            ))}
            <Button size="compact-sm" variant="light" mt={20} onClick={addPlaceDate}>
              + Add destination
            </Button>
            <Text fw={600} mt={30}>
              Select the kind of activities you want to do
            </Text>
            <Chip.Group multiple value={prefs} onChange={setPrefs}>
              <Group justify="center" mt="md">
                <Chip variant="outline" value="Kid Friendly">
                  Kid Friendly
                </Chip>
                <Chip variant="outline" value="Museums">
                  Museums
                </Chip>
                <Chip variant="outline" value="Outdoor Adventures">
                  Outdoor Adventures
                </Chip>
                <Chip variant="outline" value="Shopping">
                  Shopping
                </Chip>
                <Chip variant="outline" value="Historical">
                  Historical
                </Chip>
                <Chip variant="outline" value="Art & Cultural">
                  Art & Cultural
                </Chip>
                <Chip variant="outline" value="Amusement Parks">
                  Amusement Parks
                </Chip>
                <Chip variant="outline" value="Religious">
                  Religious
                </Chip>
                <Chip variant="outline" value="Pet Friendly">
                  Pet Friendly
                </Chip>
              </Group>
            </Chip.Group>
            <Text fw={600} mt={30}>
              What is your expected budget?
            </Text>
            <TextInput
              mt={15}
              placeholder="$200"
              value={budget}
              onChange={(event) => setBudget(event.currentTarget.value)}
              required
              leftSection={<IconMoneybag style={{ width: rem(18), height: rem(18) }} />}
            />
            <Center>
              <Button justify="center" variant="light" mt={40} type="submit">
                Create New Trip
              </Button>
            </Center>
          </form>
        </Box>
      </Center>
    </Container>
  );
}
