import { test } from "vitest";
import { TSESLint } from "@typescript-eslint/experimental-utils";
import { order } from "../rules/oreder";

const tester = new TSESLint.RuleTester();

test("eslint", () => {
  tester.run("order", order, {
    valid: [
      { code: `style({ top: 0, flex: 1 })` },
      { code: `style({ flex: 0, top: 1 })` },

      // {
      //   code: `style({ height: "1rem" });`,
      // },
    ],
    invalid: [
      // { code: `style({ flex: 0, top: 1 })`, errors: [{ messageId: "needFix" }] }
    ],
  });
});
