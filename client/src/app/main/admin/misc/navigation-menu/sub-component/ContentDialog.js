import React, {useEffect, useState} from 'react';
import {
    Slide,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import Category from './CategoryComponent'
import * as Actions from '../store/actions';
import update from 'immutability-helper'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default (props) => {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [dialog, showDialog] = useState(false);

    const {
        editableItem,
        categoryDialog
    } = useSelector(({navMenuAdmin}) => navMenuAdmin);

    const submit = () => {
        dispatch(Actions.closeCategoryDialog());
        if (typeof props.update === 'function') {
            props.update(categories);
        }
    }

    const creatNew = () => {
        setCategories([...categories, {
            title: '',
            image: '',
            color_text: null,
            color_background: null,
            link: '',
            external: false,
            isNew: true,
        }])
    }

    const moveCard = (dragIndex, hoverIndex) => {
        const dragCard = categories[dragIndex]
        setCategories(
            update(categories, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            })
        )
    }

    const deleteCard = (index) => {
        setCategories(
            categories.filter((category, i) => i !== index)
        )
    }
    
    const updateCard = (card, index) => {
        setCategories(
            categories.map((category, i) => {
                if (index === i) {
                    return card;
                } else {
                    return category;
                }
            })
        )
    }

    useEffect(() => {
        showDialog(Boolean(categoryDialog) && !!editableItem);
    }, [categoryDialog, editableItem]);
    
    useEffect(() => {
        if (editableItem && editableItem.data) {
            setCategories([...editableItem.data]);
        } else {
            setCategories([]);
        }
    }, [editableItem]);

    return (
        (dialog && (
            <Dialog
                fullWidth={true}
                maxWidth={'lg'}
                TransitionComponent={Transition}
                onClose={ev => dispatch(Actions.closeCategoryDialog())}
                open={dialog}
            >
                <DialogTitle>
                    {
                        `Edition de la catégorie « ${editableItem.title} »`
                    }
                </DialogTitle>
                <DialogContent>
                    <div className="flex flex-wrap py-24">
                        {
                            categories.map((category, i) => {
                                return (
                                    <Category
                                        key={i}
                                        index={i}
                                        isNew={category.isNew}
                                        category={category}
                                        moveCard={moveCard}
                                        deleteCard={deleteCard}
                                        updateCard={updateCard}
                                    />
                                )
                            })
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="button"
                        aria-label={props.cancelLabel}
                        label={props.cancelLabel}
                        onClick={creatNew}
                    >
                        Ajouter
                    </Button>
                    <Button
                        variant="outlined"
                        type="button"
                        aria-label={props.pickLabel}
                        //disabled={!selected}
                        onClick={submit}
                    >
                        Enregistrer
                    </Button>
                </DialogActions>
            </Dialog>
        ))
    );
}
