import React, { useState, useEffect } from "react";
import { Grid, MenuItem, FormControl, Select } from "@mui/material";
import { useStyles } from "../style";
import axios from "axios";
import { useSelector } from "react-redux";

export default function EventRespond(props) {
    const auth = useSelector((state) => state.auth);
    const classes = useStyles();
    const [eventReaction, setEventReaction] = useState("");
    const [eventObject, setEventObject] = useState([]);
    const payload = {
        activity_id: props.data.id,
        activity_actor: props.data.actor.data.personal_feed_id,
        user_id: auth.user_id.toString(),
        actor: auth.t_feed,
        full_name: auth.full_name,
        email: auth.email,
    };
    useEffect(() => {
        if (props.data.own_reactions.attending !== undefined) {
            setEventObject(props.data.own_reactions.attending[0]);
            setEventReaction("attending");
        }
        if (props.data.own_reactions.not_interested !== undefined) {
            setEventObject(props.data.own_reactions.not_interested[0]);
            setEventReaction("not_interested");
        }
        if (props.data.own_reactions.interested !== undefined) {
            setEventObject(props.data.own_reactions.interested[0]);
            setEventReaction("interested");
        }
    }, []);

    useEffect(() => {
        if (props.respondId == props.data.id) {
            setEventReaction(props.eventReactionData);
            setEventObject(props.eventMenuObject);
        }
        props.setRespondId("");
    }, [props.respondId]);
    const updateEventReaction = (event_response) => {
        let previous = eventReaction;
        let current = previous != event_response ? event_response : "";
        let already_rspved = eventObject != [] ? true : false;

        axios
            .post(
                "/api/v1/social/calendar/reactions",
                {
                    ...payload,
                    event_type: "event",
                    data: { current, previous },
                    reaction_id: already_rspved ? eventObject.id : null,
                },
                {
                    headers: { Authorization: `Bearer ${auth.access_token}`, "Content-Type": "application/json" },
                }
            )
            .then((response) => {
                props.setEventRespondCount(true);
                props.setEventMenuObject(response.data.data);
                props.setRespondId(props.data.id);
                setEventReaction(current);
                setEventObject(response.data.data);
            });
    };
    return (
        <Grid alignItems={"flex-end"}>
            <FormControl className={classes.componentFlex}>
                <Select
                    sx={{
                        height: "22px",
                        textTransform: "capitalize",
                        fontSize: "12px",
                        fontWeight: "600",
                    }}
                    value={eventReaction == "not_interested" ? "Not interested" : eventReaction}
                    onChange={(e) => {
                        setEventReaction(e.target.value),
                            updateEventReaction(e.target.value),
                            props.setEventReactionData(e.target.value);
                    }}
                    displayEmpty
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <>Respond</>;
                        }
                        return selected;
                    }}>
                    <MenuItem className={classes.selectmenu} value="attending">
                        Attending
                    </MenuItem>
                    <MenuItem className={classes.selectmenu} value="interested">
                        Interested
                    </MenuItem>
                    <MenuItem className={classes.selectmenu} value="not_interested">
                        Not interested
                    </MenuItem>
                </Select>
            </FormControl>
        </Grid>
    );
}
