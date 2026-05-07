import type { IConsonanceObserverMsg } from "../Models"
import {Box,Button,Card,Collapse,Flex,Grid,Group,Select,Stack,Text,ThemeIcon} from "@mantine/core";
import { IconActivity } from "@tabler/icons-react";
import { useInViewport } from '@mantine/hooks';
import { useDisclosure } from '@mantine/hooks';
import { CodeHighlight } from "@mantine/code-highlight";
import { useState } from "react";


export const MessageStack = (props:{clearMessages():void,messages: IConsonanceObserverMsg[]}) => {

    const sorted = [...props.messages].sort(
        (a, b) => Number(b.metrics.timestamp) - Number(a.metrics.timestamp)
    );

    const [filters, setFilters] = useState<{byComponentId:string, orderBy:string}>({
        byComponentId:'',
        orderBy:''
    })

    const filterMessages = () => {

        let out: IConsonanceObserverMsg[] = [...sorted]

        if(filters.byComponentId.length > 0) {
            out = out.filter(x=>x.component===filters.byComponentId)
        }

        if(filters.orderBy.length > 0) {
            switch(filters.orderBy){
                case 'Duration':
                    out = out.sort((a,b) => {return Number(a.metrics.actualDuration)-Number(b.metrics.actualDuration)})
                    break;
                case 'Component':
                    out = out.sort((a,b) => (a.component.localeCompare(b.component)))
                    break;
                case 'Renders':
                    out = out.sort((a,b) => {return Number(a.renderCount)-Number(b.renderCount)})
                    break;
                case 'Phase':
                    out = out.sort((a,b) => (a.metrics.phase.localeCompare(b.metrics.phase)))
                    break;
            }
            
        }

        return out
    }

    const selects = (() => {
        const opts: Record<string,string> = {}
        sorted.forEach(x=>{opts[x.component]=x.component})
        return ['All', ...Object.values(opts)]
    })()

    return <Stack gap={5} mt={5}>
        <Flex wrap={'wrap'}>
            <Button w={'200px'} onClick={props.clearMessages}>Clear Messages</Button>
        </Flex>
        <Flex wrap={'wrap'} gap={5}>
            <Select
                label={'Filter By Component ID'}
                placeholder="Component ID"
                data={selects}
                onChange={(v)=>setFilters({...filters, byComponentId:v==='All' ? '' : v ??''})}
            />
            <Select
                label={'Order By'}
                placeholder="Order By"
                data={['Default','Duration', 'Component', 'Renders', 'Phase']}
                onChange={(v)=>setFilters({...filters, orderBy:v??''})}
            />
        </Flex>
        {filterMessages().map((x, idx) => (
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
    
    const [expanded, {toggle}] = useDisclosure(false)

    return <div ref={ref}>
        {!inViewport
            ? <div>Loading</div>
            : <Card
                onClick={toggle}
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
                    <Collapse expanded={expanded}>
                        <CodeHighlight code={JSON.stringify(x.state)} expandCodeLabel="" onClick={(e)=>e.stopPropagation()}/>
                    </Collapse>
                </Grid>
            </Card>
        }    
    </div>
}