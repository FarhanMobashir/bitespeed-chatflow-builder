import { nanoid } from "nanoid";
import { createContext, useContext, useState } from "react";
import { useEdgesState, useNodesState } from "reactflow";

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    // initial state declaration, may come from backend as well
    const initialNodes = [
        {
            id: nanoid(),
            type: 'textUpdater',
            position: { x: 50, y: 30 },
            data: { text: 'text message' },
        },
    ];
    const initialEdges = [];

    // node and edge state
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // state for node selection on the canvas
    const [isNodeSelected, setIsNodeSelected] = useState([]);

    return <DataContext.Provider value={{
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
        isNodeSelected,
        setIsNodeSelected
    }}>
        {children}
    </DataContext.Provider>
};

// hook to consume data from the context
export const useDataContext = () => {
    const context = useContext(DataContext);

    if (context) {
        return context;
    } else {
        throw Error("must be used inside Data Provider")
    }
}

