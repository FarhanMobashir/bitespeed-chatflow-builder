import React from 'react';
import { Handle, Position } from 'reactflow';
import { BsChatText } from "react-icons/bs";
import styles from './index.module.css';

function TextUpdaterNode({ data, selected }) {
    return (
        <div
            className={`${styles.nodeContainer} ${selected ? styles.selected : ''}`}
        >
            <Handle
                type="source"
                position={Position.Right}
                className={styles.sourceHandle}
            />
            <div className={styles.nodeContent}>
                <div className={styles.header} htmlFor="text">
                    <BsChatText size={"8px"} />
                    <span>Send Message</span>
                </div>
                <p className={styles.text}>
                    {data.text}
                </p>
            </div>
            <Handle type="target" position={Position.Left} id="a" />
        </div>
    );
}

export default TextUpdaterNode;
