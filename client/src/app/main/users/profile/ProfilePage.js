import React, { useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";
import FusePageSimple from "@fuse/components/FusePageLayouts/simple/FusePageSimple";
import FuseAnimate from "@fuse/components/FuseAnimate";
import AboutTab from "./tabs/AboutTab";
import { useSelector, useDispatch } from "react-redux";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import store from "app/store";
import * as Actions from "app/store/actions";
import * as AuthActions from "app/auth/store/actions";
import { updateProfilePicture } from "app/services/graphql/users/users.service";
import { useTranslation } from "react-i18next";
import ProfileTab from "./tabs/ProfileTab";
import PreferenceTab from "./tabs/PreferenceTab";

// import { mainService } from "app/services/tekru";

const useStyles = makeStyles((theme) => ({
  layoutHeader: {
    height: 320,
    minHeight: 320,
    [theme.breakpoints.down("md")]: {
      height: 240,
      minHeight: 240,
    },
  },
  editDiv: {
    background: "#00000080",
    position: "absolute",
    width: "100%",
    height: "40%",
    textAlign: "center",
    bottom: 0,
    color: theme.palette.common.white,
    transition: "0.3s",
    "&:hover": {
      background: "#00000080",
      height: "100%",
    },
    span: {
      fontSize: theme.typography.subtitle1.fontSize,
    },
  },
  input: {
    display: "none",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonRightGrid: {
    textAlign: "right",
    marginBottom: "18px",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display: "inline-block",
  },
  buttonProgress: {
    color: theme.palette.common.white,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

function ProfilePage() {
  const { t } = useTranslation();
  // Render the JSS
  const classes = useStyles();

  // Setting the states
  const [selectedTab, setSelectedTab] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [imageRef, setImageRef] = useState(null);
  const [cropButtonState, setCropButtonState] = useState(false);
  const [crop, setCrop] = useState({
    aspect: 1 / 1,
    width: 200,
    height: 200,
  });

  // Set Refs
  const fileInput = useRef();
  const dispatch = useDispatch();

  // Get the user from Redux
  const user = useSelector(({ auth }) => auth.user);

  // Dynamicly update the crop state
  function onCropChange(crop) {
    setCrop(crop);
  }

  // Set the image state for cropping later
  function onImageLoaded(image) {
    setImageRef(image);
  }

  // Verify then crop the image
  function genAndSendCropedImage() {
    setCropButtonState(true); // disable send button
    // Verify image and data
    if (imageRef && crop.width && crop.height) {
      // Config
      const image = imageRef;
      const fileName = "profile-picture.jpeg";
      // Let's crop
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              store.dispatch(
                Actions.showMessage({
                  message: t("error.crop"),
                  autoHideDuration: 3000,
                  variant: "error", //success error info warning null
                })
              );
              setCropButtonState(false); // disable send button
              //reject(new Error('Canvas is empty'));
              return;
            }
            blob.name = fileName;
            let fileUrl;
            window.URL.revokeObjectURL(fileUrl);
            fileUrl = window.URL.createObjectURL(blob);

            // Post th eimage
            blob.filename = blob.name;
            blob.mimetype = blob.type;
            blob.encoding = "UTF-8";
            console.log(blob);
            updateProfilePicture(blob)
              .then((response) => {
                console.log("####");
                handleClose(); // Close the mandal
                // dispatch the profile picture
                dispatch(AuthActions.updateUserProfilePicture(response));
                store.dispatch(
                  Actions.showMessage({
                    message: t("success.update.profil_picture"),
                    autoHideDuration: 3000,
                    variant: "success", //success error info warning null
                  })
                );
              })
              .catch((error) => {
                if (process.env.NODE_ENV !== "production")
                  console.error({ error });
                store.dispatch(
                  Actions.showMessage({
                    message: t("error.update.profil_picture"),
                    variant: "error", // success error info warning null
                  })
                );
                setCropButtonState(false); // disable send button
              });

            resolve(fileUrl);
          },
          "image/jpeg",
          0.95
        );
      });
    }
  }

  // Tab handler
  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  // Handling the input[file]
  function handleEditProfileImage(e) {
    if (e.target.files && e.target.files.length > 0) {
      handleOpen(); // Open the modal
      const reader = new FileReader();
      reader.addEventListener("load", () => setProfileImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    // Resets
    fileInput.current.value = null; // Reset the file input
    setImageRef(null);
    setProfileImage(null);
    setCropButtonState(false); // activate send button
    setOpen(false);
  };

  return (
    <FusePageSimple
      classes={{
        header: classes.layoutHeader,
        toolbar: "px-16 sm:px-24",
      }}
      header={
        <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
          <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <div>
                <Avatar className="w-96 h-96">
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    ref={fileInput}
                    onChange={handleEditProfileImage}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      color="primary"
                      id="uers-profile-change-profile-picture-button"
                      component="span"
                      className={classes.editDiv}
                    >
                      {t("button.edit")}
                    </Button>
                  </label>
                  <img
                    alt={user.data.displayName}
                    src={
                      user.data.photoURL && user.data.photoURL !== ""
                        ? user.data.photoURL
                        : "assets/images/avatars/profile.jpg"
                    }
                  />
                </Avatar>
              </div>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography className="md:ml-24" variant="h4" color="inherit">
                {user.data.displayName}
              </Typography>
            </FuseAnimate>
          </div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            id="user-profile-crop-image-modal"
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom={true}>
                      {t("crop_image")}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.buttonRightGrid} xs={6}>
                    <div className={classes.wrapper}>
                      <Button
                        variant="outlined"
                        onClick={genAndSendCropedImage}
                        disabled={cropButtonState}
                        id="user-profile-crop-image-modal-button"
                      >
                        {t("crop")}
                      </Button>
                      {cropButtonState && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  </Grid>
                </Grid>

                <ReactCrop
                  src={profileImage}
                  crop={crop}
                  onChange={onCropChange}
                  onImageLoaded={onImageLoaded}
                  keepSelection={true}
                  imageStyle={{
                    maxWidth: "50vw",
                    maxHeight: "80vh",
                  }}
                />
              </div>
            </Fade>
          </Modal>

          <div className="flex items-center justify-end"></div>
        </div>
      }
      contentToolbar={
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="off"
          classes={{
            root: "h-64 w-full border-b-1",
          }}
        >
          <Tab
            classes={{
              root: "h-64",
            }}
            label="A propos"
          />
          <Tab
            classes={{
              root: "h-64",
            }}
            label="Education"
          />
          <Tab
            classes={{
              root: "h-64",
            }}
            label="Preference"
          />
        </Tabs>
      }
      content={
        <div className="p-16 sm:p-24">
          {selectedTab === 0 && <AboutTab />}
          {selectedTab === 1 && <ProfileTab />}
          {selectedTab === 2 && <PreferenceTab />}
        </div>
      }
    />
  );
}

export default ProfilePage;
