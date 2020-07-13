import { h, Fragment } from "preact";
import styled from "styled-components";
const Wrapper = styled.div`
  display: grid;
  height: 100%;
`;
const Container = styled.div`
  justify-self: center;
  align-self: center;
  display: grid;
  padding: 1em;
  > * {
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
