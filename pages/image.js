import React, { useState, useRef } from "react";
import {
  Button,
  Typography,
  Fade,
  Modal,
  Grid,
  CircularProgress,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ReactCrop from "react-image-crop";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

// import { useDispatch } from "react-redux";
// import { showMessage } from "app/store/actions";
// import * as AuthActions from "app/auth/store/actions";
// import store from "app/store";
// import { jwtService } from "app/services/originServices";
// import { useTranslation } from "react-i18next";
const UPDATE_PROFILE_PICTURE = gql`
  mutation inc($file: Upload!) {
    setProfilePicture(file: $file)
  }
`;

function ProfilePictureAvatar(props) {
  const fileInput = useRef();
  const [jwtService] = useMutation(UPDATE_PROFILE_PICTURE);
  const [profileImage, setProfileImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [imageRef, setImageRef] = useState(null);
  const [cropButtonState, setCropButtonState] = useState(false);
  const [crop, setCrop] = useState({
    aspect: 1 / 1,
    width: 200,
    height: 200,
  });

  // Handling the input[file]
  /*function handleEditProfileImage(e) {
        if (e.target.files && e.target.files.length > 0) {
            handleOpen(); // Open the modal
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                setProfileImage(reader.result)
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    }*/

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
              // store.dispatch(
              //   showMessage({
              //     message: t("error.crop"),
              //     autoHideDuration: 3000,
              //     variant: "error", //success error info warning null
              //   })
              // );
              setCropButtonState(false); // disable send button
              //reject(new Error('Canvas is empty'));
              return;
            }
            blob.name = fileName;
            let fileUrl;
            window.URL.revokeObjectURL(fileUrl);
            fileUrl = window.URL.createObjectURL(blob);

            // Post th image
            blob.filename = blob.name;
            blob.mimetype = blob.type;
            blob.encoding = "UTF-8";
            console.log(typeof blob);
            jwtService({ variables: { file: blob } })
              .then((response) => {
                handleClose(); // Close the mandal
                // dispatch the profile picture
              })
              .catch((error) => {
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

  const handleClose = () => {
    // Resets
    fileInput.current.value = null; // Reset the file input
    setImageRef(null);
    setProfileImage(null);
    setCropButtonState(false); // activate send button
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  function handleEditProfileImage(e) {
    if (e.target.files && e.target.files.length > 0) {
      handleOpen(); // Open the modal
      const reader = new FileReader();
      reader.addEventListener("load", () => setProfileImage(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <>
      <Avatar className="w-96 h-96">
        <input
          accept="image/*"
          // className={classes.input}
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
            // className={classes.editDiv}
          >
            Modifier
          </Button>
        </label>
      </Avatar>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        id="user-profile-crop-image-modal"
      >
        <Fade in={open}>
          <div>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom={true}>
                  Recadrer mon image
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <Button
                    variant="outlined"
                    onClick={genAndSendCropedImage}
                    disabled={cropButtonState}
                    id="user-profile-crop-image-modal-button"
                  >
                    Recadrer
                  </Button>
                  {cropButtonState && <CircularProgress size={24} />}
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
    </>
  );
}

export default ProfilePictureAvatar;
