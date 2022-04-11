import { makeStyles } from "@mui/styles";
import { style } from "@mui/system";
import { Component } from "react";

const customStyles = {
    socailMain: {
        backgroundColor: "#F0F2F5",
        // height: "100vh",
    },
    scrollFeed: {
        height: "100vh",
        "overflow-x": "hidden",
        overflow: "scroll",
        scrollbarWidth: "none" /* Firefox */,
        "&::-webkit-scrollbar": {
            display: "none",
        } /* Chrome */,
    },
    creatPostCard: {
        width: "100%",
        border: "4px",
        borderRadius: "8px",
        borderColor: "#ddd",
        backgroundColor: "#fff",
    },
    viewPostcard: {
        border: "1px solid #ddd",
        backgroundColor: "#fff",
    },
    selectToPost: {
        "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
            height: "40px",
        },
    },
    commentBox: {
        "& .css-1uvydh2": {
            padding: "2px 3px 2px 14px",
            height: "26px",
            color: "#000000",
        },
        "& .css-1gnht4k": {
            padding: "2px 3px 2px 14px",
        },
        "& .css-rlri6x-MuiInputBase-input-MuiOutlinedInput-input": {
            paddingLeft: "19px",
        },
        "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
            padding: "2px 3px 2px 14px",
            height: "26px",
            color: "#000000",
        },
        "& .css-152mnda-MuiInputBase-input-MuiOutlinedInput-input": {
            padding: "2px 3px 2px 14px",
        },
        "& .css-16jcc9y-MuiInputBase-root-MuiOutlinedInput-root": {
            paddingLeft: "0px",
        },
    },
    gifInput: {
        "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
            padding: "5px 5px",
        },
        "& .css-1x5jdmq": {
            padding: "5px 5px",
        },
    },
    inputFieldDateTime: {
        fontSize: "14px",
        border: "1px solid #ddd",
        "border-radius": "5px",
        padding: "10px",
    },
    // post css
    post_btn: {
        textAlign: "end",
    },
    noBorder: {
        border: "none",
    },
    border: {
        borderWidth: "1px solid #ddd",
    },

    input: {
        "& .MuiInputBase-root": {
            padding: "0px",
        },
    },
    crossbutton: {
        color: "white",
    },
    imagelist: {
        overflow: "hidden",
    },
    datepicker: {
        margin: "2px 0px 2px 0px",
        height: "60px",
        // width: 'fit-content',
        padding: "20px 15px 10px",
        borderBottom: "2px solid blue",
        backgroundColor: "#fff",
        color: "#2c2c2c",
        width: 300,
        fontWeight: 600,
    },
    meeting_link: {
        fontSize: "14px",
        "& .MuiInputBase-input ": {
            paddingRight: "18px",
        },
        "& .MuiOutlinedInput-input": {
            paddingRight: "18px",
        },
        // MuiInputBase-root-MuiOutlinedInput-root
        "& .MuiInputBase-root": {
            paddingLeft: 0,
        },
    },
    small_input: {
        fontSize: "0.875rem",
        padding: 0,
        "& .MuiInputBase-root": {
            paddingRight: "8px",
        },
        "& .MuiInputBase-input ": {
            paddingRight: "0px",
            paddingLeft: "px",
        },
        "& .MuiOutlinedInput-input": {
            paddingRight: "0px",
        },
    },
    card__title: {
        "& .MuiInputBase-root": {
            fontSize: "14px",
            paddingTop: "3px",
        },
    },
    description__root: {
        fontSize: "14px",
        "& .MuiInputBase-root": {
            paddingbottom: "10px",
        },
        "& .MuiInputBase-input ": {
            paddingLeft: "3.5px",
        },
    },
    date_input: {
        "& .MuiInputBase-root": {
            fontSize: "0.9rem",
            "& input:placeholder": {
                color: "red",
            },
        },
        "& .MuiInput-input": {
            fontSize: "0.9rem",
            "& input:placeholder": {
                color: "red",
            },
        },
        "& .MuiInputBase-input": {
            fontSize: "0.9rem",
            input: {
                "&::placeholder": {
                    color: "yellow",
                },
            },
            "& input:placeholder": {
                color: "red",
            },
        },
        "& input:placeholder": {
            color: "red",
        },
    },
    //jp styles for post
    postMentionBox: {
        boxShadow: 10,
        borderRadius: 2,
        marginLeft: 3,
        zIndex: 1,
        top: 50,
        maxHeight: "200px",
        overflow: "scroll",
        width: "80%",
        "overflow-x": "hidden",
        "&::-webkit-scrollbar": {
            width: 2,
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray",
            borderRadius: 2,
        },
    },
    // poll css
    "& .css-11o2879-MuiDrawer-docked .MuiDrawer-paper": {
        width: "calc(72px + 1px)",
    },

    //Main container CSS
    mainContainer: {
        backgroundColor: "#F0F2F5",
    },
    //Post container CSS
    loader: {
        "text-align": "center",
        background: "#fff",
        padding: "15px",
        "font-weight": "bold",
        borderRadius: "8px",
        color: "#569ade",
    },

    eventContainer: {
        backgroundColor: "white",
        borderRadius: "8px",
        border: "1px solid #E0E0E0",
    },
    userProfile: {
        backgroundColor: "#F2F0F4",
        width: "40px",
        height: "40px",
        color: "#6D6D6D",
    },
    //Header CSS
    userInfo: {
        fontSize: "14px",
    },
    username: {
        textDecoration: "none",
    },

    timeInterval: {
        color: "#919191",
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        cursor: "default",
        marginTop: "-1px",
        fontSize: "12px",
    },
    alignVerticalCenter: {
        display: "flex",
        alignItems: "center",
    },
    eventTimeinterval: {
        backgroundColor: "#F2F0F4",
        width: "35px",
        height: "35px",
    },
    eventTimeBlock: {
        backgroundColor: "transparent",
    },
    eventDetailsIcon: {
        width: "18px",
        height: "20px",
        color: "#6D6D6D",
        marginRight: "5px",
    },
    eventDetailText: {
        fontSize: "14px",
        color: "#1A1C1E",
        display: "flex",
        alignItems: "start",
        marginTop: "10px",
    },
    boldText: {
        color: "#475569",
        fontSize: "13px",
        fontWeight: 600,
    },
    okrFeedtext: {
        color: "#475569",
        fontSize: "13px",
        fontWeight: "normal",
        display: "flex",
        alignItems: "center",
        textTransform: "capitalize",
    },
    textMuted: {
        color: "#73777E",
        display: "contents",
    },
    linkStyle: {
        color: "#3A86FF",
        textDecoration: "none",
    },
    mentionBox: {
        maxHeight: "200px",
        overflow: "scroll",
        width: "80%",
        "overflow-x": "hidden",
        "&::-webkit-scrollbar": {
            width: 2,
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray",
            borderRadius: 2,
        },
    },
    dotIcon: {
        width: "5px",
        height: "5px",
        color: "#808080",
        marginLeft: "7px",
    },
    departPublicIcon: {
        width: "15px",
        height: "15px",
        color: "#808080",
        marginLeft: "7px",
    },
    GroupsPublicIcon: {
        width: "18px",
        height: "18px",
        color: "#808080",
        marginLeft: "7px",
    },
    intrestedUserBlock: {
        color: "#73777E",
        paddingBottom: "10px",
        borderBottom: "1px solid #E0E0E0",
    },
    intrestedUserText: {
        fontSize: "12px",
    },
    commentsText: {
        fontSize: "12px",
        cursor: "pointer",
    },
    respondText: {
        fontSize: "12px",
        color: "#808080",
    },
    writeComment: {
        fontSize: "14px",
        color: "#6D6D6D",
        textTransform: "capitalize",
        display: "flex",
    },
    likePostIcon: {
        color: "#1B73EB",
        width: "16px",
        height: "16px",
        marginRight: "5px",
        marginBottom: "-4px",
    },
    postImageSection: {
        height: "180px",
        backgroundColor: "#BDC8D6",
    },
    commentUserProfile: {
        backgroundColor: "#87D992",
        width: "35px",
        height: "35px",
        marginRight: "5px",
    },
    commentProfile: {
        width: "35px",
        height: "35px",
        marginRight: "5px",
    },
    SubcommentUserProfile: {
        backgroundColor: "#87D992",
        width: "30px",
        height: "30px",
        marginRight: "5px",
    },
    commentBlock: {
        backgroundColor: "#EDF1F9",
        borderRadius: "8px",
        margin: "0px 0px 5px 5px",
        padding: "10px !important",
        width: "100%",
    },
    commentUserName: {
        color: "#000000",
        fontWeight: "600",
        fontSize: "13px",
    },
    userCommentText: {
        fontSize: "14px",
        color: "#000000",
        marginTop: "2px",
    },
    loadComments: {
        color: "#73777F",
        textTransform: "inherit",
        marginTop: "12px",
    },
    commentLikeBlock: {
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        color: "#6D6D6D",
    },
    marRightt10: {
        marginRight: "6px",
        marginTop: "0px",
        display: "flex",
    },
    marRightt10Reply: {
        marginRight: "6px",
        marginTop: "0px",
        display: "flex",
        cursor: "pointer",
    },
    userCommentIcon: {
        width: "16px",
        height: "16px",
        color: "#808080",
    },
    postPreMsg: {
        borderColor: "#DFE3EC",
        color: "#6D6D6D",
        fontSize: "14px",
        textTransform: "inherit",
        "&:hover": {
            borderColor: "#DFE3EC",
            color: "#6D6D6D",
            fontSize: "14px",
            backgroundColor: "transparent",
        },
    },
    birthdayUserProfile: {
        backgroundColor: "#E0E0E0",
        width: "90px",
        height: "90px",
        margin: "0px auto",
        color: "#6D6D6D",
        border: "2px solid #E0E0E0",
    },
    birthdayPostIcon: {
        backgroundColor: "#ffffff",
        width: "35px",
        height: "35px",
        color: "#FF8271",
        margin: "0 auto",
        marginTop: "-20px",
        position: "absolute",
        left: "52%",
        bottom: "32%",
    },
    birthdayUserName: {
        textAlign: "center",
        fontWeight: "600",
        marginTop: "15px",
        fontSize: "16px",
        textTransform: "Capitalize",
    },
    birthdayImageSection: {
        backgroundImage: 'url("/public/default/birthdayBg.png")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "180px",
        borderBottom: "1px solid #DFE3EC",
        borderTop: "1px solid #DFE3EC",
    },
    box: {
        display: "flex",
    },
    componentFlex: {
        flex: "1 1 auto",
    },
    selectmenu: {
        fontSize: "14px",
    },
    // Headers
    size14weight600: {
        fontWeight: "600",
        fontSize: "14px",
        marginTop: "10px",
    },
    size9weight600: {
        fontWeight: "600",
        fontSize: "9px",
        marginTop: "10px",
    },
    size9mT5: {
        fontSize: "9px",
        marginTop: "5px",
    },
    spaceBetween: {
        display: "flex",
        justifyContent: "space-between",
    },
    size9mT10: {
        fontSize: "9px",
        marginTop: "10px",
    },
    viewPost: {
        border: "1px solid #ddd",
        borderRadius: 2,
        background: "#fff",
    },

    // upcoming Component style--

    loading: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "8vh",
        backgroundColor: "white",
        width: "100%",
        borderRadius: "8px",
    },
    emptyState: {
        fontSize : "12px",
        textAlign: "center",
        alignItems: "center",
        height: "30px",
        backgroundColor: "white",
        fontWeight: "bold",
        width: "100%",
        marginTop: "20px",
    },
    upcomingEvents: {
        fontSize: "12px",
        textAlign: "center",
        backgroundColor: "white",
        fontWeight: "bold",
        width: "100%",
    },
    assignmentIcon: {
        height: "18px",
        width: "15px",
        marginRight: "10px",
    },
    buttonStyle: {
        textAlign: "center",
        backgroundColor: "#E0E0E0",
        color: "#000000",
        borderRadius: "50%",
        width: "20px",
        height: "20px",
        marginLeft: "10px",
    },
    GridStyle: {
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
    },
    textStyle: {
        fontSize: "14px",
        "&:hover": {
            color: "#3A86FF",
            cursor: "pointer",
            textDecoration: "underline",
        },
    },
    chipStyle: {
        textTransform: "capitalize",
        fontSize: "10px",
        textAlign: "center",
        backgroundColor: "#039be5",
        color: "#FFFFFF",
        fontSize: "10px",
        width: "70px",
        height: "18px",
    },
    styledGrid: {
        width: "80px",
        marginLeft: "10px",
        alignItems: "center",
        textAlign: "center",
    },
    styledChip: {
        fontSize: "10px",
        width: "70px",
        height: "18px",
        color: "white",
        textTransform: "capitalize",
    },
    stylingGrid: {
        background: "#FFFFFF",
        border: "1px solid #DDDDDD",
        borderRadius: "10px",
    },
    tabStyle: {
        textTransform: "capitalize",
        fontWeight: "bold",
        marginRight: "30px",
    },
    tabStyle1: {
        textTransform: "capitalize",
        fontWeight: "bold",
    },
    tabPanel: {
        padding: 1,
        minHeight: "100px",
        maxHeight: "200px",
        overflow: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
            display: "none",
        },
    },
    spacing: {
        display: "flex",
        alignItems: "center",
        margin: "10px",
    },
    ueGrid: {
        background: " #FFFFFF",
        border: "1px solid #DDDDDD",
        borderRadius: "10px",
        alignItems: "center",
    },
    ueTypography: {
        fontSize: "1rem",
        padding: "16px 0px 0px 16px",
        fontWeight: "bold",
    },
    ueGrid2: {
        "&:hover": {
            backgroundColor: "#F5F5F5",
            borderRadius: "5px",
        },
    },
    ueGridStyling: {
        display: "flex",
        alignItems: "top",
        justifyContent: "space-between",
    },
    ueStyledGrid: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    ueGridStyling1: {
        minWidth: "55px",
        minHeight: "55px",
        backgroundColor: "#579BDE",
        borderRadius: "5px",
        marginBottom: "5px",
    },
    textStyling: {
        fontWeight: "bold",
        textAlign: "center",
        color: "#ffffff",
        fontSize: "12px",
        marginTop: "10px",
    },
    dateStyling: {
        textAlign: "center",
        color: "#ffffff",
        fontSize: "12px",
    },
    taskTitle: {
        fontWeight: "bold",
        fontSize: "12px",
        paddingLeft: "5px",
    },
    timeStyling: {
        display: "flex",
        paddingBottom: "4px",
        paddingTop: "5px",
        alignItems: "center",
    },
    AccessAlarmIcon: {
        color: "#646464",
        height: "14px",
    },
    textStyling1: {
        margin: 0,
        fontSize: "12px",
        color: "#646464",
    },
    textStyling2: {
        display: "flex",
        alignItems: "center",
    },
    locationIcon: {
        color: "#646464",
        height: "14px",
    },
    textStyling3: {
        color: "#646464",
        fontSize: "12px",
    },
    linkStyle: {
        textDecoration: "none",
        color: "black",
        "&:hover": {
            textDecoration: "underline",
        },
    },
    // create style ---
    btnSx: {
        textTransform: "none",
        color: "black",
    },
    cancelBtnSx: {
        height: "30px",
        textTransform: "none",
        color: "black",
        marginLeft: 10,
    },
    postBtnSx: {
        height: "30px",
        textTransform: "none",
    },
    iconSize: {
        fontSize: "24px",
    },
    selectSx: {
        height: "30px",
    },
    eventGridSx: {
        paddingTop: "15px",
        paddingLeft: "20px",
    },
    avatarSx: {
        width: "40px",
        height: "40px",
        backgroundColor: "#F2F0F4",
    },
    eventIcon: {
        color: "#6D6D6D",
        fontSize: "1.5rem",
    },
    todayIconSx: {
        marginTop: "5px",
        marginRight: "10px",
    },
    //jp styles for event
    eventTextFieldGrid: {
        paddingTop: "3px",
    },
    todayIconGrid: {
        display: "flex",
        marginRight: 100,
    },
    roomIconColor: {
        color: "#6D6D6D",
    },
    eventAnchorColor: {
        color: "#1B73EB",
    },
    // Post Style --
    // Goal--
    SingleGoalUpdateBg: {
        backgroundImage: 'url("/public/default/goal.svg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        textAlign: "center",
        height: "150px",
    },
    goalAvatarSx: {
        backgroundColor: "#F2F0F4",
        width: "35px",
        height: "35px",
    },
    typographySx: {
        fontWeight: 600,
        fontSize: "16px",
        color: "#334155",
    },
    muiGridSxItem: {
        "& .MuiGrid-item": {
            paddingTop: "0px",
            marginTop: "0px",
        },
    },
    goalAlignItems: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    gridFlexSx: {
        display: "flex",
        alignItems: "center",
    },
    // Anniversary --
    SingleAnniversaryImg: {
        backgroundImage: 'url("/public/default/anniversary.svg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        padding: "40px",
        textAlign: "center",
        borderRadius: 8,
    },
    gridPositionSx: {
        position: "relative",
        "text-align": "center",
    },
    imgSx: {
        height: "100px",
        borderRadius: "50%",
        border: "2px solid #fff",
    },
    // Event --
    eventAvailableIconSx: {
        width: "18px",
        height: "18px",
        color: "#6D6D6D",
    },
    eventLocationsx: {
        fontSize: "14px",
        color: "#1A1C1E",
        display: "flex",
        alignItems: "start",
        marginTop: "10px",
        "word-break": "break-all",
        width: "60%",
    },
    meetingLinkColor: {
        color: "#0062A1",
    },
    cursorPointer: {
        cursor: "pointer",
    },
    cursorPointerSx: {
        cursor: "pointer",
        paddingTop: "2px",
    },
    mentionWord: {
        color: "#0062A1",
        textTransform: "capitalize",
        textDecoration: "none",
        cursor: "default",
    },
    eventImgModal: {
        height: "60vh",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        backgroundColor: "white",
        boxShadow: 24,
        border: "none",
        p: 2,
    },
    // Promotion --
    SinglePromotionBg: {
        backgroundImage: 'url("/public/default/promotion.svg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        padding: "40px",
        textAlign: "center",
        borderRadius: 8,
    },
    PromotionProfileImg: {
        height: "100px",
        borderRadius: "50%",
        border: "2px solid #fff",
    },
    // OKR-
    okrBg: {
        backgroundImage: 'url("/public/social-img/okr_socialimg.png")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        textAlign: "center",
        height: "150px",
    },
    okrMsg: {
        fontWeight: 600,
        fontSize: "16px",
        color: "#334155",
    },
    // NewJoinee-
    SingleBirthdayImg: {
        backgroundImage: 'url("/public/default/joinee.svg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        padding: "40px",
        textAlign: "center",
        borderRadius: 8,
    },
    newJoineeImg: {
        height: "100px",
        borderRadius: "50%",
        border: "2px solid #fff",
    },
    // Post-
    lessMoreBtn: {
        textTransform: "none",
        color: "rgb(25, 118, 210)",
    },
    postImgModal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        backgroundColor: "white",
        boxShadow: 24,
        border: "none",
        p: 2,
    },

    // partials style--
    // header-
    fullNameSx: {
        color: "#0062A1",
        textTransform: "capitalize",
        textDecoration: "none",
        cursor: "default",
    },
    // Hover on profile IMG
    avatarBoxSx: {
        background: "#FF8271",
        color: "#FDFCFF",
        height: "20px",
        width: "20px",
        padding: "15px",
    },
    reporting_toSx: {
        fontSize: "9px",
        marginLeft: "5px",
    },
    mailOutlineIconSx: {
        fontSize: "small",
        marginRight: "6px",
    },
    callIconSx: {
        fontSize: "small",
        marginRight: "6px",
    },
    // Comment --
    clearIconSx: {
        bgcolor: "#97CBFF",
        fontSize: "small",
        borderRadius: "10px",
        cursor: "pointer",
    },
    selectRespondSx: {
        height: "30px",
        textTransform: "capitalize",
        fontSize: "14px",
        fontWeight: "400",
    },
    commentShareBtn: {
        marginRight: "5px",
        fontWeight: "600",
        fontSize: "14px",
        color: "#6D6D6D",
        textTransform: "capitalize",
        display: "flex",
    },
    gridContentSx: {
        display: "flex",
        justifyContent: "space-between",
    },
    gridContainerSx: {
        display: "block",
        width: "100%",
        margin: "0 auto",
    },
    cardActionsSx: {
        padding: "0",
        paddingBottom: "10px",
    },
    reactionCountGrid: {
        display: "inline-flex",
        marginLeft: "4px",
    },
};

export const useStyles = makeStyles((theme) => customStyles);
