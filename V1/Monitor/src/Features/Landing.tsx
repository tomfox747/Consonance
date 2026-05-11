import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import type { IConsonanceObserverMsg } from '../Models'
import { v4 as uuidv4 } from "uuid";

import {
  Box,
  Button,
  Card,
  Code,
  Divider,
  Flex,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';

export const Landing = (props: {messages:IConsonanceObserverMsg[]}) => {

    const [count, setCount] = useState(0)

    return <> 
      <section>
        <Stack gap="xl">
          {/* Hero */}
          <Flex align="center" gap="md">
            <Image
              src={heroImg}
              w={170}
              h={179}
              alt=""
              fit="contain"
            />

            <Image
              src={reactLogo}
              w={60}
              alt="React logo"
              fit="contain"
            />

            <Image
              src={viteLogo}
              w={60}
              alt="Vite logo"
              fit="contain"
            />
          </Flex>

          {/* Intro */}
          <Stack gap="xs">
            <Title order={1}>Get started</Title>

            <Text>
              Point your <Code>src/App.tsx</Code> and save to test{' '}
              <Code>HMR</Code>
            </Text>
          </Stack>

          {/* Counter */}
          <Button
            variant="filled"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </Button>
        </Stack>

        <Divider my="xl" />

        {/* Next Steps */}
        <section id="next-steps">
          <Stack gap="lg">
            <Group gap="sm" align="center">
              <Box
                component="svg"
                w={24}
                h={24}
                aria-hidden="true"
              >
                <use href="/icons.svg#documentation-icon" />
              </Box>

              <Title order={2}>Messages</Title>
            </Group>

            <Text c="dimmed">
              Your application development data
            </Text>

            <Stack gap="md">
              {props.messages.map((x) => (
                <Group
                  key={uuidv4()}
                  align="flex-start"
                  wrap="nowrap"
                >
                  {/* Component Name */}
                  <Paper
                    withBorder
                    p="sm"
                    miw={120}
                  >
                    <Text fw={500}>{x.component}</Text>
                  </Paper>

                  {/* Metrics */}
                  <Card
                    withBorder
                    w={500}
                    padding="md"
                  >
                    <Stack gap={4}>
                      <Text size="sm">
                        Render Count - {x.renderCount}
                      </Text>

                      <Text size="sm">
                        Mem - {x.metrics.mem_percentUsage}%
                      </Text>

                      <Text size="sm">
                        Timestamp -{' '}
                        {`${new Date(Number(x.metrics.timestamp)).getHours()}:${new Date(Number(x.metrics.timestamp)).getMinutes()}:${new Date(Number(x.metrics.timestamp)).getSeconds()}:${new Date(Number(x.metrics.timestamp)).getMilliseconds()}`}
                      </Text>

                      <Text size="sm">
                        Render Duration - {x.metrics.actualDuration}
                      </Text>

                      <Text size="sm">
                        Render Phase - {x.metrics.phase}
                      </Text>
                    </Stack>
                  </Card>
                </Group>
              ))}
            </Stack>
          </Stack>
        </section>

        <Divider my="xl" />

        <Box h={120} />
      </section>
    </>
}