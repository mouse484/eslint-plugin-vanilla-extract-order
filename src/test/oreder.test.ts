import { test } from "vitest";
import { TSESLint } from "@typescript-eslint/experimental-utils";
import { order } from "../rules/oreder";

const tester = new TSESLint.RuleTester();

test("eslint", () => {
  tester.run("order", order, {
    valid: [
      { code: "" },
      // {
      //   code: `style({ height: "1rem" });`,
      // },
    ],
    invalid: [{ code: `style({ height: "1rem" })`, errors: [{ messageId: "needFix" }] }],
  });
});
