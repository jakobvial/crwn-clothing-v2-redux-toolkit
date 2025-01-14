import styled from 'styled-components';

import {SpinnerContainer} from "../spinner/spinner.styles";

export const BaseButton = styled.button`
  align-items: center;
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed', serif;
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  // if the disabled prop is false then apply the styles
  // otherwise, do not apply the styles
  &:not(:disabled):hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }

  //&:hover {
  //  background-color: white;
  //  color: black;
  //  border: 1px solid black;
  //}
`;

export const GoogleSignInButton = styled(BaseButton)`
  background-color: #4285f4;
  color: white;

  &:not(:disabled):hover {
    background-color: #357ae8;
    border: none;
  }
`;

export const InvertedButton = styled(BaseButton)`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:not(:disabled):hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

export const ButtonSpinner = styled(SpinnerContainer)`
  width: 30px;
  height: 30px;
`;