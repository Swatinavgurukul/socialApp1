import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

export default function Anniversary(data) {
    const [value, setValue] = useState(0);
    const useStyles = makeStyles(() => ({
        noBorder: {
            border: "none",
        },
    }));

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setComment(true);
    };

    return (
        <Container>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Grid>
                    <Grid container lg={12} pt={2} pb={2}>
                        <Grid item lg={1} md={2} sm={2} xs={2}>
                            <Avatar
                                style={{
                                    backgroundColor: "#000ff",
                                    width: "40px",
                                    height: "40px",
                                }}>
                                <img
                                    src="/public/social-img/anniversary.svg"
                                    alt="anniversary icon"
                                    width="40px"
                                    height="40px"
                                />
                            </Avatar>
                        </Grid>
                        <Grid item lg={11} md={10} sm={10} xs={10} pl={1}>
                            <Typography variant="h5">Today's Work Anniversaries</Typography>
                            <Typography sx={{ color: "#6D6D6D" }}>Oct 20, 2021</Typography>
                        </Grid>
                        <Grid item pt={1} pb={1} lg={12} md={12} sm={12} xs={12} sx={{ borderRadius: 3 }}>
                            <Box sx={{ bgcolor: "background.paper" }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons
                                    aria-label="visible arrows tabs example"
                                    sx={{
                                        borderRadius: 2,
                                        [`& .${tabsClasses.scrollButtons}`]: {
                                            "&.Mui-disabled": { opacity: 0.3 },
                                        },
                                    }}>
                                    {data &&
                                        data.data.map((data, index) => (
                                            <Tab
                                                style={{ textTransform: "none", color: "black" }}
                                                icon={<Avatar src="anniversary3.svg" />}
                                                label={
                                                    <React.Fragment>
                                                        {data.full_name}
                                                        <br />
                                                        <span style={{ fontSize: "smaller", color: "#3C5597" }}>
                                                            {data.d_o_j}
                                                        </span>
                                                    </React.Fragment>
                                                }></Tab>
                                        ))}
                                </Tabs>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}
