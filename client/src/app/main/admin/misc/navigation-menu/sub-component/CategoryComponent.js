import React, { useRef, useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
    makeStyles
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import LinkIcon from '@material-ui/icons/Link';
import FilterFramesIcon from '@material-ui/icons/FilterFrames';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import CoverImageEditor from './CoverImageEditor';
import Grid from '@material-ui/core/Grid';
import ColorField from '@catu/components/ColorField';

const ItemTypes = {
    CATEGORY: 'category',
}

export default ({ category, index, moveCard, deleteCard, updateCard, isNew }) => {
    const ref = useRef(null);
    const [edit, setEdit] = useState(false);
    const [changed, setChanged] = useState(false);
    const [lCategory, setLocalCategory] = useState(null);

    const useStyles = makeStyles({
        card: {
            maxWidth: 400,
            margin: '0px 10px 10px 10px',
            boxShadow: 'none',
            border: '1px solid #d4d4d4',
        },
        title: {
            color: (lCategory && lCategory.color_text ? lCategory.color_text : null),
            fontWeight: 'bold',
        },
        cardContent: {
            padding: '10px 16px 0px 16px',
        },
        media: {
            height: 140,
        },
        input: {
            margin: '0px 0px 10px 0px',
        },
    });
    const classes = useStyles();

    const [, drop] = useDrop({
        accept: ItemTypes.CATEGORY,
        hover(item, monitor) {
            if (!ref.current || item.index === index) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        item: { 
            type: ItemTypes.CATEGORY, 
            id: category.id, 
            index
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    useEffect(() => {
        let type = 1; // Detect type
        setLocalCategory({
            ...category,
            type
        });
    }, [category]);

    useEffect(() => {
        if (isNew) {
            setEdit(true);
        }
    }, [isNew]);

    const opacity = isDragging ? 0 : 1;
    const border = isDragging ? '2px dashed grey' : '';

    drag(drop(ref));

    return (
        <Card 
            className={`${classes.card} w-full sm:w-1/2 lg:w-1/4 flex flex-col`} 
            ref={ref}
            style={{
                border,
                background: (lCategory && lCategory.color_background ? lCategory.color_background : null),
            }}
        >
            {
                (!edit && lCategory) && (
                    <>
                        <CardHeader
                            classes = {
                                {
                                    subheader: classes.title,
                                }
                            }
                            style={{
                                opacity
                            }}
                            subheader={lCategory.title}
                        />
                        <CardMedia
                            style={{opacity}}
                            className={classes.media}
                            image={lCategory && lCategory.image ? lCategory.image : 'assets/images/news-block/default-image.png'}
                            title={lCategory.title}
                        />
                    </>
                ) 
            }
            {
                (edit && lCategory) && (
                    <CardContent style={{opacity}}>
                        <FormControl className={'mb-16 w-full'}>
                            <InputLabel htmlFor="url">Titre</InputLabel>
                            <Input
                                id='title'
                                type='title'
                                value={lCategory.title}
                                required={true}
                                autoComplete="off"
                                onChange={(event) => {
                                    const { value } = event.target;
                                    if (!lCategory.title || value !== lCategory.title) {
                                        setChanged(true);
                                        setLocalCategory({
                                            ...lCategory,
                                            title: value,
                                        });
                                    }
                                }}
                            />
                        </FormControl>
                        
                        <FormControl className={'mb-16 w-full'}>
                            <InputLabel htmlFor="url">Lien</InputLabel>
                            <Input
                                id='link'
                                type='link'
                                value={lCategory.link}
                                required={true}
                                autoComplete="off"
                                onChange={(event) => {
                                    const { value } = event.target;
                                    if (value !== lCategory.title) {
                                        setChanged(true);
                                        setLocalCategory({
                                            ...lCategory,
                                            link: value,
                                        });
                                    }
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle link external"
                                            onClick={() => {
                                                setChanged(true);
                                                setLocalCategory({
                                                    ...lCategory,
                                                    external: !lCategory.external,
                                                })
                                            }}
                                        >
                                            {lCategory.external ? <LinkIcon /> : <FilterFramesIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                            
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <ColorField
                                    className="mb-16 w-full"
                                    fullWidth
                                    type="input"
                                    name="color_text"
                                    id="color_text"
                                    label="Texte"
                                    value={ lCategory.color_text }
                                    // TODO disabled={loading}
                                    onPick = {
                                        (color) => {
                                            if (color !== lCategory.color_text) {
                                                setChanged(true);
                                                setLocalCategory({
                                                    ...lCategory,
                                                    color_text: color,
                                                });
                                            }
                                        }
                                    }
                                    validations={{
                                        maxLength: 7,
                                    }}
                                    validationErrors={{
                                        maxLength: '7 caractères au maximum',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <ColorField
                                    className="mb-16 w-full"
                                    fullWidth
                                    type="input"
                                    name="color_background"
                                    id="color_background"
                                    label="Fond"
                                    value={ lCategory.color_background }
                                    // TODO disabled={loading}
                                    onPick = {
                                        (color) => {
                                            if (color !== lCategory.color_background) {
                                                setChanged(true);
                                                setLocalCategory({
                                                    ...lCategory,
                                                    color_background: color,
                                                });
                                            }
                                        }
                                    }
                                    validations={{
                                        maxLength: 7,
                                    }}
                                    validationErrors={{
                                        maxLength: '7 caractères au maximum',
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <CoverImageEditor
                            image={lCategory.image}
                            elementId={lCategory.id}
                            deleteImage={() => {
                                setChanged(true);
                                setLocalCategory({
                                    ...lCategory,
                                    image: null,
                                });
                            }}
                            editImage={(image) => {
                                setChanged(true);
                                setLocalCategory({
                                    ...lCategory,
                                    image: image,
                                });
                            }}
                        />
                    </CardContent>
                )
            }
            
            <CardActions style={{opacity}}>
                <Button 
                    size="small" 
                    color="primary"
                    onClick={() => {
                        setEdit(!edit);
                        if (edit && changed) {
                            updateCard({
                                ...lCategory,
                                isNew: false,
                            }, index);
                        }
                    }}
                    disabled={edit && !changed}
                >
                    {edit ? 'Enregistrer' : 'Modifier'}
                </Button>
                <Button 
                    size="small"
                    color="primary"
                    onClick={() => {
                        deleteCard(index);
                    }}
                >
                    Supprimer
                </Button>
                {
                    edit && (
                        <Button 
                            size="small"
                            color="primary"
                            onClick={() => {
                                setEdit(false);
                                if (isNew) {
                                    deleteCard(index);
                                }
                            }}
                        >
                            Annuler
                        </Button>
                    )
                }
            </CardActions>
        </Card>
    )
}