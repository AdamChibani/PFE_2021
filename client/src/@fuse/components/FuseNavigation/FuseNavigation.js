import React from "react";
import { Divider, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import clsx from "clsx";
import FuseNavVerticalGroup from "./vertical/FuseNavVerticalGroup";
import FuseNavVerticalCollapse from "./vertical/FuseNavVerticalCollapse";
import FuseNavVerticalItem from "./vertical/FuseNavVerticalItem";
import FuseNavVerticalLink from "./vertical/FuseNavVerticalLink";
import FuseNavHorizontalGroup from "./horizontal/FuseNavHorizontalGroup";
import FuseNavHorizontalCollapse from "./horizontal/FuseNavHorizontalCollapse";
import FuseNavHorizontalItem from "./horizontal/FuseNavHorizontalItem";
import FuseNavHorizontalLink from "./horizontal/FuseNavHorizontalLink";

const useStyles = makeStyles((theme) => ({
  navigation: {},
  verticalNavigation: {
    "&.active-square-list": {
      "& .list-item, & .active.list-item": {
        width: "100%",
        borderRadius: "0",
      },
    },
    "&.dense": {
      "& .list-item": {
        paddingTop: 0,
        paddingBottom: 0,
        height: 32,
      },
    },
  },
  horizontalNavigation: {
    "&.active-square-list": {
      "& .list-item": {
        borderRadius: "0",
      },
    },
    "& .list-item": {
      padding: "8px 12px 8px 12px",
      height: 40,
      minHeight: 40,
      "&.level-0": {
        height: 44,
        minHeight: 44,
      },
      "& .list-item-text": {
        padding: "0 0 0 8px",
      },
    },
  },
  "@global": {
    ".popper-navigation-list": {
      "& .list-item": {
        padding: "8px 12px 8px 12px",
        height: 40,
        minHeight: 40,
        "& .list-item-text": {
          padding: "0 0 0 8px",
        },
      },
      "&.dense": {
        "& .list-item": {
          minHeight: 32,
          height: 32,
          "& .list-item-text": {
            padding: "0 0 0 8px",
          },
        },
      },
    },
  },
}));

const components = {};

function registerComponent(name, Component) {
  components[name] = Component;
}

function FuseNavItem(props) {
  const C = components[props.type];
  return C ? <C {...props} /> : null;
}

/*
Register Fuse Navigation Components
 */
registerComponent('vertical-group', FuseNavVerticalGroup);
registerComponent('vertical-collapse', FuseNavVerticalCollapse);
registerComponent('vertical-item', FuseNavVerticalItem);
registerComponent('vertical-link', FuseNavVerticalLink);
registerComponent('horizontal-group', FuseNavHorizontalGroup);
registerComponent('horizontal-collapse', FuseNavHorizontalCollapse);
registerComponent('horizontal-item', FuseNavHorizontalItem);
registerComponent('horizontal-link', FuseNavHorizontalLink);
registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);

function FuseNavigation(props) {
	const classes = useStyles(props);
	const { navigation, layout, active, dense, className } = props;

	const verticalNav = (
		<List
			className={clsx(
				'navigation whitespace-no-wrap',
				classes.navigation,
				classes.verticalNavigation,
				`active-${active}-list`,
				dense && 'dense',
				className
			)}
		>
			{navigation.map(_item => (
				<FuseNavItem key={_item.id} type={`vertical-${_item.type}`} item={_item} nestedLevel={0} />
			))}
		</List>
	);

	const horizontalNav = (
		<List
			className={clsx(
				'navigation whitespace-no-wrap flex p-0',
				classes.navigation,
				classes.horizontalNavigation,
				`active-${active}-list`,
				dense && 'dense',
				className
			)}
		>
			{navigation.map(_item => (
				<FuseNavItem
					key={_item.id}
					type={`horizontal-${_item.type}`}
					item={_item}
					nestedLevel={0}
					dense={dense}
				/>
			))}
		</List>
	);

	if (navigation.length > 0) {
		switch (layout) {
			case 'horizontal': {
				return horizontalNav;
			}
			case 'vertical':
			default: {
				return verticalNav;
			}
		}
	} else {
		return null;
	}
}

FuseNavigation.propTypes = {
	navigation: PropTypes.array.isRequired
};

FuseNavigation.defaultProps = {
	layout: 'vertical'
};

export default React.memo(FuseNavigation);
