// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.

figma.ui.onmessage = (msg: {
  type: string;
  count: number;
  opacityPersentence: number;
}) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === "create-shapes") {
    // This plugin creates rectangles on the screen.
    const numberOfRectangles = msg.count;

    const nodes: SceneNode[] = [];
    for (let i = 0; i < numberOfRectangles; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  } else if (msg.type === "opacityChange") {
    const zz = msg.opacityPersentence;
    for (const node of figma.currentPage.selection) {
      if ("opacity" in node) {
        node.opacity = zz / 100;
      }
    }
    console.log("Akash");
    // console.log(zz);
  } else if (msg.type === "get-Code") {
    // const zz = msg.opacityPersentence;
    for (const node of figma.currentPage.selection) {
      // Send a message to the UI
      figma.ui.postMessage({
        type: "code",
        message: [
          `
            opacity-${opacityfn(node)}
            ${fontsizefn(node)}
            ${fontsizefn(node)}
            ${fontsizefn(node)}
            ${fontsizefn(node)}
            ${fontsizefn(node)}
            ${fontsizefn(node)}
            `,
        ],
      });
    }
  } else {
    figma.closePlugin();
  }
};

const opacityfn = (node) => {
  if ("opacity" in node) {
    const op = node.opacity * 100;
    const opa = Number(op.toFixed(0));
    if (opa === 0) {
      return 0;
    } else if (opa === 5) {
      return 5;
    } else if (opa === 10) {
      return 10;
    } else if (opa === 20) {
      return 20;
    } else if (opa === 25) {
      return 25;
    } else if (opa === 30) {
      return 30;
    } else if (opa === 40) {
      return 40;
    } else if (opa === 50) {
      return 50;
    } else if (opa === 60) {
      return 60;
    } else if (opa === 70) {
      return 70;
    } else if (opa === 75) {
      return 75;
    } else if (opa === 80) {
      return 80;
    } else if (opa === 90) {
      return 90;
    } else if (opa === 100) {
      return 100;
    } else {
      return `[${opa}]`;
    }
  }
};

const fontsizefn = (node) => {
  if ("fontSize" in node) {
    if (node.fontSize === 12) return "text-xs";  
    if (node.fontSize === 14) return "text-sm";  
    if (node.fontSize === 16) return "text-base";
    if (node.fontSize === 18) return "text-lg";  
    if (node.fontSize === 20) return "text-xl";  
    if (node.fontSize === 24) return "text-2xl"; 
    if (node.fontSize === 30) return "text-3xl"; 
    if (node.fontSize === 36) return "text-4xl"; 
    if (node.fontSize === 48) return "text-5xl"; 
    if (node.fontSize === 60) return "text-6xl"; 
    if (node.fontSize === 72) return "text-7xl"; 
    if (node.fontSize === 96) return "text-8xl"; 
    if (node.fontSize === 128) return "text-9xl";
    return `text-[${node.fontSize}px]`;
  }else{
    return "";
  }
};
