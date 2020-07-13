import { useState, useContext } from "preact/hooks";
import { h, Fragment } from "preact";
import { Context } from "./Channel";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import Btn from "./Btn";

const DataToBeSent = styled.div`
  padding: 1em;
  font-size: 0.9em;
`;
const AlertBox = styled.div`
  padding: 0.8em;
  font-size: 0.9em;
  background-color: #ffee77;
  border-radius: 6px;
`;
const Title = styled.div`
  font-size: 1.3em;
`;
const BtnBox = styled.div`
  display: block;
  margin: 0.4em 0 0.4em;
  width: 100%;
  max-width: 400px;
`;
const CancelBtn = styled(Btn)`
  background-color: rgba(0, 0, 0, 0);
  color: #de1515;
  &:active {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;
export default () => {
  return (
    <PageContainer>
      <Title>
        <b>マイナイミテイター</b>
        <wbr />
        が操作を求めています。
      </Title>
      <DataToBeSent>
        以下の情報が送信されます。
        <ul>
          <li>電子証明書</li>
          <li>電子署名</li>
        </ul>
        以下の情報は送信されません
        <ul>
          <li>住所、氏名、性別、生年月日</li>
          <li>顔写真</li>
          <li>個人番号</li>
        </ul>
      </DataToBeSent>
      <AlertBox>
        送信先ウェブサイトのアドレスは正しいですか？確認してみましょう。
      </AlertBox>
      <BtnBox>
        <Btn>許可</Btn>
        <CancelBtn>キャンセル</CancelBtn>
      </BtnBox>
    </PageContainer>
  );
};
