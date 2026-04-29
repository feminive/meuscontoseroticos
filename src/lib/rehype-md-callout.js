function textFrom(node) {
  if (!node) return "";
  if (node.type === "text") return node.value ?? "";
  if (!Array.isArray(node.children)) return "";
  return node.children.map(textFrom).join("");
}

function visit(parent) {
  if (!parent || !Array.isArray(parent.children)) return;

  parent.children = parent.children.map((node) => {
    if (node?.type === "element" && node.tagName === "pre") {
      const code = node.children?.find(
        (child) => child?.type === "element" && child.tagName === "code"
      );
      const className = code?.properties?.className ?? [];
      const classes = Array.isArray(className) ? className : [className];

      if (classes.includes("language-md") || classes.includes("language-markdown")) {
        return {
          type: "element",
          tagName: "aside",
          properties: { className: ["md-callout"] },
          children: [
            {
              type: "element",
              tagName: "div",
              properties: { className: ["md-callout-body"] },
              children: [{ type: "text", value: textFrom(code).trim() }],
            },
          ],
        };
      }
    }

    visit(node);
    return node;
  });
}

export default function rehypeMarkdownCallouts() {
  return (tree) => visit(tree);
}
