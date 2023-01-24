import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FuseAnimate from '@fuse/components/FuseAnimate';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({

}));

const Actions = (props) => {
	const { t } = useTranslation();
	// Check submittable
	const { reduxStore, handleSubmit } = props;
	const canSubmit = useSelector(state => state[reduxStore] && state[reduxStore].form.canSubmit);
	const isSaved = useSelector(state => state[reduxStore] && state[reduxStore].form.isSaved);
	const loading = useSelector(state => state[reduxStore] && state[reduxStore].form.loading);
	
	return (
    <div>
      <Button
        className="whitespace-no-wrap normal-case ml-10"
        variant="contained"
        color="secondary"
        disabled={!canSubmit || isSaved || loading}
        onClick={() => handleSubmit(true)}
        style={{ width: "180px" }}
      >
        {loading ? (
          <CircularProgress
            style={{
              width: "25px",
              height: "25px",
            }}
          />
        ) : (
          <>
            <span>{t("send")}</span>
          </>
        )}
      </Button>
    </div>
  );
}

const Title = ( { reduxStore, defaultTitle }) => {
	const { t } = useTranslation();
	const name = useSelector(state => {
		return state[reduxStore] && state[reduxStore].form.data && state[reduxStore] && state[reduxStore].form.data.name;
	});
	
	return (
		<Typography className="text-16 sm:text-20 truncate">
			{ name || defaultTitle || t('new_item') }
		</Typography>
	);
}

function HeaderListWithSubmit(props) {
	const theme = useTheme();
	const { t } = useTranslation();
	
	const {
		url,
		strings,
		submitAction,
		reduxStore,
		handlers,
	} = props;

	const handleSubmit = (exit) => {
		if (typeof submitAction === 'function') {
			submitAction(exit);
		}
	}

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full">
				<div className="flex items-center max-w-full">
					<div className="flex flex-col min-w-0 mx-12 sm:mc-16">
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Title reduxStore={reduxStore} defaultTitle={strings.defaultTitle} />
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="caption">{(strings && strings.caption) || t('edit_create_form_caption')}</Typography>
						</FuseAnimate>
					</div>
				</div>
			</div>
			<FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Actions reduxStore={reduxStore} handleSubmit={handleSubmit} />
			</FuseAnimate>
		</div>
	);
}

HeaderListWithSubmit.propTypes = {
	strings: PropTypes.object.isRequired,
	submitAction: PropTypes.func.isRequired,
	reduxStore: PropTypes.string.isRequired,
	handlers: PropTypes.object,
};

export default HeaderListWithSubmit;
