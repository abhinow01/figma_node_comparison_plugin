figma.showUI(__html__);

function getAllProperties(node: BaseNode): string {
    let properties = "";
    if ('x' in node && 'y' in node) {
        properties += `X: ${node.x}px, Y: ${node.y}px\n`;
    }
    if ('width' in node && 'height' in node) {
        properties += `Width: ${node.width}px, Height: ${node.height}px\n`;
    }
    return properties.trim();
}
function compareAllProperties() {
    const selectedNodes = figma.currentPage.selection;

    if (selectedNodes.length === 2) {
        const node1 = selectedNodes[0];
        const node2 = selectedNodes[1];

        const properties1 = getAllProperties(node1);
        const properties2 = getAllProperties(node2);

        figma.ui.postMessage({ type: 'comparison_result', properties1, properties2 });
    } else {
        figma.ui.postMessage({ type: 'error', message: 'Please select exactly two nodes for comparison.' });
    }
}

function compareNodes(selectedOption: string) {
    const selectedNodes = figma.currentPage.selection;

    if (selectedNodes.length === 2) {
        const node1 = selectedNodes[0];
        const node2 = selectedNodes[1];

        let properties1, properties2;

        if (selectedOption === 'selected') {
            properties1 = getAllProperties(node1);
            properties2 = getAllProperties(node2);
        } else if (selectedOption === 'all') {
            properties1 = getAllProperties(node1);
            properties2 = getAllProperties(node2);
        }

        figma.ui.postMessage({ type: 'comparison_result', properties1, properties2 });
    } else {
        figma.ui.postMessage({ type: 'error', message: 'Please select exactly two nodes for comparison.' });
    }
}

figma.ui.onmessage = (message) => {
    if (message.type === 'compare_nodes') {
        compareNodes(message.selectedOption);
    }
};
