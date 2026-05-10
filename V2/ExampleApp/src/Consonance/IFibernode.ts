
export interface IFiberNode {
    actualDuration: number
    actualStartTime: number
    childLanes: number
    deletions: null
    dependencies: null
    elementType: unknown
    type: unknown
    flags: number
    index: number
    key: null
    lanes: number,
    child: IFiberNode,
    sibling: IFiberNode
}
