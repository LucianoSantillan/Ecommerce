// import "./index.css";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";

const Counter = () => {
    const [count, setCount] = useState(1);
    const IncNum = () => {
        setCount(count + 1);
    };
    const DecNum = () => {
        if (count > 1) setCount(count - 1);
    };
    return (
        <>
            <div>
                <div>
                    <div style={{ display: 'flex' }}>
                        <Button onClick={DecNum}>
                            <RemoveIcon />
                        </Button>
                        <h1>{count}</h1>
                        <Button onClick={IncNum}>
                            <AddIcon />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Counter;