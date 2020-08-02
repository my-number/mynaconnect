import RequestPermission from "../src/components/RequestPermission/Base.vue";
import TooltipItem from "../src/components/TooltipItem.vue";
export default { title: "RequestPermission" };
export const Empty = () => ({
  components: { RequestPermission },
  template: `<request-permission />`,
});
export const GetAuthCert = () => ({
  components: { RequestPermission, TooltipItem },
  template: `
<request-permission app-name="マイナイミテータ">
以下の内容が送信されます
<ul>
<li><tooltip-item text-id="cert">電子証明書(利用者証明用)</tooltip-item></li>
<li><tooltip-item text-id="pubkey">公開鍵</tooltip-item></li>
</ul>
以下の内容は送信されません
<ul>
<li>氏名、住所、性別、生年月日</li>
<li><tooltip-item text-id="mynumber">個人番号</tooltip-item></li>
</ul>
</request-permission>
`,
});
export const GetSignCert = () => ({
  components: { RequestPermission, TooltipItem },
  template: `
<request-permission app-name="マイナイミテータ">
以下の内容が送信されます
<ul>
<li><tooltip-item text-id="cert">電子証明書(電子署名用)</tooltip-item></li>
<li><tooltip-item text-id="pubkey">公開鍵</tooltip-item></li>
<li>氏名、住所、性別、生年月日</li>
</ul>
以下の内容は送信されません
<ul>
<li><tooltip-item text-id="mynumber">個人番号</tooltip-item></li>
</ul>
</request-permission>
`,
});
export const SignWithAuth = () => ({
  components: { RequestPermission, TooltipItem },
  template: `
<request-permission app-name="マイナイミテータ">
以下の内容が送信されます
<ul>
<li><tooltip-item>電子証明書(利用者証明用)</tooltip-item></li>
<li><tooltip-item>公開鍵</tooltip-item></li>
<li><tooltip-item>電子署名</tooltip-item></li>
</ul>
以下の内容は送信されません
<ul>
<li><tooltip-item text-id="mynumber">個人番号</tooltip-item></li>
<li>氏名、住所、性別、生年月日</li>
</ul>
</request-permission>
`,
});
export const SignWithSign = () => ({
  components: { RequestPermission, TooltipItem },
  template: `
<request-permission app-name="マイナイミテータ">
以下の内容が送信されます
<ul>
<li><tooltip-item>電子証明書(電子署名用)</tooltip-item></li>
<li><tooltip-item>公開鍵</tooltip-item></li>
<li><tooltip-item>電子署名</tooltip-item></li>
<li>氏名、住所、性別、生年月日</li>
</ul>
以下の内容は送信されません
<ul>
<li><tooltip-item text-id="mynumber">個人番号</tooltip-item></li>

</ul>
</request-permission>
`,
});
export const ReadCardSurface = () => ({
  components: { RequestPermission, TooltipItem },
  template: `
<request-permission app-name="マイナイミテータ">
以下の内容が送信されます
<ul>
<li>氏名、住所、性別、生年月日</li>
<li>顔写真</li>
</ul>
以下の内容は送信されません
<ul>
<li><tooltip-item text-id="mynumber">個人番号</tooltip-item></li>
<li><tooltip-item>電子証明書(電子署名用)</tooltip-item></li>
</ul>
</request-permission>
`,
});
export const ReadMynumber = () => ({
  components: { RequestPermission, TooltipItem },
  template: `
<request-permission app-name="マイナイミテータ">
以下の内容が送信されます
<ul>
<li>氏名、住所、性別、生年月日</li>
<li><tooltip-item text-id="mynumber">個人番号</tooltip-item></li>
</ul>
</request-permission>
`,
});
