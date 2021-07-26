import * as vscode from 'vscode';
import * as azdata from 'azdata';
import { RunQuery } from '../../dbManager';
import { GetCurrentTreeNode, GetParentByType } from '../../utils';

export async function DeleteAsync(oContext: azdata.ObjectExplorerContext) {
    if (oContext && oContext.connectionProfile) {
        var currentMenuItem = await GetCurrentTreeNode(oContext);
        var tableMenuItem = await GetParentByType(currentMenuItem, "table");
        var constraintName = currentMenuItem.metadata?.name;
        var answer = await vscode.window.showWarningMessage(`Delete constraint "${constraintName}"?`, "Yes", "No");
        if (answer == "Yes") {
            const connection = oContext.connectionProfile;
            var result = await RunQuery(connection, "", `USE [${connection.databaseName}]; ALTER TABLE ${tableMenuItem.metadata?.name} DROP CONSTRAINT ${constraintName}; SELECT 0;`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`Constraint "${constraintName}" deleted`);
                var node1 = await GetCurrentTreeNode(oContext);
                var parent = await node1.getParent();
                parent.refresh();
            }
        }
    }
}