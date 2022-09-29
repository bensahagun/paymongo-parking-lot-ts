import Slot from "../Slot";

describe("Slot", () => {
  it("should be initialized", () => {
    const slot = new Slot(1, [1, 1, 1], 0);
    expect(slot).toBeInstanceOf(Slot);
  });
  it("should return correct distance", () => {
    const slot = new Slot(1, [1, 2, 3], 0);
    expect(slot.getDistance(0)).toBe(1);
  });
});
