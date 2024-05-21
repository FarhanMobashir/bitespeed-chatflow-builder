import { FaEnvelope } from "react-icons/fa";
import { useDataContext } from "../contexts/DataContext";
import { useOnSelectionChange } from "reactflow";
import { BsChatText } from "react-icons/bs";


const SideBar = () => {
    const { isNodeSelected, setIsNodeSelected, setNodes, nodes } = useDataContext();


    useOnSelectionChange({
        onChange: ({ nodes, edges }) => {
            setIsNodeSelected(nodes.map((node) => node));
            // setSelectedEdges(edges.map((edge) => edge.id));
        },
    });
    return <div
        style={{
            position: "fixed",
            right: "0",
            backgroundColor: "white",
            height: "100%",
            zIndex: 999,
            padding: "10px",
            borderLeft: "1px solid #CCCC",
            width: "300px"
        }}
    >
        {
            isNodeSelected.length === 0 && <><h1
                style={{
                    color: "#222222cc"
                }}
            >Nodes Panel</h1>
                <div
                    onDragStart={(event) => {
                        event.dataTransfer.setData('application/reactflow', "textUpdater");
                        event.dataTransfer.effectAllowed = 'move';
                    }}
                    draggable
                    style={{
                        cursor: "grab",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "2px solid #0559cfcc",
                        borderRadius: "10px",
                        padding: "10px",
                        width: "150px",
                        height: "80px",
                        color: "#0559cfcc"
                    }}
                >
                    <BsChatText size={25} color="#0559cfcc" />
                    <span>
                        Message
                    </span>
                </div>
            </>
        }

        {
            isNodeSelected.length > 0 && <div
                style={{
                    display: "flex",
                    flexDirection: "column",

                }}
            >
                <h1
                    style={{
                        color: "#222222cc"
                    }}
                >Setting Panel</h1>
                <label
                    style={{
                        marginBottom: "5px"
                    }}
                >Title</label>
                <textarea
                    type="text"
                    value={nodes.find(item => item.id === isNodeSelected[0].id).data.text}
                    onChange={(e) => {
                        const newText = e.target.value;
                        let updated = nodes.map(item => item.id === isNodeSelected[0]?.id ? {
                            ...item,
                            data: {
                                ...item.data,
                                text: newText
                            }
                        } : item)
                        setNodes(updated);
                    }}
                />
            </div>
        }
    </div>
}

export default SideBar;