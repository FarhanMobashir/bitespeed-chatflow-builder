import { BsChatText } from "react-icons/bs";
import styles from "./index.module.css"
import DynamicFaIcon from "../DynamicIcon";

const NodeButton = ({
    nodeType = "textUpdater",
    nodeTitle = "Message",
    icon = <BsChatText size={25} color="#0559cfcc" />,
    isDraggable = false
}) => {
    return <div
        onDragStart={(event) => {
            event.dataTransfer.setData('application/reactflow', nodeType);
            event.dataTransfer.effectAllowed = 'move';
        }}
        draggable={isDraggable}
        className={styles.nodeBox}
    >
        <DynamicFaIcon name={icon} />
        <span className="">
            {nodeTitle}
        </span>
    </div>
}

export default NodeButton;