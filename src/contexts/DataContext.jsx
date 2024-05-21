import { nanoid } from "nanoid";
import { createContext, useContext, useState } from "react";
import { useEdgesState, useNodesState } from "reactflow";

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const initialNodes = [
        {
            id: nanoid(),
            type: 'textUpdater',
            position: { x: 50, y: 30 },
            data: { text: 'text message' },
        },
    ];
    const initialEdges = [];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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


export const useDataContext = () => {
    const context = useContext(DataContext);

    if (context) {
        return context;
    } else {
        throw Error("must be used inside Data Provider")
    }
}

