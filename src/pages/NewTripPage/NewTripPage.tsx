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
  NumberInput,
  useComputedColorScheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconCalendar,
  IconLocation,
  IconMoneybag,
  IconTrash,
  IconUsersGroup,
} from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import axios from 'axios';
import { notifications } from '@mantine/notifications';
import Lottie from 'react-lottie';
import AnimatedLoader from '../../lotties/animateLoader.json';
import AnimatedLoaderDark from '../../lotties/animateLoaderDark.json';
import classes from './NewTripPage.module.css';

export default function NewTripPage() {
  const [prefs, setPrefs] = useState(['Museums', 'Historical']);
  const [budget, setBudget] = useState('');
  const [people, setPeople] = useState<string | number>(1);
  const [loading, setLoading] = useState(false);
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  const defaultOptionsForLottie = {
    loop: true,
    autoplay: true,
    animationData: computedColorScheme === 'dark' ? AnimatedLoaderDark : AnimatedLoader,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [response, setResponse] = useState<any>(null);
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

  const submitNewTrip = async () => {
    const uniqId = Math.random().toString(36).substring(7);
    const formData = {
      placesDates: form.values.placesDates,
      prefs,
      budget,
      people,
      uniqId,
    };
    try {
      setLoading(true);
      const res = await axios.post('http://127.0.0.1:8080/api/newtrip', formData);

      if (res.status === 201) {
        setResponse(res.data.data);
        const responses = localStorage.getItem('response');
        if (responses) {
          localStorage.setItem(
            'response',
            JSON.stringify([...JSON.parse(responses), { tripData: res.data.data, uniqId }])
          );
        } else {
          localStorage.setItem('response', JSON.stringify([{ tripData: res.data.data, uniqId }]));
        }
      }

      const reqs = localStorage.getItem('requests');
      if (reqs && res.status === 201) {
        localStorage.setItem('requests', JSON.stringify([...JSON.parse(reqs), formData]));
      } else if (res.status === 201) {
        localStorage.setItem('requests', JSON.stringify([formData]));
      }
      setLoading(false);
      window.location.href = `/trip/${uniqId}`;
    } catch (error) {
      setLoading(false);
      notifications.show({
        title: 'Error submitting form',
        message: 'Please try again later',
      });
    }
  };

  return (
    <>
      {loading && (
        <Center h={600}>
          <Lottie options={defaultOptionsForLottie} height={400} width={400} />
        </Center>
      )}
      {!loading && (
        <Container className={classes.wrapper} size={1400}>
          <Title ta="center" mt={-30} order={2}>
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
                          form.setFieldValue(
                            `placesDates.${index}.place`,
                            event.currentTarget.value
                          )
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
                      🛝 Kid Friendly
                    </Chip>
                    <Chip variant="outline" value="Museums">
                      🖼️ Museums
                    </Chip>
                    <Chip variant="outline" value="Outdoor Adventures">
                      🎴 Outdoor Adventures
                    </Chip>
                    <Chip variant="outline" value="Shopping">
                      🛒 Shopping
                    </Chip>
                    <Chip variant="outline" value="Historical">
                      🧱 Historical
                    </Chip>
                    <Chip variant="outline" value="Art & Cultural">
                      🎨 Art & Cultural
                    </Chip>
                    <Chip variant="outline" value="Amusement Parks">
                      🎡 Amusement Parks
                    </Chip>
                    <Chip variant="outline" value="Religious">
                      ⛪ Religious
                    </Chip>
                    <Chip variant="outline" value="Pet Friendly">
                      🐱 Pet Friendly
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
                <Text fw={600} mt={30}>
                  How many people are going?
                </Text>
                <NumberInput
                  mt={15}
                  placeholder="2"
                  value={people}
                  onChange={setPeople}
                  required
                  leftSection={<IconUsersGroup style={{ width: rem(18), height: rem(18) }} />}
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
      )}
    </>
  );
}
