import { Fonts } from "@mobile/constants/theme";

describe("mobile theme", () => {
  it("selects web-safe fonts by default", () => {
    expect(Fonts.sans).toContain("system-ui");
    expect(Fonts.mono).toContain("SFMono");
  });
});
