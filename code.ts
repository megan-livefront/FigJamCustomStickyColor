figma.showUI(__html__);
figma.ui.resize(400, 250);

type Fills = typeof figma.mixed | readonly Paint[];

/** Changes the color of all `STICKY` nodes within the selection to the given `color`. */
figma.ui.onmessage = (msg: { type: string; color: string }) => {
  if (msg.type === "change-color") {
    const selectedNodes = figma.currentPage.selection;
    selectedNodes.forEach((node) => {
      if (node.type === "STICKY") {
        const fills = cloneFills(node.fills);
        if (Array.isArray(fills)) {
          const color = msg.color;
          const backgroundColor = color.includes("#") ? color : `#${color}`;
          fills[0] = figma.util.solidPaint(backgroundColor, fills[0]);
          node.fills = fills;
        }
      }
    });

    figma.closePlugin();
  }
};

function cloneFills(fills: Fills): Fills {
  return JSON.parse(JSON.stringify(fills));
}
