import { h } from "preact";
import styled from "styled-components";
export default styled.div`
  border-radius: 0.5em;
  width: 100%;
  text-align: center;
  padding: 0.6em;
  margin: 0.2em;
  background-color: #377ee1;
  color: white;
  font-weight: bold;
  font-size: 1em;
  user-select: none;
  &:active {
    background-color: #1e65c8;
  }
`;
