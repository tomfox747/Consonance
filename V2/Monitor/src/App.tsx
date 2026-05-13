import { useEffect, useRef, useState } from 'react'
import './App.css'

interface IFiberNode {
	actualDuration:number,
	actualStartTime:number,
	child?: IFiberNode|null,
	sibling?: IFiberNode|null,
	elementType: string
}

interface IProcessedTree extends IFiberNode {
	Xpos?:number,
	Ypos?:number
}

interface IProcessedTreeNode {
	Xpos?:number,
	Ypos?:number,
	actualDuration:number,
	actualStartTime:number,
	elementType: string
}

// Function builds the tree, assigning an X and Y position to each component
const processTree = (tree: IProcessedTree) => {
	
	const _R = (tree: IProcessedTree, y:number): IProcessedTree => {

		// console.log(`${y}_${_x} : ${tree.elementType}`)
		tree.Xpos = _x
		tree.Ypos = y

		if(tree.child) {
			_R(tree.child, y+1)
		}

		if(tree.sibling) {
			_x++
			_R(tree.sibling, y)
		}

		return tree
	}

	let _x = 0;
	return _R(tree,0)
}

// Function takes a processed tree with x and y values, and reformates all nodes into a flat array [].
// The tree structure is no longer required, as the grid position is known by each node
const flattenTree = (tree:IProcessedTree, arr: IProcessedTreeNode[]) => {
	
	arr.push(tree)

	if(tree.child) {
		flattenTree(tree.child, arr)
	}

	if(tree.sibling) {
		flattenTree(tree.sibling, arr)
	}

	return arr
}

// Convert flat array of tree nodes, into a grid using the x and y co-ordinates
const gridifyFlattenedTree = (flattenedTree: IProcessedTreeNode[]) => {

	let maxX = 0;
	let maxY = 0;
	for(const i of flattenedTree) {
		if(i.Xpos>maxX) maxX = i.Xpos
		if(i.Ypos>maxY) maxY = i.Ypos
	}

	let grid: Array<IProcessedTreeNode[]|undefined> = []
	
	for(let i:number = 0; i <= maxY; i++) {
		grid.push([])
		for(let o:number = 0; o<=maxX;o++){
			grid[i].push(undefined)
		}
	}

	for(let i of flattenedTree) {
		grid[i.Ypos][i.Xpos] = i
	}

	return grid
}

function App() {
  
	const wsRef = useRef<WebSocket|null>(null)

	const [treeHistory,setTreeHistory] = useState<IProcessedTree[]>([])

	const f = (processedTree: IProcessedTree) => {
		setTreeHistory(prev=>[...prev,processedTree])
	}

	useEffect(() => {
		wsRef.current = new WebSocket('ws://localhost:4000')
		wsRef.current.onopen = () => {
            console.log("Connected to server");
        };

        wsRef.current.onmessage = (event) => {
            let tree = JSON.parse(event.data)
			let processedTree: IProcessedTree = processTree(tree)
			f(processedTree)
        };

        wsRef.current.onclose = () => {
            console.log("Disconnected");
        };

        return() =>{
            wsRef.current?.close()
        }
	}, [])

	return <div style={{padding:'10px', display:'flex', flexWrap:'wrap', gap:'10px'}}>
		<ApplicationTree treeHistory={treeHistory}/>
	</div>
}

// const extractRow = (tree: IProcessedTree,rowNumber:number, grid:Array<IProcessedTreeNode[]>) => {
// }

const ApplicationTree = (props:{treeHistory?: IProcessedTree[]}) => {
	if(!props.treeHistory[props.treeHistory.length-1]) return <div></div>

	let grid = gridifyFlattenedTree(flattenTree(props.treeHistory[props.treeHistory.length-1],[]))
	if(!grid) return <div></div>
	
	return <div style={{display:'flex', flexDirection:'column', gap:'10px', rowGap:'10px'}}>
		{grid.map((x,xi) => {
			return <div key={`row_${xi}`} style={{display:'flex', gap:'10px'}}>
				{x.map((y,yi) => {
					return <Elem key={`col_${yi}`} node={y}/>
				})}
			</div>
		})}
	</div>
}

const Elem = (props:{node?: IProcessedTreeNode}) => {

	if(!props.node) return <div style={{width:'100px', height: '100px'}}/>

	return <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', background:'lightgrey', color:'black', width:'100px', height: '100px'}}>
		<div>{props.node.elementType}</div>
		<div>{props.node.actualDuration.toFixed(4)}</div>
	</div>
}

export default App
