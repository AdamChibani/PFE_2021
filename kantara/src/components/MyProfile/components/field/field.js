import CreateIcon from "@material-ui/icons/Create";
import { useState } from "react";
import styles from "../../my_profile.module.css";
import WidgetHandler from "./WidgetHandler";

function Field(props) {
  const [editable, setEditable] = useState(false);

  return (
    <div>
      <h4 className="font-size-6 mb-5 mt-5 text-black-2 font-weight-semibold d-flex justify-content-between align-items-center">
        Skills
        <CreateIcon
          className={styles["edit"]}
          onClick={() => {
            setEditable(!editable);
          }}
        />
      </h4>
      Technical
      <WidgetHandler {...{ editable, setEditable }} pId={props?.pId} />
    </div>
  );
}

export default Field;
