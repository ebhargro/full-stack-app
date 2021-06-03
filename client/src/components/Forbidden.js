import React, {Component} from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => (
    <div className="wrap">
        <h2> Forbidden </h2>
        <p> Sorry. You do not have authorization to access this page!</p>
    </div>
);

export default Forbidden;