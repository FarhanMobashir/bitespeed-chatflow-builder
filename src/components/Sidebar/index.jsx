import { Fa500Px, FaEnvelope } from "react-icons/fa";
import { useDataContext } from "../../contexts/DataContext";
import { useOnSelectionChange } from "reactflow";
import { BsChatText } from "react-icons/bs";
import styles from "./index.module.css"
import NodeButton from "../NodeButton";
import { NodesList } from "../../constants/nodes";


const SideBar = () => {
    const { isNodeSelected, setIsNodeSelected, setNodes, nodes } = useDataContext();


    useOnSelectionChange({
        onChange: ({ nodes, edges }) => {
            setIsNodeSelected(nodes.map((node) => node));
            // setSelectedEdges(edges.map((edge) => edge.id));
        },
    });
    return <div
        className={styles.sidebarContainer}>
        {
            isNodeSelected.length === 0 && <><h1
                style={{
                    color: "#222222cc"
                }}
            >Nodes Panel</h1>
                <div
                    className={styles.nodeListContainer}
                >
                    {
                        NodesList.map((item) => {
                            return (
                                <NodeButton
                                    key={item.title}
                                    nodeTitle={item.title}
                                    nodeType={item.nodeType}
                                    isDraggable={item.isDraggable}
                                    icon={item.icon}
                                />
                            )
                        })
                    }
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