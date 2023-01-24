import { TSESLint } from "@typescript-eslint/experimental-utils";

export const order: TSESLint.RuleModule<"needFix", []> = {
  meta: { type: "problem", messages: { needFix: "need fix." }, schema: [] }, //fix code
  create: (context) => {
    return {
      CallExpression: (node) => {
        if (node.callee.type === "Identifier") {
          if (node.callee.name === "style") {
            const [styles] = node.arguments;
            if (styles.type === "ObjectExpression") {
              console.log(styles.properties);
              context.report({
                node,
                messageId: "needFix",
              });
            }
          }
        }
      },
    };
  },
  defaultOptions: [],
};
