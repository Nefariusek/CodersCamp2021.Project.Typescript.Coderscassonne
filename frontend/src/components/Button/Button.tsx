import { ReactElement } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: () => void;
  colorVariant?: 'dark' | 'light';
  disabled?: boolean;
}

const Button = ({
  type = 'button',
  text,
  onClick,
  colorVariant = 'dark',
  disabled = false,
}: ButtonProps): ReactElement => {
  const commonClassName =
    'border border-DARKTHEME_LIGHT_GREEN_COLOR font-ALMENDRA font-bold text-2xl sm:w-60 sm:py-2 sm:px-4 sm:my-2 w-40 py-1 px-2 my-1 select-none';
  const darkVariant = `bg-DARKTHEME_BACKGROUND_COLOR hover:bg-DARKTHEME_DARK_GREEN_COLOR text-DARKTHEME_LIGHT_GREEN_COLOR ${commonClassName}`;
  const lightVariant = `bg-DARKTHEME_LIGHT_GREEN_COLOR hover:bg-opacity-90 text-DARKTHEME_BACKGROUND_COLOR ${commonClassName}`;

  return (
    <button
      type={type}
      className={colorVariant === 'light' ? lightVariant : darkVariant}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
