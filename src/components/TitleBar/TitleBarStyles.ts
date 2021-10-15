import styled, { css } from 'styled-components/macro';

const TitleBarButton = css`
  width: 4rem;
  height: 100%;
  border: none;
  background-color: transparent;
  position: relative;
  -webkit-app-region: no-drag;
  &:hover {
    background-color: #e6e6e6;
  }
  cursor: pointer;
`;

export const StyledTitleBar = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-content: center;
  -webkit-app-region: drag;
  cursor: pointer;
`;

export const StyledWrapper = styled.div`
  width: max-content;
  height: 100%;
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  column-gap: 0.8rem;
  padding-left: 1rem;
`;

export const StyledLogo = styled.img`
  width: 1rem;
  height: 1rem;
  -webkit-app-region: drag;
`;

export const StyledAppName = styled.div`
  font-size: 0.9rem;
  color: #000;
  display: flex;
  align-items: flex-start;
  span {
    font-size: 0.6rem;
    font-weight: 500;
    text-transform: lowercase;
    margin-left: 0.3rem;
  }
`;

export const StyledWindowActions = styled.div`
  width: max-content;
  height: 100%;
`;

export const StyledMinimizeButton = styled.button`
  ${TitleBarButton};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 2px;
    border-radius: 10px;
    background-color: #000;
    transform: translate(-50%, -50%);
  }
`;

export const StyledCloseButton = styled.button`
  ${TitleBarButton};

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -7px;
    margin-top: -1px;
    width: 14px;
    height: 2px;
    border-radius: 10px;
    background-color: #000;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;
