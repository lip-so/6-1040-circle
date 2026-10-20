import { expect, test } from "bun:test";
import { useRemovalConfirmation } from "../../frontend/src/removal-confirmation.ts";

test("the basket requests confirmation; cancel does nothing and confirm removes exactly the selected encounter once", () => {
  const removed: string[] = [];
  const confirmation = useRemovalConfirmation(memory => { removed.push(memory); });
  confirmation.request("one", "Alex");
  expect(confirmation.target.value).toEqual({ memory: "one", label: "Alex" });
  expect(removed).toEqual([]);
  confirmation.cancel();
  confirmation.confirm();
  expect(removed).toEqual([]);
  confirmation.request("two", "Alex");
  confirmation.confirm();
  confirmation.confirm();
  expect(removed).toEqual(["two"]);
  expect(confirmation.target.value).toBeNull();
  confirmation.request("previous-account", "Mira");
  confirmation.cancel();
  confirmation.confirm();
  expect(removed).toEqual(["two"]);
});
