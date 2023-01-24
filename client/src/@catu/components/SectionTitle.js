import React from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";

function SectionTitle({ title, classes, number }) {
  const { t } = useTranslation();
  return (
    <>
      <Typography variant="h5" component="h2" className={classes}>
        {t(`${title}`)} {number > 0 ? `#${number + 1}` : ""}
      </Typography>
      <Typography
        variant="subtitle1"
        className="text-gray-500 leading-8 mt-8"
        component="div"
        gutterBottom
      >
        {t(`${title}_subtitle`)
          .split("\n")
          .map((string, key) => (
            <p key={key} className="mb-4">
              {string}
            </p>
          ))}
      </Typography>
    </>
  );
}

export default SectionTitle;
