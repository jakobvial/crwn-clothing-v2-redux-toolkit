import {BaseButton, ButtonSpinner, GoogleSignInButton, InvertedButton} from "./button.styles";
import {FC, ButtonHTMLAttributes} from "react";

export enum BUTTON_TYPE_CLASSES {
    base = "base",
    google = "google-sign-in",
    inverted = "inverted"
}

// Description: This function returns a component based on the buttonType prop.
// Note the use of square brackets to access the object property.
// Alternatively, access to the object property can be done with dot notation
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton=>
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
    }[buttonType]);

// Extending the ButtonHTMLAttributes interface
export type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES,
    isLoading?: boolean,
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({children, buttonType, isLoading, ...otherProps}) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <ButtonSpinner/> : children}
        </CustomButton>
    );
};

export default Button;
