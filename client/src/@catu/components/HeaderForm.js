import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import FuseAnimate from "@fuse/components/FuseAnimate";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import IconEditor from "@catu/components/IconEditor";

const Actions = (props) => {
  const { t } = useTranslation();
  // Check submittable
  const { reduxStore, handleSubmit, toggleEditable, options } = props;
  const canSubmit = useSelector(
    (state) => state[reduxStore] && state[reduxStore].form.canSubmit
  );
  const isSaved = useSelector(
    (state) => state[reduxStore] && state[reduxStore].form.isSaved
  );
  const loading = useSelector(
    (state) => state[reduxStore] && state[reduxStore].form.loading
  );
  const isNew = useSelector(
    (state) => state[reduxStore] && state[reduxStore].form.isNew
  );
  const isEditable = useSelector(
    (state) => state[reduxStore] && state[reduxStore].form.isEditable
  );
  const showActions = useSelector((state) => {
    if (state[reduxStore] && state[reduxStore].form) {
      const form = state[reduxStore].form;
      if (form.notEditable !== undefined) return form.notEditable;
      if (form.showActions !== undefined) return form.showActions;
    }
    return false;
  });

  return (
    <div>
      {((options && (options.buttons === undefined || options.buttons)) ||
        !options) &&
        (!isEditable && !isNew ? (
          <Button
            className="whitespace-no-wrap normal-case ml-10 hidden md:inline-flex"
            variant="outlined"
            color="default"
            disabled={loading || showActions}
            onClick={() => {
              if (typeof toggleEditable === "function") {
                toggleEditable();
              } else {
                console.warning("Not yet implemented", typeof toggleEditable);
              }
            }}
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
              t("edit")
            )}
          </Button>
        ) : (
          <>
            {reduxStore !== "inputModuleApp" && (
              <Button
                className="whitespace-no-wrap normal-case ml-10 hidden md:inline-flex"
                variant="outlined"
                color="default"
                disabled={!canSubmit || isSaved || loading || showActions}
                onClick={() => handleSubmit(false)}
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
                  t("save_stay")
                )}
              </Button>
            )}

            <Button
              className="whitespace-no-wrap normal-case ml-10"
              variant="contained"
              color="secondary"
              disabled={!canSubmit || isSaved || loading || showActions}
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
                  <span className="md:hidden">{t("save")}</span>
                  <span className="hidden md:inline-flex">
                    {t("save_exit")}
                  </span>
                </>
              )}
            </Button>
          </>
        ))}
    </div>
  );
};

const Title = ({ reduxStore, defaultTitle }) => {
  const { t } = useTranslation();
  const name = useSelector((state) => {
    return (
      state[reduxStore] &&
      state[reduxStore].form.data &&
      state[reduxStore] &&
      state[reduxStore].form.data.name
    );
  });

  return (
    <Typography className="text-16 sm:text-20 truncate">
      {name || defaultTitle || t("new_item")}
    </Typography>
  );
};

const IconEdit = ({
  reduxStore,
  upload,
  removeImage,
  attribute,
  uploadServices,
}) => {
  const { data, isNew, loading } = useSelector(
    (state) => state[reduxStore] && state[reduxStore].form
  );

  return (
    <IconEditor
      disabled={isNew || loading}
      image={data && data[attribute || "icon"]}
      handleUpload={upload}
      handleRemove={removeImage}
      services={uploadServices}
    />
  );
};

function ListHeader(props) {
  const theme = useTheme();
  const { t } = useTranslation();

  const {
    url,
    strings,
    submitAction,
    reduxStore,
    handlers,
    attributes,
    toggleEditable,
    options,
  } = props;

  const handleSubmit = (exit) => {
    if (typeof submitAction === "function") {
      submitAction(exit);
    }
  };

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex flex-col items-start max-w-full">
        {strings && strings.list_name && (
          <FuseAnimate animation="transition.slideRightIn" delay={300}>
            <Typography
              className="normal-case flex items-center sm:mb-12"
              component={Link}
              role="button"
              to={url || "/"}
              color="inherit"
            >
              <Icon className="text-20">
                {theme.direction === "ltr" ? "arrow_back" : "arrow_forward"}
              </Icon>
              <span className="mx-4">
                {(strings && strings.list_name) || t("back")}
              </span>
            </Typography>
          </FuseAnimate>
        )}

        <div className="flex items-center max-w-full">
          {options && options.icons && (
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <IconEdit
                reduxStore={reduxStore}
                {...handlers}
                attribute={(attributes || {}).icon}
              />
            </FuseAnimate>
          )}
          <div className="flex flex-col min-w-0 mx-12 sm:mc-16">
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Title
                reduxStore={reduxStore}
                defaultTitle={strings.defaultTitle}
              />
            </FuseAnimate>
            {!strings.no_caption && (
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography variant="caption">
                  {(strings && strings.caption) ||
                    t("edit_create_form_caption")}
                </Typography>
              </FuseAnimate>
            )}
          </div>
        </div>
      </div>
      <FuseAnimate animation="transition.slideRightIn" delay={300}>
        <Actions
          reduxStore={reduxStore}
          handleSubmit={handleSubmit}
          toggleEditable={
            handlers && handlers.toggleEditable
              ? handlers.toggleEditable
              : toggleEditable
          }
          options={options}
        />
      </FuseAnimate>
    </div>
  );
}

ListHeader.propTypes = {
  strings: PropTypes.object.isRequired,
  submitAction: PropTypes.func,
  reduxStore: PropTypes.string,
  handlers: PropTypes.object,
};

export default ListHeader;
