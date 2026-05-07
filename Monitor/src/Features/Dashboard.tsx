import type { IConsonanceObserverMsg } from "../Models";
import {
  AppShell, Box, Card, Container, Divider, Flex,
  Group, Paper, Progress, Stack, Tabs, Text, Title,
} from "@mantine/core";
import { MessageStack } from "./MessageStack";
import { IconChartArea, IconMessage } from "@tabler/icons-react";


type Props = {
  messages: IConsonanceObserverMsg[],
  clearMessages():void
};

const getSeverityColor = (mem?: number) => {
  if (!mem) return "#999";
  if (mem > 80) return "#ff4d4d";
  if (mem > 50) return "#ffb84d";
  return "#4dff88";
};

export default function ConsonanceDashboard({ messages,clearMessages }: Props) {
  
  return (
    <AppShell padding="lg">
        <Container size={'xl'}>
            <Stack gap="lg">

                <Hero messages={messages}/>
                <Divider />
                <TabSet messages={messages} clearMessages={clearMessages}/>

                <Box h={40} />
            </Stack>
        </Container>
    </AppShell>
  );
}

const Charts = () => {

    return <div>Charts here</div>
}

const Hero = (props:{messages:IConsonanceObserverMsg[]}) => <Paper
  p="xl"
  radius="lg"
  withBorder
  bg="dark.7"
  >
  <Flex justify="space-between" align="center">
      <Box>
      <Title order={1}>Consonance Dashboard</Title>

      <Text c="dimmed" size="sm" mt={4}>
          React Profiler
      </Text>
      </Box>

      <Group>
      <Card
          padding="md"
          radius="md"
          withBorder
          bg="dark.6"
      >
          <Stack gap={4} align="center">
          <Text size="xs" c="dimmed">
              Memory Usage
          </Text>

          <Memory
              memory={
              props.messages[props.messages.length - 1]?.metrics.mem_percentUsage
              }
          />
          </Stack>
      </Card>
      </Group>
  </Flex>
</Paper>

const TabSet = (props:{messages:IConsonanceObserverMsg[],clearMessages():void}) => <Tabs defaultValue="messages">
    <Tabs.List>
        <Tabs.Tab value="messages" leftSection={<IconMessage size={12} />}>
            Messages
        </Tabs.Tab>
        <Tabs.Tab value="charts" leftSection={<IconChartArea size={12} />}>
            Charts
        </Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="messages">
        <MessageStack messages={props.messages} clearMessages={props.clearMessages}/>
    </Tabs.Panel>

    <Tabs.Panel value="charts">
        <Charts/>
    </Tabs.Panel>
</Tabs>


type MemoryProps = {
  memory?: number;
};
const Memory = ({ memory }: MemoryProps) => <Stack gap={4} w={250}>
  <Text size="sm" c="dimmed">Memory</Text>
  <Progress
    value={memory || 0}
    color={getSeverityColor(memory)}
    radius="xl"
    size="lg"
  />

  <Box><Text fw={700} size="sm" c="white">{memory ?? 0}%</Text></Box>
</Stack>
