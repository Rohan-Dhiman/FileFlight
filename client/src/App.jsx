import React from "react";
import uploadFolder from "./utils/uploadFolder";

function App() {
    return (
        <div>
            <form
                action="/api/upload"
                method="post"
                encType="multipart/form-data"
            >
                <input type="file" mulitple />
                
                <input
                    type="file"
                    name="files"
                    multiple
                    webkitdirectory=""
                    directory=""
                    webkitRelativePath=""
                />
                <button type="submit"> click me bro</button>
            </form>
        </div>
    );
}

export default App;
