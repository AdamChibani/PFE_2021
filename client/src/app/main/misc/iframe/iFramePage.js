import React, { useEffect, useState } from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple} from '@fuse';
import IframeComponent from '@catu/components/iFrameComponent';
import FuseUtils from '@fuse/FuseUtils';
import {
    useSelector
} from 'react-redux';
import { searchNavTree } from '@catu/helpers/navTrees';

const styles = theme => ({
    root: {
        minHeight: 'auto'
    },
    layoutRoot: {
        minHeight: 'auto'
    },
});

function IFrame(props) {
    const {classes} = props;
    const { params } = props.match
    const [url, setUrl] = useState();
    const navigation = useSelector(({
        fuse
    }) => fuse.navigation);
    const userRole = useSelector(({auth}) => auth.user.role);

    useEffect(() => {
        if (params && params.id) {
            const id = params.id.split('-');
            const item = searchNavTree(navigation, parseInt(id[0]));
            if (item) {
                let permission = true;
                if (item.auth) {
                    permission = FuseUtils.hasPermission({
                        slug: item.auth,
                        permission: 'can_view'
                    }, userRole)
                }
                if (permission) {
                    if (!parseInt(id[1]) && item.url && (item.url.startsWith('https://') || item.url.startsWith('http://'))) {
                        setUrl(item.url);
                    } else if (item.data && item.data.length > 0) {
                        const category = item.data.find(item => item.id === parseInt(id[1]));
                        if (category.link && (category.link.startsWith('https://') || category.link.startsWith('http://'))) {
                            setUrl(category.link);
                        }
                    }
                }
            }
            
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, navigation]);
    
    return (
        <FusePageSimple
            classes={{
                root: classes.layoutRoot
            }}
            content={
                <IframeComponent url={url} />
            }
        />
    )
}

export default withStyles(styles, {withTheme: true})(IFrame);