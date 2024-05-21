import { Handle, Position } from 'reactflow';
import { BsChatText } from "react-icons/bs";


function TextUpdaterNode({ data, selected }) {
    return (
        <>
            <div
                style={{
                    width: "100px",
                    boxShadow: selected === true ? "0px 0px 10px #525252cc" : "none",
                    borderRadius: "5px",
                    transition: "0.2s",
                    cursor: "pointer"
                }}
            >
                <Handle type="source" position={Position.Right}
                    style={{
                        background: "red",
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        background: "white",
                        borderRadius: "5px",
                        boxShadow: "0px 0px 10px #CCCC",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#b3f8f4cc",
                            color: "white",
                            borderRadius: "5px 5px 0px 0px",
                            color: "black",
                            padding: "2px 8px",
                            fontSize: "8px",
                            display: 'flex',
                            alignItems: "center",
                            gap: "2px",
                            fontWeight: "bold"
                        }}
                        htmlFor="text">
                        <BsChatText size={"8px"} />
                        <span>
                            Send Message
                        </span>
                    </div>
                    <p
                        style={{
                            margin: "0",
                            padding: "5px",
                            fontSize: "6px",
                        }}
                    >
                        {data.text}
                    </p>
                </div>
                <Handle type="target" position={Position.Left} id="a" />
                {/* <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                style={handleStyle}
            /> */}
            </div>
        </>
    );
}

export default TextUpdaterNode;