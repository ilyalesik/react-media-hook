import React from "react";
import ReactDOM from "react-dom";
import {useMedia} from "../"

const MEDIA_QUERY = "(min-width: 1200px)";

const App = () => {
    const result = useMedia(MEDIA_QUERY);

    console.log(result);

    return <div>
        <p>{MEDIA_QUERY}</p>
        <p>Result: {(result && result.matches) ? "Yes" : "No"}</p>
    </div>
};


if (root) {
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
}
