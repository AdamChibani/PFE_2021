import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { FusePageSimple } from '@fuse';
import { useTranslation } from 'react-i18next';

const styles = theme => ({
    layoutRoot: {}
});

function Page(props) {
    const { t } = useTranslation();
    const { classes } = props;

    return (
        <FusePageSimple
            classes={{
                root: classes.layoutRoot
            }}
            header={
                <div className="flex flex-1 items-center justify-between p-24">
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <Icon className="text-18" color="action">dashboard</Icon>
                            <Icon className="text-16" color="action">chevron_right</Icon>
                            <Typography color="textSecondary">{t('App:title')}</Typography>
                        </div>
                    </div>
                </div>
            }
            content={
                <div className="p-24"></div> 
            }
        />
    )
}

export default withStyles(styles, { withTheme: true })(Page);