import autobind from "autobind-decorator";
import classNames from "classnames";
import * as React from "react";
import "./Button.scss";
import ButtonBase from "@material-ui/core/ButtonBase";

export interface ButtonProps {
  className?: string;
  onClick?: () => void;
  circle?: boolean;
  link?: string;
  id?: string;
}

@autobind
class Button extends React.Component<ButtonProps> {
  public render() {
    const { className, circle, link, id } = this.props;
    const buttonClass = classNames(
      "button",
      {
        "button--circle": circle,
      },
      className
    );

    if (link) {
      return (
        <ButtonBase
          data-testid={id}
          data-atom-button
          component="a"
          href={link}
          className={buttonClass}
          onClick={this.onClick}
        >
          {this.props.children}
        </ButtonBase>
      );
    }

    return (
      <ButtonBase
        data-testid={id}
        data-atom-button
        component="a"
        role="button"
        className={buttonClass}
        onClick={this.onClick}
      >
        {this.props.children}
      </ButtonBase>
    );
  }

  private onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
}

export default Button;
