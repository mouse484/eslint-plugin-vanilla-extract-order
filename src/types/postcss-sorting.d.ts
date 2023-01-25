declare module "postcss-sorting/lib/getContainingNode" {
  import { Node } from "postcss";

  export default function getContainingNode(node: Node): Node;
}

declare module "postcss-sorting/lib/order/sortNode" {
  import { Node } from "postcss";

  export default function sortNode(node: Node, options: {});
}

declare module "postcss-sorting/lib/properties-order/sortNodeProperties" {
  import { Node } from "postcss";

  export default function sortNodeProperties(node: Node, options: {});
}
