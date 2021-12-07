import React from "react";
import ReactDOM from "react-dom";
import TabIndexContent from "../src";

function App(props) {
    return (
        <div>
            <TabIndexContent global={true} allowReadOnly={true}>
                {
                    new Array(5).fill().map((item, index) => {
                        let tabIndex = Math.floor(Math.random() * 10 + (-5));
                        return (
                            <input key={index} style={{ width: 100, marginLeft: 10, marginTop: 10 }} tabIndex={tabIndex} placeholder={tabIndex}></input>
                        )
                    })
                }
                <input style={{ width: 100, marginLeft: 10, marginTop: 10 }} tabIndex={10} readOnly placeholder={`readOnly${10}`}></input>
                <input style={{ width: 100, marginLeft: 10, marginTop: 10 }} tabIndex={11} disabled placeholder={`disabled${11}`}></input>
            </TabIndexContent>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));