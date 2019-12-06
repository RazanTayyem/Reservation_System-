import React from "react";
import { Link } from 'react-router-dom'
import backCursor from './backCursor.png';
import "./backcursor.css";

const BackCursor = () => (

    <div className="cursor">
        <Link to= '/events'>
        <img src={backCursor} alt="back Cursor"/>
        </Link>
    </div>
);
export default BackCursor;
