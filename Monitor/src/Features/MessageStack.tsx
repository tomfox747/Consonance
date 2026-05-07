import type { IConsonanceObserverMsg } from "../Models"
import {
  Box,
  Card,
  Grid,
  Group,
  Stack,
  Text,
  ThemeIcon
} from "@mantine/core";
import { IconActivity } from "@tabler/icons-react";
import { useInViewport } from '@mantine/hooks';

export const MessageStack = (props:{messages: IConsonanceObserverMsg[]}) => {
    
    const sorted = [...props.messages].sort(
        (a, b) => Number(b.metrics.timestamp) - Number(a.metrics.timestamp)
    );

    return <Stack gap={2}>
        {sorted.map((x, idx) => (
            <Message x={x} idx={idx}/>
        ))}
    </Stack>
}

const Message =({x, idx}: {x: IConsonanceObserverMsg, idx:number}) => {

    const {ref, inViewport} = useInViewport()

    const formatTime = (ts: string) => {
        const d = new Date(Number(ts));
        return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
    };

    return <div ref={ref}>
        {!inViewport
            ? <div>Loading</div>
            : <Card
                key={`${x.component}-${x.metrics.timestamp}-${idx}`}
                withBorder
                radius="sm"
                padding="xs"
                bg="dark.7"
                >
                <Grid align="center">

                    {/* COMPONENT */}
                    <Grid.Col span={3}>
                    <Group gap={6} wrap="nowrap">

                        <ThemeIcon
                        variant="light"
                        color="blue"
                        radius="xl"
                        size={24}
                        >
                        <IconActivity size={14} />
                        </ThemeIcon>

                        <Box>
                        <Text fw={600} size="sm" c="white" truncate ta='left'>
                            {x.component}
                        </Text>

                        <Text size="10px" c="dimmed">
                            renders: {x.renderCount}
                        </Text>
                        </Box>

                    </Group>
                    </Grid.Col>

                    {/* METRICS */}
                    <Grid.Col span={9}>
                    <Grid>

                        <Grid.Col span={3}>
                        <Stack gap={0}>
                            <Text size="9px" c="white">
                                PHASE
                            </Text>

                            <Text size="xs" fw={600} c="dimmed" truncate>
                                {x.metrics.phase}
                            </Text>
                        </Stack>
                        </Grid.Col>

                        <Grid.Col span={3}>
                        <Stack gap={0}>
                            <Text size="9px" c="white">
                            DUR
                            </Text>

                            <Text size="xs" fw={600} c="dimmed">
                            {x.metrics.actualDuration}ms
                            </Text>
                        </Stack>
                        </Grid.Col>

                        <Grid.Col span={3}>
                        <Stack gap={0}>
                            <Text size="9px" c="white">
                            BASE
                            </Text>

                            <Text size="xs" fw={600} c="dimmed">
                            {x.metrics.baseDuration}ms
                            </Text>
                        </Stack>
                        </Grid.Col>

                        <Grid.Col span={3}>
                        <Stack gap={0}>
                            <Text size="9px" c="white">
                            TIME
                            </Text>

                            <Text size="xs" fw={600} c="dimmed">
                            {formatTime(x.metrics.timestamp)}
                            </Text>
                        </Stack>
                        </Grid.Col>

                    </Grid>
                    </Grid.Col>

                </Grid>
            </Card>
        }    
    </div>
}