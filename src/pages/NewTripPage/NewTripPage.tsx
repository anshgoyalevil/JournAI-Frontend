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
  Dialog,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconCalendar,
  IconKey,
  IconLocation,
  IconMoneybag,
  IconTrash,
  IconUsersGroup,
} from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import Lottie from 'react-lottie';
import { useDisclosure, useMediaQuery, useWindowScroll } from '@mantine/hooks';
import AnimatedLoader from '../../lotties/animateLoader.json';
import AnimatedLoaderDark from '../../lotties/animateLoaderDark.json';
import classes from './NewTripPage.module.css';
import newTripService from '@/services/newTripService';

/**
 * NewTripPage component for creating a new trip itinerary.
 * Handles form inputs for trip details and submission.
 * Displays loading animation during submission and handles errors.
 *
 * @component
 * @returns {JSX.Element} The rendered NewTripPage component.
 */
export default function NewTripPage() {
  const [prefs, setPrefs] = useState(['Museums', 'Historical']); // Trip preferences
  const [budget, setBudget] = useState(''); // Trip budget
  const [people, setPeople] = useState<string | number>(1); // Number of people
  const [accessKey, setAccessKey] = useState(''); // Access key
  const [loading, setLoading] = useState(false); // Loading state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scroll, scrollTo] = useWindowScroll(); // Scroll position
  const [opened, { toggle, close }] = useDisclosure(false); // Dialog open state
  const matches = useMediaQuery('(min-width: 28em)'); // Media query for responsive design
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true }); // Color scheme

  const defaultOptionsForLottie = {
    loop: true,
    autoplay: true,
    animationData: computedColorScheme === 'dark' ? AnimatedLoaderDark : AnimatedLoader,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [response, setResponse] = useState<any>(null); // API response
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

  /**
   * Adds a new place/date input field to the form.
   */
  const addPlaceDate = () => {
    form.setFieldValue('placesDates', [
      ...form.values.placesDates,
      {
        place: '',
        date: [null, null],
      },
    ]);
  };

  /**
   * Deletes a specific place/date input field from the form.
   *
   * @param {number} index - The index of the field to be deleted.
   */
  const deletePlaceDate = (index: number) => {
    form.setFieldValue(
      'placesDates',
      form.values.placesDates.filter((_, i) => i !== index)
    );
  };

  /**
   * Submits the form data to the API and handles the response.
   */
  const submitNewTrip = async () => {
    const uniqId = Math.random().toString(36).substring(7);
    const formData = {
      placesDates: form.values.placesDates,
      prefs,
      budget,
      people,
      uniqId,
      accessKey,
    };
    scrollTo({ y: 0 });
    try {
      setLoading(true);
      const res = await newTripService(formData);

      if (res.status === 200) {
        setResponse(res.data[0]);
        const responses = localStorage.getItem('response');
        if (responses) {
          localStorage.setItem(
            'response',
            JSON.stringify([...JSON.parse(responses), { tripData: res.data[0], uniqId }])
          );
        } else {
          localStorage.setItem('response', JSON.stringify([{ tripData: res.data[0], uniqId }]));
        }
      }

      const reqs = localStorage.getItem('requests');
      if (reqs && res.status === 200) {
        localStorage.setItem('requests', JSON.stringify([...JSON.parse(reqs), formData]));
      } else if (res.status === 200) {
        localStorage.setItem('requests', JSON.stringify([formData]));
      }
      setLoading(false);
      window.location.href = `/trip/${uniqId}`;
    } catch (error) {
      setLoading(false);
      toggle();
    }
  };

  return (
    <>
      {/* Error dialog when submission fails */}
      <Dialog opened={opened} withCloseButton onClose={close} size="md" radius="md">
        <Text c="red" size="md" mb="xs" fw={500}>
          Error submitting form
        </Text>
        <Text size="sm" mb="xs" fw={500}>
          There was some error submitting the form. Please try again.
        </Text>
      </Dialog>

      {/* Loader animation displayed while loading */}
      {loading && (
        <>
          <Center m={30}>
            <Title size={20}>Creating your wonderful trip... </Title>
          </Center>
          <Center h={matches ? 500 : 250}>
            <Lottie
              options={defaultOptionsForLottie}
              height={matches ? 400 : 200}
              width={matches ? 400 : 200}
            />
          </Center>
        </>
      )}

      {/* Form for creating a new trip */}
      {!loading && (
        <Container className={classes.wrapper} size={1400}>
          <Title ta="center" mt={-30} order={2}>
            Plan your next adventure
          </Title>
          <Center>
            <Box mt={40} w={600}>
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
                <Text fw={600} mt={30}>
                  Do you have an access key?
                </Text>
                <TextInput
                  mt={15}
                  placeholder="Access Key"
                  value={accessKey}
                  onChange={(event) => setAccessKey(event.currentTarget.value)}
                  description="If you have an access key, please enter it here. We use it to prevent our API from being abused."
                  required
                  leftSection={<IconKey style={{ width: rem(18), height: rem(18) }} />}
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
