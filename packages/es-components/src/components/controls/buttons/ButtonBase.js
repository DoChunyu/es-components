import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const noop = () => {
  // noop
};

// Using this because React does not like many of our upstream props.
// This allows that to flow without issue.
const UnstyledButton = styled.button`
  // noop
`;
const ButtonBase = React.forwardRef(function ButtonBaseInner(
  { waiting, onClick, ...props },
  ref
) {
  const innerClick = useCallback(
    (...args) => !waiting && (onClick || noop)(...args),
    [waiting, onClick]
  );
  const computedProps = {
    ...props,
    ...(waiting ? { 'data-waiting': waiting } : {})
  };
  return (
    <UnstyledButton
      type="button"
      onClick={innerClick}
      {...computedProps}
      ref={ref}
    />
  );
});

export const propTypes = {
  ...(UnstyledButton.propTypes || {}),
  /** Styles the Button with the "disabled" state and prevents click action */
  waiting: PropTypes.bool
};

export const defaultProps = {
  ...(UnstyledButton.defaultProps || {}),
  waiting: false
};

ButtonBase.propTypes = propTypes;
ButtonBase.defaultProps = defaultProps;

export default ButtonBase;
