import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";

const layout = (props) => (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
        <ColorPanel />
        <SidePanel 
        />

        <Grid.Column style={{ marginLeft: 450 }}>
            <Messages />
        </Grid.Column>

        <Grid.Column width={4}>
            <MetaPanel />
        </Grid.Column>
    </Grid>
);


export default React.memo(layout);