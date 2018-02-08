import autobind from "autobind-decorator";
import * as classNames from "classnames";
import * as React from "react";
import "./Button.scss";

export interface IButtonProps extends React.Props<{}> {
  className?: string;
  onClick?: () => void;
}

@autobind
class Button extends React.Component<IButtonProps, {}> {
  public render() {
    const { className } = this.props;
    const buttonClass = classNames("button", className);

    return (
      <button className={buttonClass} onClick={this.onClick}>
        {this.props.children}
      </button>
    );
  }

  private onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
}

export default Button;