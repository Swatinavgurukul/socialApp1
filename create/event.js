import { ClickAwayListener } from "@mui/base";
import CloseIcon from "@mui/icons-material/Close";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
    Avatar,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Mention from "../partials/mention";
import { useStyles } from "../style";
const EventNew = (props) => {
    // mention
    const [pplMentioned, setPplMentioned] = useState({});
    const [postBeforeMent, setPostBeforeMent] = useState("");
    const [mentionFilter, setMentionFilter] = useState("");
    const [filteredUser, setFilteredUser] = useState([]);
    const [mentionEl, setMentionEl] = useState(false);
    const mentionOpen = Boolean(mentionEl);
    const [startDate, setStartDate] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [meetingUrl, setMeetingUrl] = useState("");
    const classes = useStyles();

    // Runs everytime the tab is highlighted
    useEffect(() => {
        props.updatePayload({ event_type: "event" });
        props.setPostIsOpened(true);
    }, []);
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
        return currentDate.getTime() < selectedDate.getTime();
    };
    const isValidUrl = (url) => {
        if (url !== "") {
            if (
                url.match(
                    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
                ) !== null
            ) {
                props.updateEventPayload({ meeting_link: meetingUrl });
                setIsValid(true);
                props.setIsTrue(true);
            } else {
                toast.error("Please enter a valid Meeting link!");
                setIsValid(false);
                props.setIsTrue(false);
            }
        }
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid
                container
                wrap="nowrap"
                className={classes.eventGridSx}
                alignItems="flex-start">
                <Grid item>
                    <Avatar className={classes.avatarSx}>
                        <EventAvailableOutlinedIcon className={classes.eventIcon} />
                    </Avatar>
                </Grid>
                <Grid container xs={12} alignItems="flex-start" zeroMinWidth>
                    <Grid item xs={12} className={classes.eventTextFieldGrid}>
                        <TextField
                            fullWidth
                            id="titleofEvent"
                            multiline
                            minRows={1}
                            classes={{ notchedOutline: classes.input, root: classes.card__title }}
                            placeholder="Title of the event*"
                            InputProps={{
                                classes: { notchedOutline: classes.noBorder },
                            }}
                            size="small"
                            value={props.payload.data.title}
                            onChange={(e) => {
                                props.updateEventPayload({ title: e.target.value }), props.setPostIsOpened(true);
                            }}
                        />
                    </Grid>
                    <Grid lg={11} sm={12} xs={12}>
                        <Grid container sm={12} pl={"12px"}>
                            <Grid item lg={4} md={4} sm={6} xs={12} className={classes.todayIconGrid}>
                                <TodayOutlinedIcon
                                    fontSize="medium"
                                    className={classes.todayIconSx}
                                />
                                <DatePicker
                                    className={classes.inputFieldDateTime}
                                    selected={props.payload.data.start_date}
                                    minDate={new Date()}
                                    filterTime={filterPassedTime}
                                    onChange={(e) => {
                                        setStartDate(e);
                                        props.setPostIsOpened(true);
                                        props.updateEventPayload({ start_date: e });
                                    }}
                                    locale="pt-BR"
                                    showTimeSelect
                                    timeFormat="p"
                                    timeIntervals={15}
                                    dateFormat="Pp"
                                    placeholderText="Start Date &  time*"
                                />
                            </Grid>
                            <Grid item lg={4} md={4} sm={6} xs={12} display= "flex">
                                <TodayOutlinedIcon
                                    fontSize="medium"
                                    className={classes.todayIconSx}
                                />
                                <DatePicker
                                    className={classes.inputFieldDateTime}
                                    selected={props.payload.data.end_date}
                                    minDate={moment(startDate).toDate()}
                                    filterTime={filterPassedTime}
                                    onChange={(e) => {
                                        props.setPostIsOpened(true);
                                        props.updateEventPayload({ end_date: e });
                                    }}
                                    disabled={startDate === ""}
                                    locale="pt-BR"
                                    showTimeSelect
                                    timeFormat="p"
                                    timeIntervals={15}
                                    dateFormat="Pp"
                                    placeholderText="End Date &  time*"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container sm={12} pl={"12px"}>
                        <Grid item lg={12} md={12} sm={12} xs={12} pt={"5px"} pr={3}>
                            <TextField
                                placeholder="Add Location "
                                InputProps={{
                                    classes: { notchedOutline: classes.noBorder, root: classes.small_input },
                                    disableUnderline: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {" "}
                                            <RoomOutlinedIcon className={classes.roomIconColor} />
                                        </InputAdornment>
                                    ),
                                }}
                                id="standard-adornment-amount"
                                size="small"
                                fullWidth
                                value={props.payload.data.location}
                                onChange={(e) => {
                                    props.updateEventPayload({ location: e.target.value }), props.setPostIsOpened(true);
                                }}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} pl={"2px"}>
                            {isValid ? (
                                <Typography
                                    className={classes.eventDetailText}
                                    onClick={() => {
                                        setIsValid(false);
                                    }}>
                                    <VideocamOutlinedIcon className={classes.eventDetailsIcon} />
                                    <a className={classes.eventAnchorColor}>{props.payload.data.meeting_link}</a>
                                </Typography>
                            ) : (
                                <TextField
                                    placeholder="Add meeting invite link "
                                    InputProps={{
                                        classes: {
                                            notchedOutline: classes.noBorder,
                                            root: classes.meeting_link,
                                        },
                                        disableUnderline: true,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <VideocamOutlinedIcon className={classes.eventIcon} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    id="standard-adornment-amount"
                                    size="small"
                                    className={classes.meeting_link}
                                    color="secondary"
                                    fullWidth
                                    value={meetingUrl}
                                    onChange={(e) => {
                                        setMeetingUrl(e.target.value);
                                        props.setPostIsOpened(true);
                                    }}
                                    onBlur={(e) => {
                                        isValidUrl(e.target.value);
                                    }}
                                />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container wrap="nowrap" alignItems="flex-start">
                <Grid item xs={12} pl={"5px"}>
                    <TextField
                        width="100%"
                        id="descriptionId"
                        multiline
                        minRows={1}
                        placeholder="Try to describe the event (optional)"
                        InputProps={{
                            classes: { notchedOutline: classes.noBorder, root: classes.description__root },
                        }}
                        fullWidth
                        value={props.payload.message}
                        onChange={(e) => {
                            let val = e.target.value;
                            let last_index = val.lastIndexOf("@");

                            last_index >= 0 && setMentionFilter(val.substring(last_index + 1));
                            last_index >= 0 &&
                                props.userList &&
                                setFilteredUser(
                                    props.userList.filter((item) => {
                                        let search = mentionFilter.toLowerCase();
                                        return item.full_name.toLowerCase().startsWith(search);
                                    })
                                );
                            props.updatePayload({ message: e.target.value }), props.setPostIsOpened(true);
                            val[val.length - 1] == "@" && (val.length === 1 || val[val.length - 2] === " ")
                                ? (setMentionEl(e.currentTarget), setPostBeforeMent(val))
                                : null;
                        }}
                    />
                </Grid>
            </Grid>
            {mentionOpen && (
                <ClickAwayListener onClickAway={() => setMentionEl(null)}>
                    <Grid className={classes.postMentionBox}>
                        <Mention
                            values={filteredUser}
                            Selectedvalue={pplMentioned}
                            handleClick={(value) => {
                                props.updatePayload({
                                    message: `${postBeforeMent}${value.first_name}${value.last_name} `,
                                });
                                setMentionEl(null);
                                // props.updateEventPayload({mention: { ...pplMentioned, [value.s_notification_feed]: value.full_name }})
                                setPplMentioned({ ...pplMentioned, [value.s_notification_feed]: value.full_name });
                            }}
                        />
                    </Grid>
                </ClickAwayListener>
            )}
            {(props.images && props.images.length > 0) || (props.video && props.video.length > 0) ? (
                <Grid>
                    <Grid>
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
        </LocalizationProvider>
    );
};

const mapStatetoProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStatetoProps)(EventNew);
