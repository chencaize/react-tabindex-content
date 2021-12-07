import React, { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import propTypes from "prop-types";
import getNextActiveElement from "./utils";

function TabIndexContent(props) {

    const { allowReadOnly, global } = props;

    const [id] = useState("TabIndexContent" + nanoid());

    const onKeyDown = useCallback((e) => {
        if (e.key.toLowerCase() === "tab") {
            let tabIndexDoms = document.getElementById(id).querySelectorAll("[tabIndex]");
            let nextActiveDom = getNextActiveElement(tabIndexDoms, { allowReadOnly });
            if (nextActiveDom && typeof nextActiveDom.focus === "function") {
                nextActiveDom.focus();
            }
            e.preventDefault();
        }
    }, [id, allowReadOnly])

    useEffect(() => {
        if (global === true) {
            document.addEventListener("keydown", onKeyDown);
        } else {
            document.getElementById(id).addEventListener("keydown", onKeyDown);
        }
        return () => {
            if (global === true) {
                document.removeEventListener("keydown", onKeyDown);
            } else {
                document.getElementById(id).removeEventListener("keydown", onKeyDown);
            }
        }
    }, [global, id, onKeyDown])

    return (
        <div id={id} tabIndex="-1">
            {props.children}
        </div>
    )
}

TabIndexContent.propTypes = {
    allowReadOnly: propTypes.bool,
    global: propTypes.bool
}

TabIndexContent.defaultProps = {
    allowReadOnly: false,
    global: true,
}

export default TabIndexContent;