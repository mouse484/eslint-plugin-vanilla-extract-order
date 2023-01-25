// https://github.com/myuon/eslint-plugin-css-reorder/blob/main/src/rules/property-reorder.ts

import { TSESLint } from "@typescript-eslint/experimental-utils";
import getContainingNode from "postcss-sorting/lib/getContainingNode";
import sortNode from "postcss-sorting/lib/order/sortNode";
import sortNodeProperties from "postcss-sorting/lib/properties-order/sortNodeProperties";
import { parse } from "postcss";
import groups from "stylelint-config-recess-order/groups";
import { Node } from "postcss";

export const order: TSESLint.RuleModule<"needFix", []> = {
  meta: { type: "problem", messages: { needFix: "need fix." }, schema: [] }, //fix code
  create: (context) => {
    return {
      CallExpression: (node) => {
        if (node.callee.type !== "Identifier") return;
        if (node.callee.name !== "style") return;
        const [styles] = node.arguments;
        if (styles.type !== "ObjectExpression") return;
        const postcss = styles.properties
          .map((value) => {
            if (value.type !== "Property") return;
            if (value.key.type !== "Identifier") return;
            if (value.value.type !== "Literal") return;
            return `${value.key.name}: ${value.value.value};`;
          })
          .join("");

        const root = parse("&{" + postcss + "}");

        const rootChanged = root.clone();

        // ↑ok

        const reorder = (input: Node) => {
          const wnode = getContainingNode(input);
          sortNode(wnode, [
            "custom-properties",
            "dollar-variables",
            "at-variables",
            "declarations",
            "rules",
            "at-rules",
          ]);
          sortNodeProperties(wnode, {
            order: groups,
            unspecifiedPropertiesPosition: "bottom",
          });
        };

        rootChanged.walk(reorder);

        console.log({ root: root.toString(), rootChanged: rootChanged.toString() });
        if (root.toString() !== rootChanged.toString()) {
          context.report({
            node,
            messageId: "needFix",
          });
        }
      },
    };
  },
  defaultOptions: [],
};
