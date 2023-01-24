import React from 'react';
import { useTranslation } from 'react-i18next';
import { FusePageSimple } from "@fuse";
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducer';
import AssistancePage from "../components/AssistancePage";

function List() {
	const { t } = useTranslation();

	return (
    <FusePageSimple
      classes={{
        toolbar: "p-0",
        header: "min-h-72 h-72 sm:h-136 sm:min-h-136",
        contentCard: "rounded-8",
        contentWrapper: "mb12",
      }}
      /*header={
        <HeaderList
          icon="phone"
          title={t("phoneAssistance:title")}
          //Input={SearchInput}
        />
      }*/
      content={<AssistancePage />}
      innerScroll
    />
  );
}

export default withReducer('cPackageApp', reducer)(List);