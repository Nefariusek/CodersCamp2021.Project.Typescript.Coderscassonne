import { ReactElement } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  onClick?: () => void;
  colorVariant?: 'dark' | 'light';
  disabled?: boolean;
}

const Button = (props: ButtonProps): ReactElement => {
  const commonClassName =
    'border border-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA font-bold text-3xl w-60 py-2 px-4 my-3 select-none';
  const darkVariant = `bg-DARKTHEME_BACKGROUND_COLOR hover:bg-DARKTHEME_DARK_GREEN_COLOR text-DARKTHEME_LIGHT_GREEN_COLOR ${commonClassName}`;
  const lightVariant = `bg-DARKTHEME_LIGHT_GREEN_COLOR hover:bg-opacity-90 text-DARKTHEME_BACKGROUND_COLOR ${commonClassName}`;

  return (
    <button
      type={props.type ? props.type : 'button'}
      className={props.colorVariant === 'light' ? lightVariant : darkVariant}
      onClick={props.onClick}
      disabled={props.disabled === true ? true : false}
    >
      {props.text}
    </button>
  );
};

export default Button;
