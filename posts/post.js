import { Button, Grid, Typography, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { Stream } from "@cloudflare/stream-react";
import { useStyles } from "../style";

const ViewPost = ({ data }) => {
    const classes = useStyles();
    const [imageShow, setImageShow] = useState("");
    const [shown, setShown] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = (image) => {
        setImageShow(image.original_image);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    return (
        <>
            <Grid container mt={0}>
                <Grid item xs px={2} >
                    <Typography className={classes.eventDetailText} style={{ flexFlow: "wrap" }}>
                        {data.tweet.length >= 225 && shown ?
                            data.tweet.substr(0, 225).trim().split(" ").map(word => (
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
                            ))
                            : data.tweet.trim().split(" ").map(word => (
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
                            ))
                        }

                    </Typography>
                    {data.tweet.length >= 225 ? (
                        <Button
                            className={classes.lessMoreBtn}
                            component="span"
                            onClick={() => setShown(!shown)}>
                            {shown ? "Show more" : "Show less"}
                        </Button>
                    ) : (
                        ""
                    )}
                </Grid>
                <Grid container mt={1} px={2}>
                    <Grid item xs>
                        <Grid>
                            <Grid container spacing={1}>
                                {data.attachments !== undefined && data.attachments.image &&
                                    data.attachments.image.map((image, index) => (
                                        <Grid
                                            xs={
                                                data.attachments.image.length % 2 === 1 &&
                                                    index === 0
                                                    ? "12"
                                                    : "6"
                                            }
                                            item
                                            onClick={() => handleOpen(image)}
                                            className={classes.cursorPointerSx}>
                                            <img
                                                src={image.transformed_image}
                                                width="100%"
                                                style={{ borderRadius: "0px" }}
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
                                {data.attachments !== undefined && data.attachments.video &&
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
                                            className={classes.cursorPointer}>
                                            <Stream controls src={video.uid} />
                                        </Grid>
                                    ))}
                            </Grid>
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
                    <Box className={classes.postImgModal} >
                        <IconButton>
                            <CloseIcon onClick={handleClose} />
                        </IconButton>
                        <img width="100%" height="auto" src={imageShow} alt="origanal image" />
                    </Box>
                </Modal>
            </Grid>
        </>
    );
};
export default ViewPost;
