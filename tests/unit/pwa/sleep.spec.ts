import sleep from "@pwa/utils/sleep";

describe("pwa sleep utility", () => {
  it("resolves after the provided delay", async () => {
    const start = Date.now();
    await sleep(10);
    const duration = Date.now() - start;
    expect(duration).toBeGreaterThanOrEqual(10);
  });
});
