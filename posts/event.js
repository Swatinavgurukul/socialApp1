import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Avatar, Grid, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import React from "react";
import { useStyles } from "../style";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { Stream } from "@cloudflare/stream-react";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

function ViewEvent({ data }) {
    const classes = useStyles();
    const [imageShow, setImageShow] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = (image) => {
        setImageShow(image.original_image);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };
    const formatTime = (time) => {
        return new Date(time).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    };
    return (
        <>
            <Grid>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid container mt={0} px={2}>
                        <Grid item pt={0}>
                            <Avatar className={classes.eventTimeinterval}>
                                <EventAvailableIcon className={classes.eventAvailableIconSx} />
                            </Avatar>
                        </Grid>
                        <Grid item xs pl={2} className={classes.alignVerticalCenter}>
                            <Typography className={classes.userInfo}>
                                {data.data && data.data.title && data.data.title}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container px={2}>
                        <Grid item pt={0}></Grid>
                        <Grid item xs pl={6}>
                            <Typography className={classes.eventDetailText}>
                                <EventAvailableIcon className={classes.eventDetailsIcon} />
                                {data.data && data.data.start_date ? `${formatDate(data.data.start_date)} at ${formatTime(data.data.start_date)}` : null}
                                <span className={classes.textMuted}> to </span>
                                {data.data && data.data.end_date ? `${formatDate(data.data.end_date)} at ${formatTime(data.data.end_date)}` : null}
                            </Typography>
                            {data.data && data.data.location && (
                                <Typography
                                    className={classes.eventLocationsx}>
                                    <LocationOnOutlinedIcon className={classes.eventDetailsIcon} />
                                    {data.data.location}
                                </Typography>
                            )}
                            {data.data && data.data.meeting_link && data.data.meeting_link.length >= 50 ? (
                                <Typography className={classes.eventDetailText} style={{ cursor: "pointer" }}>
                                    <VideocamOutlinedIcon className={classes.eventDetailsIcon} />
                                    <a
                                        style={{ "word-break": "break-all" }}
                                        href={data.data.meeting_link}
                                        target="_blank"
                                        className={classes.linkStyle}>
                                        {" "}
                                        {data.data && data.data.meeting_link.substr(0, 50)}...
                                    </a>
                                </Typography>
                            ) : (
                                data.data &&
                                data.data.meeting_link &&
                                data.data.meeting_link.length > 0 && (
                                    <Typography className={classes.eventDetailText}>
                                        <VideocamOutlinedIcon className={classes.eventDetailsIcon} />
                                        <a href={data.data.meeting_link} target="_blank" className={classes.meetingLinkColor}>
                                            {" "}
                                            {data.data && data.data.meeting_link}
                                        </a>
                                    </Typography>
                                )
                            )}
                        </Grid>
                    </Grid>
                    {data.tweet && data.tweet !== undefined ? (
                        <Grid container mt={1} pl={3} pr={3}>
                            <Grid item xs>
                                <Typography className={classes.eventDetailText} style={{ flexFlow: "wrap" }}>
                                    {data.tweet.trim().split(" ").map(word => (
                                        <>
                                            {word.startsWith("@") ?
                                                <a
                                                    href="#"
                                                    className={classes.mentionWord}
                                                >
                                                    {word.substring(1)}{" "}
                                                </a> :
                                                <span>{word}</span>}
                                            &nbsp;
                                        </>
                                    ))}
                                </Typography>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid pb={1} />
                    )}
                    <Grid container mt={1} px={2}>
                        <Grid item xs>
                            <Grid>
                                <Grid container spacing={1}>
                                    {data.attachments.image &&
                                        data.attachments.image.map((image, index) => (
                                            <Grid
                                                xs={data.attachments.image.length % 2 === 1 && index === 0 ? "12" : "6"}
                                                item
                                                onClick={() => handleOpen(image)}
                                                className={classes.cursorPointerSx}
                                                >
                                                <img
                                                    src={image.transformed_image}
                                                    width="100%"
                                                    style={{ borderRadius: "8px" }}
                                                />
                                            </Grid>
                                        ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container mt={1}>
                        <Grid item xs>
                            <Grid>
                                <Grid container spacing={2}>
                                    {data.attachments.video &&
                                        data.attachments.video.map((video, index) => (
                                            <Grid
                                                xs={
                                                    data.attachments.video.length % 2 === 1 &&
                                                        index === data.attachments.video.length - 1
                                                        ? "12"
                                                        : "6"
                                                }
                                                item
                                                pb={1}
                                                className={classes.cursorPointer}
                                                >
                                                <Stream controls src={video.uid} />
                                            </Grid>
                                        ))}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            <Box className={classes.eventImgModal}>
                                <IconButton>
                                    <CloseIcon onClick={handleClose} />
                                </IconButton>
                                <img width="100%" src={imageShow} alt="origanal image" height="90%" />
                            </Box>
                        </Modal>
                    </Grid>
                </LocalizationProvider>
            </Grid>
        </>
    );
}

export default ViewEvent;
