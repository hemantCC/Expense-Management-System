import { Divider, TextField } from "@material-ui/core";
import React, { Component } from "react";
import CategoryList from "../expense-manager/child-components/category-list.component";
import HeaderComponent from "../shared/header.component";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  updateMaxAmount,
  disableCategory,
} from "../../redux/actions/expense.action";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 84,
    height: 52,
    padding: 0,
    margin: theme.spacing(5),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(35px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 48,
    height: 48,
  },
  track: {
    borderRadius: 52 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

class SettingComponent extends Component {
  constructor(props) {
    super(props);
    const amt = this.props.selectedCategory?.amount;
    const disabled = this.props.selectedCategory?.isDisabled;
    this.state = {
      editMode: false,
      amount: amt,
      isDisabled: disabled,
    };
  }

  componentDidUpdate = () => {
    console.log(this.selectedCategoryIndex);
    // if (this.state.amount !== this.props.selectedCategory.amount) {
    //   this.setState({
    //     amount: this.props.selectedCategory.amount,
    //   });
    // }
  };

  handleEdit = (e) => {
    const value = e.target.value;
    this.setState({
      amount: value,
    });
    console.log(this.state.amount);
  };

  handleSubmit = () => {
    this.props.setMaxAmount(this.state.amount);
    this.toggleEdit();
  };

  toggleEdit = () => {
    const currentMode = this.state.editMode;
    this.setState({
      editMode: !currentMode,
    });
  };

  handleChange = (e) => {
    const currentState = this.state.isDisabled;
    this.props.disableCategory(!currentState);
    this.setState({
      isDisabled: !currentState,
    });
  };

  render() {
    return (
      <div>
        <HeaderComponent />
        <div className="row mx-0">
          <div className="col-md-5 px-2 pl-2 mt-4">
            <div className="cat-section">
              <CategoryList />
            </div>
          </div>
          <div className="col-md-7 px-2 pl-0 pr-2 mt-4">
            <div className="cat-section">
              <div className="text-center display-3">Settings</div>
              <Divider className="mt-4" />
              {this.props.selectedCategoryIndex === -1 && (
                <div className="display-4 mt-4">Please Select a Category</div>
              )}
              {this.props.selectedCategoryIndex !== -1 && (
                <>
                  <div className="text-center display-4 mt-5">
                    Max-Amount :
                    {!this.state.editMode &&
                      this.props.selectedCategory?.amount}
                    {!this.state.editMode && (
                      <button
                        className="btn btn-outline-primary ml-3"
                        onClick={this.toggleEdit}
                      >
                        <i
                          className="fa fa-pencil "
                          style={{ fontSize: 15 }}
                        ></i>{" "}
                        Edit
                      </button>
                    )}
                    {this.state.editMode && (
                      <div>
                        <TextField
                          label="Amount"
                          className="mt-3 ml-3"
                          defaultValue={this.state.amount}
                          onChange={this.handleEdit}
                        />
                        <button
                          className="btn btn-outline-success"
                          onClick={this.handleSubmit}
                        >
                          <i className="fa fa-floppy-o"></i> Save
                        </button>
                        <button
                          className="btn btn-outline-danger ml-2"
                          onClick={this.toggleEdit}
                        >
                          X Cancel
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="text-center display-4 mt-4">
                    Enable/Disable :
                    <FormControlLabel
                      control={
                        <IOSSwitch
                          name="checkedB"
                          checked={!this.props.selectedCategory?.isDisabled}
                          onChange={this.handleChange}
                        />
                      }
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.categories[state.selectedCategoryIndex],
    categories: state.categories,
    selectedCategoryIndex: state.selectedCategoryIndex,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMaxAmount: (amount) => dispatch(updateMaxAmount(amount)),
    disableCategory: (data) => dispatch(disableCategory(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingComponent);
