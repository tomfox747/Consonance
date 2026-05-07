
export interface IConsonanceObserverMsg {
    component: string,
    metrics: {
        timestamp: string,
        phase:string,
        actualDuration:string,
        baseDuration:string,
        startTime:string,
        commitTime:string,
        mem_max?: 0, 
        mem_current?: 0, 
        mem_percentUsage?:0
    },
    state: object,
    renderCount: number
}
