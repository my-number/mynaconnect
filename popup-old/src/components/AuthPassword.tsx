import { useState, useContext } from "preact/hooks";
import { h } from "preact";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import Btn from "./Btn";
import Keypad from "./Keypad";
const Title = styled.div`
  font-size: 1.3em;
`;
export default () => {
  return (
    <PageContainer>
      <Title>パスワードを入力してください</Title>
      <Keypad />
    </PageContainer>
  );
};
