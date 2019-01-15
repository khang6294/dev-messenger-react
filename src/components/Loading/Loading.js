import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

const loading = () => (
    <Dimmer active>
        <Loader size="huge" content={"Loading..."} />
    </Dimmer>
);

export default loading;