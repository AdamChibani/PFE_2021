import React, { useEffect, useState, Fragment } from 'react';
import {
    Icon,
    Typography,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@material-ui/core';
import { FusePageSimple } from '@fuse';
import MenuItemEditomponent from './sub-component/MenuItemEditomponent';
import MenuList from './sub-component/MenuList';
import {
    makeStyles
} from '@material-ui/styles';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import * as MainActions from 'app/store/actions';
import reducer from './store/reducer';
import menusService from 'app/services/tekru/menusService';
import userService from 'app/services/tekru/meService';
import miscAdminService from 'app/services/tekru/miscAdminService';
import {
    DndProvider
} from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import * as UserActions from 'app/auth/store/actions/user.actions';

const useStyles = makeStyles(theme => ({
    header: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color: theme.palette.getContrastText(theme.palette.primary.main)
    },
    headerIcon: {
        position: 'absolute',
        top: -64,
        left: 0,
        opacity: .04,
        fontSize: 512,
        width: 512,
        height: 512,
        pointerEvents: 'none'
    },
    actionsButton: {
        marginRight: '10px',
    }
}));

function NavigationMenuPage(props) {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const {
        data,
        synced,
        deletedItems,
        editableItem
    } = useSelector(({
        navMenuAdmin
    }) => navMenuAdmin);

    const sumbmitMenu = () => {
        setLoading(true);
        if (data) {
            menusService.sync(data, deletedItems)
                .then((response) => {
                    dispatch(Actions.syncServer(true));
                    userService.getMyAccesses()
                        .then((accesses) => {
                            dispatch(MainActions.updateNavigation(response));
                            dispatch(UserActions.updateAccesses(accesses));
                        })
                        .catch(error => {
                            console.log(error)
                        });
                    dispatch(MainActions.showMessage({
                        message: "Le menu est mis à jour.",
                        variant: 'success' // success error info warning null
                    }));
                    setLoading(false);
                })
                .catch(error => {
                    dispatch(Actions.syncServer(false));
                    dispatch(MainActions.showMessage({
                        message: "Erreur lors de la mise à jour du menu.",
                        variant: 'error' // success error info warning null
                    }));
                    setLoading(false);
                });
            return;
        }
        setLoading(false);
    }

    const handleSubmitMenu = () => {
        dispatch(MainActions.openDialog({
            children: (
                <Fragment>
                    <DialogTitle id="alert-dialog-title">Êtes-vous sûr?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            En confirmant, les modifications que vous avez apportées des serons synchronisés avec 
                            le serveur de l'application et tous les utilisateurs aurons le menu nouveau.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={
                                () => {
                                    sumbmitMenu();
                                    dispatch(MainActions.closeDialog());
                                }
                            }
                            color="primary"
                        >
                            Confirmer
                        </Button>
                        <Button onClick={()=> dispatch(MainActions.closeDialog())} color="primary" autoFocus>
                            Annuler
                        </Button>
                    </DialogActions>
                </Fragment>
                )
        }));
        return;
    }
    
    useEffect(() => {
        dispatch(Actions.resetApp());
        miscAdminService.getLevels()
            .then(data => {
                dispatch(Actions.setLevels(data));
            })
            .catch(error => {
            });
        menusService.get(true)
            .then((response) => {
                dispatch(Actions.setData(response));
            })
            .catch(error => {
            });
    }, [dispatch]);

    return (
        <FusePageSimple
            header={
                <div className="flex flex-1 items-center justify-between p-24">
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <Icon className="text-18" color="action">build</Icon>
                            <Icon className="text-16" color="action">chevron_right</Icon>
                            <Typography color="textSecondary">Administration / <strong>Gestion du menu latéral principal</strong></Typography>
                        </div>
                    </div>
                </div>
            }
            contentToolbar={
                <div className='px-24' >
                    <Button 
                        size="small"
                        className={classes.actionsButton}
                        onClick={() => {
                            dispatch(Actions.createItem());
                        }}
                        variant="outlined"
                        color="primary"
                        disabled={loading  || !editableItem}
                    >
                        Créer
                    </Button>
                    <Button
                        size="small"
                        className={classes.actionsButton}
                        variant="outlined"
                        color="primary"
                        onClick={handleSubmitMenu}
                        disabled={synced || loading}
                    >
                        Entregister le menu
                    </Button>
                </div>
            }
            content={
                <DndProvider backend = {Backend}>
                    <div className="md:flex max-w-2xl px-24">
                        <div className="flex flex-col flex-1 md:pr-32">
                            <div className="md:flex max-w-2xl">
                                <MenuList loading={loading}/>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 md:pr-32">
                                <MenuItemEditomponent loading={loading}/>
                            
                        </div>
                    </div>
                </DndProvider>
            }
        />
    )
}

export default withReducer('navMenuAdmin', reducer)(NavigationMenuPage);