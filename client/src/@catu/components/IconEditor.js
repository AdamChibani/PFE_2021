import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';
import ReactCrop from 'react-image-crop';
import Tooltip from '@material-ui/core/Tooltip';
import store from 'app/store';
import { showMessage } from 'app/store/actions';
import 'react-image-crop/dist/ReactCrop.css';
// import * as communService from 'app/services/axios/communs/commun.service';

const useStyles = makeStyles(theme => ({
    editButton: {
        opacity: '0',
        position: 'absolute',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        bottom: 0,
        transition: '0.3s',
        color: theme.palette.common.black,
        '&:hover': {
            opacity: '0.8',
            background: theme.palette.common.white,
            
        },
    },
    input: {
        display: 'none',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    buttonRightGrid: {
        textAlign: 'right',
        marginBottom: '18px'
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
        display: 'inline-block'
    },
    buttonProgress: {
        color: theme.palette.common.white,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    removeButton: {
        top: 0,
        right: 0,
        position: 'absolute',
        background: '#f44336',
        zIndex: 2,
        borderRadius: '100%',
        width: '20px',
        height: '20px',
        lineHeight: '17px',
        textAlign: 'center',
        cursor: 'pointer',
        color: 'white',
        margin: '-5px -5px 0px 0px',
        translation: '0.5s ease',
        '&:hover': {
            background: '#9a2820',
        }
    }
}));

function IconEditor(props) {
    const { disabled, handleUpload, handleRemove, services } = props;
    const communService = services || {};
    const { t } = useTranslation();
    const classes = useStyles();
    
    const fileInput = useRef();
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [imageRef, setImageRef] = useState(null);
    const [cropButtonState, setCropButtonState] = useState(false);
    const [crop, setCrop] = useState({
        aspect: 1 / 1,
        width: 200,
        height: 200,
    });

    useEffect(() => {
        setImage(props.image);
    }, [props]);

    // Remove image
    function removeImage() {
        if (typeof handleRemove === 'function') {
            handleRemove();
        }
    }

    // Handling the input[file]
    function handleEditProfileImage(e) {
        if (e.target.files && e.target.files.length > 0) {
            handleOpen(); // Open the modal
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                setImage(reader.result)
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    // Dynamicly update the crop state
    function onCropChange(crop) {
        setCrop(crop);
    };

    // Set the image state for cropping later
    const onImageLoaded = useCallback(img => {
        setImageRef(img);
    }, []);

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
                canvas.toBlob(blob => {
                    if (!blob) {
                        store.dispatch(
                            showMessage({
                                message:  t("error.crop") ,
                                autoHideDuration: 3000,
                                variant: 'error',
                            }));
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
                    blob.encoding = 'UTF-8';

                    // Uploader
                    communService.upload(blob)
                        .then((response) => {
                            handleClose(); // Close the mandal
                            // dispatch the uploaded file
                            if (typeof handleUpload === 'function') {
                                handleUpload({response});
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            if (typeof handleUpload === 'function') {
                                handleUpload({error});
                            }
                            setCropButtonState(false); // disable send button
                        });
                    

                    resolve(fileUrl);
                }, 'image/png');
            });
        }
    } 

    const handleClose = () => {
        // Resets
        fileInput.current.value = null; // Reset the file input
        setImageRef(null);
        setImage(null)
        setCropButtonState(false); // activate send button
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <div className="relative">
                {
                    image && (
                        <Tooltip title={t('button.remove_icon')}>
                            <div className={classes.removeButton} onClick={removeImage}>x</div>
                        </Tooltip>
                    )
                }
                <Avatar className="w-32 h-32 sm:w-48 sm:h-48">
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        ref={fileInput}
                        onChange={handleEditProfileImage}
                    />
                    <label htmlFor="contained-button-file">
                        <IconButton
                            disabled={disabled}
                            component="span"
                            className={classes.editButton}
                            onClick={ev => {
                                ev.stopPropagation();
                            }}
                        >
                            <Icon>{image ? 'edit' : 'cloud_upload'}</Icon>
                        </IconButton>
                    </label>
                    
                    <img
                        className={classes.image}
                        alt={t('icon')}
                        src={image || '/assets/images/avatars/icon.svg'}
                    />
                </Avatar>
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
                                <Typography variant="h6" gutterBottom={true}>{t('crop')}</Typography>
                            </Grid>
                            <Grid item className={classes.buttonRightGrid} xs={6}>
                                <div className={classes.wrapper}>
                                    <Button 
                                        variant="outlined"
                                        onClick={genAndSendCropedImage} 
                                        disabled={cropButtonState}
                                        id="user-profile-crop-image-modal-button"
                                    >
                                        {t('crop')}
                                    </Button>
                                    {cropButtonState && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </div>
                            </Grid>
                        </Grid>
                        <ReactCrop 
                            src={image}
                            crop={crop}
                            onChange={onCropChange}
                            onImageLoaded={onImageLoaded}
                            // onComplete={makeClientCrop}
                            
                            keepSelection={true}
                            style={{
                                backgroundImage: 'url("/assets/images/backgrounds/png-back.png")',
                                backgroundColor: 'white',
                            }}
                            imageStyle = {
                                {
                                    maxWidth: '50vw',
                                    maxHeight: '50vh'
                                }
                            }
                        />
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default IconEditor;
