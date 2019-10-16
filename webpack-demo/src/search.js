'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import './search.less';
import logo from "./images/1.png"

class Search extends React.Component {
    render() { 
        return <div className="search-text">Search Text极客时间
            <img src={logo} />
        </div>;
    }
}
 
ReactDom.render(<Search/>, document.getElementById('root'))