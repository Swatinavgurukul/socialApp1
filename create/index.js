import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { Box, Button, Divider, FormControl, Grid, MenuItem, Select } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomTabs from "@core/components/CustomTabs";
import { useStyles } from "../style";
import Event from "./event";
import Post from "./post";
import { toast } from "react-toastify";
import FileUploader from "../../uploader/uploaderModalDashboard";
import { UnmountClosed } from "react-collapse";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const Create = (props) => {
    const [mediaCount, setMediaCount] = useState(4);
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [video, setVideo] = useState([]);
    const [videoOpener, setVideoOpner] = useState(false);
    const handleImageUpdate = (response) => {
        setImages([...images, ...response.body.data]);
        setMediaCount(mediaCount - response.body.data.length);
        handleClose();
    };
    const handleVideoUpdate = (response) => {
        setVideo([...video, ...response.body.data]);
        setMediaCount(mediaCount - response.body.data.length);
        handleVideoClose();
    };
    const handleVideoCancel = (index) => {
        setVideo(video.filter((image, i) => index !== i));
        setMediaCount(mediaCount + 1);
    };
    const handleOpen = () => {
        if (mediaCount > 0) {
            setOpen(true);
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleVideoOpen = () => {
        if (mediaCount > 0) {
            setVideoOpner(true);
        }
    };
    const handleVideoClose = () => {
        setVideoOpner(false);
    };
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [groupArray, setGroupArray] = useState([{ all: "All" }]);
    const [group, setGroup] = useState("all");
    const [isOpened, setIsOpened] = useState(false);
    const [isTrue, setIsTrue] = useState(true);
    const auth = useSelector((state) => state.auth);

    const default_payload = {
        message: "",
        event_type: "post",
        data: {
            mention: {},
            title: "",
            start_date: "",
            end_date: "",
            meeting_link: "",
            location: "",
            all: false,
            to: [],
        },
    };
    const [payload, setPayload] = useState(default_payload);
    const authenticated_headers = {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.access_token}` },
    };
    const extra_payload = {
        full_name: auth.full_name,
        feed_group: auth.feed_group,
        feed_name: auth.user_id,
        email: auth.email,
    };
    const updatePayload = (data) => {
        setPayload(Object.assign({}, payload, data));
    };

    const updateEventPayload = (data) => {
        let eventData = { ...payload };
        Object.assign(eventData.data, data);
        setPayload(eventData);
    };
    const handleImageCancel = (index) => {
        setImages(images.filter((image, i) => index !== i));
        setMediaCount(mediaCount + 1);
    };
    const setPostIsOpened = (data) => {
        setIsOpened(data);
    };
    const handleClickAway = () => {
        setIsOpened(false);
    };
    const config = [
        {
            text: "Post",
            component: (
                <Post
                    updatePayload={updatePayload}
                    default_data={default_payload.data}
                    isOpened={isOpened}
                    setPostIsOpened={setPostIsOpened}
                    payload={payload}
                    images={images}
                    video={video}
                    handleVideoCancel={handleVideoCancel}
                    handleImageCancel={handleImageCancel}
                    userList={props.userList}
                />
            ),
        },
        {
            text: "Event",
            component: (
                <Event
                    updatePayload={updatePayload}
                    updateEventPayload={updateEventPayload}
                    setPostIsOpened={setPostIsOpened}
                    payload={payload}
                    setIsTrue={setIsTrue}
                    images={images}
                    video={video}
                    handleVideoCancel={handleVideoCancel}
                    handleImageCancel={handleImageCancel}
                    userList={props.userList}
                    default_data={default_payload.data}
                />
            ),
        },
    ];
    useEffect(() => {
        axios.post("/api/v1/core/getvisibility", { name: "all" }, authenticated_headers).then((response) => {
            if (response.data.status == 1) {
                setGroupArray(response.data.data);
            }
        });
    }, []);
    const post = () => {
        if (payload.event_type == "event") {
            if (payload.data.title == "") {
                toast.warning("Title Field Required Field");
                return;
            }
            if (payload.data.start_date == "") {
                toast.warning("Start Date & Time Field Required Field");
                return;
            }
            if (payload.data.start_date < new Date()) {
                toast.warning("Start Time Less Then current Time");
                return;
            }
            if (payload.data.start_date > payload.data.end_date) {
                toast.warning("End Date & Time Less Then Start Date & Time");
                return;
            }
            if (payload.data.end_date == "") {
                toast.warning("End Date & Time Field Required Field");
                return;
            }
        }

        let to = [group];
        if (group == "all") {
            to = groupArray.map((item) => item.feed_id);
            updateEventPayload({ all: true });
            updateEventPayload({ to: to });
        }
        setLoading(true);
        {
            isTrue
                ? axios
                      .post(
                          "/api/v1/social/activity/create",
                          { attachments: { video: video, image: images }, to, ...payload, ...extra_payload },
                          authenticated_headers
                      )
                      .then((response) => {
                          if (response.data.status == "200") {
                              toast.success(response.data.message);
                              setPostIsOpened(payload.event_type == "event" ? true : false);
                              setLoading(false);
                              props.addPost(response.data.data);
                              setPayload({ ...default_payload, event_type: payload.event_type });
                              setImages([]);
                              setVideo([]);
                          }
                          if (response.data.status == "400") {
                              toast.warning(response.data.message);
                              setPayload({ ...default_payload, event_type: payload.event_type });
                          }
                      })
                : toast.error("Please enter a valid Meeting link!");
        }
    };
    return (
        <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClickAway}>
            <Box className={classes.creatPostCard}>
                <CustomTabs config={config}></CustomTabs>
                {isOpened && <Divider />}
                <UnmountClosed isOpened={isOpened}>
                    <Grid container spacing={2} pl={2} pr={2} pt={1} pb={1}>
                        <Grid item lg={1} md={1} sm={1} xs={1}>
                            <label htmlFor="contained-button-file">
                                <Button
                                    className={classes.btnSx}
                                    startIcon={<ImageOutlinedIcon className={classes.iconSize} />}
                                    component="span"
                                    onClick={handleOpen}></Button>
                            </label>
                        </Grid>
                        <Grid item lg={1} md={1} sm={1} xs={1}>
                            <label htmlFor="contained-button-file">
                                <Button
                                    className={classes.btnSx}
                                    startIcon={<VideocamOutlinedIcon className={classes.iconSize} />}
                                    component="span"
                                    onClick={handleVideoOpen}></Button>
                            </label>
                        </Grid>
                        {payload.event_type === "post" && payload.message.length > 0 ? (
                            <Grid item lg={2} md={2} sm={2} xs={2}></Grid>
                        ) : (
                            <Grid item lg={4} md={4} sm={4} xs={4}></Grid>
                        )}
                        <Grid item lg={3} md={3} sm={3} xs={3}>
                            <Box>
                                <FormControl fullWidth>
                                    <Select
                                        fullWidth
                                        className={classes.selectSx}
                                        value={group}
                                        onChange={(e) => {
                                            setGroup(e.target.value), updateEventPayload({ to: e.target.value });
                                        }}
                                        displayEmpty>
                                        <MenuItem value="all" name="All">
                                            All
                                        </MenuItem>
                                        {groupArray.map((item) => (
                                            <MenuItem value={item.feed_id} name={item.name}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        {payload.event_type === "post" && payload.message.length > 0 && (
                            <Grid item lg={2} md={2} sm={2} xs={2}>
                                <Button
                                    className={classes.cancelBtnSx}
                                    onClick={() => {
                                        updatePayload({ message: "" }), setPostIsOpened(false);
                                    }}>
                                    Cancel
                                </Button>
                            </Grid>
                        )}
                        <Grid item lg={3} md={3} sm={3} xs={3} className={classes.post_btn}>
                            {payload.event_type === "post" ? (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() => post()}
                                    id="createPost"
                                    disabled={payload.message.trim().length == 0 || groupArray.length == 0 || loading}
                                    className={classes.postBtnSx}>
                                    Post
                                </Button>
                            ) : (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    id="createEvent"
                                    onClick={() => post()}
                                    disabled={
                                        payload.data.title === "" ||
                                        payload.data.start_date === "" ||
                                        payload.data.end_date === ""
                                    }
                                    className={classes.postBtnSx}>
                                    Post
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </UnmountClosed>
                {/* image uploader */}
                <FileUploader
                    maxFileSize={1000000000}
                    maxNumberOfFiles={mediaCount}
                    allowedFileTypes={["image/*"]}
                    endpoint="/api/v1/core/upload/image"
                    fieldName="image"
                    open={open}
                    handleClose={handleClose}
                    handleFileUpdate={handleImageUpdate}
                    place="post"
                    method="put"
                />
                {/* video uploader */}
                <FileUploader
                    maxFileSize={100000000000}
                    maxNumberOfFiles={mediaCount}
                    allowedFileTypes={["video/*"]}
                    endpoint="/api/v1/core/upload/video"
                    fieldName="video"
                    open={videoOpener}
                    handleClose={handleVideoClose}
                    handleFileUpdate={handleVideoUpdate}
                    place="post"
                    method="put"
                />
            </Box>
        </ClickAwayListener>
    );
};

export default Create;
