import React from 'react';

class Titles extends React.Component {
    render() {
        return (
            <div id="main-title">
                <h1 className="title-container__title">Awsome Weather App</h1>
                <p className="title-container__subtitle">Find the Weather where you want to be!</p>
            </div>
        );
    }
}

export default Titles;