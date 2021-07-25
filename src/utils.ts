import * as vscode from 'vscode';
import * as azdata from 'azdata';

export async function GetCurrentTreeNode(oContext: azdata.ObjectExplorerContext): Promise<azdata.objectexplorer.ObjectExplorerNode> {
    return await azdata.objectexplorer.getNode(oContext.connectionProfile?.id || "", oContext.nodeInfo?.nodePath);
}

export async function GetParentByType(node: azdata.objectexplorer.ObjectExplorerNode, type: string): Promise<azdata.objectexplorer.ObjectExplorerNode> {
    var parentNode = await node.getParent();
    if (!parentNode) {
        return parentNode;
    }

    if (parentNode.nodeType.toLocaleLowerCase() == type.trim().toLocaleLowerCase()) {
        return parentNode;
    } else {
        return await GetParentByType(parentNode, type);
    }
}