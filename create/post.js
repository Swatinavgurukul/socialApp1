import { FormControl, Grid, TextField, ImageList, ImageListItem, ImageListItemBar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useStyles } from "../style";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import Mention from "../partials/mention";
import { ClickAwayListener } from "@mui/base";
const Post = (props) => {
    const classes = useStyles();
    const [pplMentioned, setPplMentioned] = useState({});
    const [postBeforeMent, setPostBeforeMent] = useState("");
    const [mentionFilter, setMentionFilter] = useState("")
    const [filteredUser, setFilteredUser] = useState([])
    const [mentionEl, setMentionEl] = useState(false);
    const mentionOpen = Boolean(mentionEl);

    // Runs everytime the tab is highlighted
    useEffect(() => {
        props.updatePayload({ event_type: "post" });
        props.setPostIsOpened(false);
    }, []);
    useEffect(() => {
        const filteredList = props.userList && props.userList.filter((item) => {
            let search = mentionFilter.toLowerCase();
            return item.full_name.toLowerCase().startsWith(search);
        });
        setFilteredUser(filteredList);
    }, [mentionFilter]);
    return (
        <Grid>
            <FormControl fullWidth>
                <TextField
                    width="100%"
                    id="outlined-multiline-static"
                    value={props.payload.message}
                    onChange={(e) => {
                        let val = e.target.value;
                        let last_index = val.lastIndexOf("@");

                        last_index >= 0 && setMentionFilter(val.substring(last_index + 1));
                        last_index >= 0 && props.userList && setFilteredUser(
                            props.userList.filter((item) => {
                                let search = mentionFilter.toLowerCase();
                                return item.full_name.toLowerCase().startsWith(search);
                            }))
                        props.updatePayload({ message: e.target.value })
                        val[val.length - 1] == "@" && (val.length === 1 || val[val.length - 2] === " ")
                            ? (
                                setMentionEl(e.currentTarget),
                                setPostBeforeMent(val)
                            )
                            : null;

                    }
                    }
                    multiline
                    onClick={() => props.setPostIsOpened(true)}
                    rows={!props.isOpened ? 0 : mentionOpen ? 0 : 2}
                    classes={{ notchedOutline: classes.input }}
                    placeholder="Write something..."
                    InputProps={{
                        classes: { notchedOutline: classes.noBorder },
                    }}
                />
                {mentionOpen &&
                    <ClickAwayListener onClickAway={() => setMentionEl(null)}>
                        <Grid className={classes.postMentionBox}>
                            <Mention
                                values={filteredUser}
                                Selectedvalue={pplMentioned}
                                handleClick={(value) => {
                                    props.updatePayload({
                                        message: `${postBeforeMent}${value.first_name}${value.last_name} `,
                                        data: {
                                            ...props.default_data,
                                            mention: { ...pplMentioned, [value.s_notification_feed]: value.full_name }
                                        }

                                    });
                                    setMentionEl(null)
                                    setPplMentioned({ ...pplMentioned, [value.s_notification_feed]: value.full_name })
                                }}
                            />
                        </Grid>
                    </ClickAwayListener>
                }
            </FormControl>
            {props.images && props.images.length > 0 || props.video && props.video.length > 0 ? (
                <Grid>
                    <Grid m={0}>
                        <ImageList className={classes.imagelist}>
                            {props.images &&
                                props.images.map((item, index) => (
                                    <ImageListItem key={item.img}>
                                        <img
                                            src={`${item.transformed_image}?w=164&fit=crop&auto=format`}
                                            srcSet={`${item.transformed_image}?w=164&fit=crop&auto=format&dpr=2 2x`}
                                            alt="image"
                                            loading="lazy"
                                        />
                                        <ImageListItemBar
                                            actionIcon={
                                                <IconButton>
                                                    <CloseIcon
                                                        className={classes.crossbutton}
                                                        onClick={() => props.handleImageCancel(index)}
                                                    />
                                                </IconButton>
                                            }
                                        />
                                    </ImageListItem>
                                ))}
                        </ImageList>
                    </Grid>
                    <Grid>
                        <ImageList className={classes.imagelist}>
                            {props.video &&
                                props.video.map((video, index) => (
                                    <ImageListItem key={video.thumbnail}>
                                        <img
                                            src={`${video.thumbnail}?w=164&h=164&fit=crop&auto=format`}
                                            srcSet={`${video.thumbnail}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            alt="image"
                                            loading="lazy"
                                        />
                                        <ImageListItemBar
                                            title={<SlowMotionVideoIcon />}
                                            actionIcon={
                                                <IconButton>
                                                    <CloseIcon
                                                        className={classes.crossbutton}
                                                        onClick={() => props.handleVideoCancel(index)}
                                                    />
                                                </IconButton>
                                            }
                                        />
                                    </ImageListItem>
                                ))}
                        </ImageList>
                    </Grid>
                </Grid>
            ) : (
                ""
            )}
        </Grid>
    );
};
const mapStatetoProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStatetoProps)(Post);
