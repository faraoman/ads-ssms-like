import * as vscode from 'vscode';
import * as azdata from 'azdata';
import { RunExec, RunQuery } from '../../dbManager';
import { GetCurrentTreeNode } from '../../utils';

export async function DeleteAsync(oContext: azdata.ObjectExplorerContext) {
    if (oContext && oContext.connectionProfile) {
        var dbName = oContext.connectionProfile.databaseName;
        var currentMenuItem = await GetCurrentTreeNode(oContext);
        var schemaName = currentMenuItem.metadata?.name || currentMenuItem.label;
        var answer = await vscode.window.showWarningMessage(`Delete schema "${schemaName}"?`, "Yes", "No");
        if (answer == "Yes") {
            const connection = oContext.connectionProfile;
            var result = await RunQuery(connection, "", `USE [${dbName}]; DROP SCHEMA ${schemaName}; SELECT 0;`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`Schema "${schemaName}" deleted`);
                var node1 = await GetCurrentTreeNode(oContext);
                var parent = await node1.getParent();
                parent.refresh();
            }
        }
    }
}