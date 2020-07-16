import { h, Fragment } from "preact";
import styled from "styled-components";
const Wrapper = styled.div`
  display: grid;
  display: -ms-grid;

  height: 100%;
`;
const Container = styled.div`
  -ms-grid-column-align: center;
  justify-self: center;
  -ms-grid-row-align: center;
  align-self: center;
  display: -ms-grid;
  display: grid;
  padding: 1em;
  > * {
    -ms-grid-column-align: center;
    justify-self: center;
  }
`;

export default ({ children }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};
