import React from "react";
import { Grid } from "semantic-ui-react";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";

const layout = (props) => { 
    return(
    <Grid columns="equal" className="app" style={{ background: props.secondaryColor }}>
        <ColorPanel 
            key={props.user && props.user.name}
            user={props.user}
        />
        <SidePanel 
        />

        <Grid.Column style={{ marginLeft: 420 }}>
            <Messages 
                key={props.selectedChannel && props.selectedChannel.id}
            />
        </Grid.Column>

        <Grid.Column width={4}>
            <MetaPanel />
        </Grid.Column>
    </Grid>
);
}


export default React.memo(layout);