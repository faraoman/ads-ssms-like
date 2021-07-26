import * as vscode from 'vscode';
import * as azdata from 'azdata';
import { RunQuery } from '../../dbManager';
import { GetCurrentTreeNode, GetParentByType } from '../../utils';

export async function DeleteAsync(oContext: azdata.ObjectExplorerContext) {
    if (oContext && oContext.connectionProfile) {
        var currentMenuItem = await GetCurrentTreeNode(oContext);
        var tableMenuItem = await GetParentByType(currentMenuItem, "table");
        var triggerName = currentMenuItem.metadata?.name;
        var answer = await vscode.window.showWarningMessage(`Delete trigger "${triggerName}"?`, "Yes", "No");
        if (answer == "Yes") {
            const connection = oContext.connectionProfile;
            var result = await RunQuery(connection, "", `USE [${connection.databaseName}]; DROP TRIGGER ${tableMenuItem.metadata?.schema}.${triggerName}; SELECT 0;`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`Trigger "${triggerName}" deleted`);
                var node1 = await GetCurrentTreeNode(oContext);
                var parent = await node1.getParent();
                parent.refresh();
            }
        }
    }
}

export async function EnableAsync(oContext: azdata.ObjectExplorerContext) {
    if (oContext && oContext.connectionProfile) {
        var currentMenuItem = await GetCurrentTreeNode(oContext);
        var tableMenuItem = await GetParentByType(currentMenuItem, "table");
        var triggerName = currentMenuItem.metadata?.name;
        var answer = await vscode.window.showWarningMessage(`Enable trigger "${triggerName}"?`, "Yes", "No");
        if (answer == "Yes") {
            const connection = oContext.connectionProfile;
            var result = await RunQuery(connection, "", `USE [${connection.databaseName}]; ENABLE TRIGGER ${triggerName} ON ${tableMenuItem.metadata?.schema}.${tableMenuItem.metadata?.name}; SELECT 0;`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`Trigger "${triggerName}" enabled`);
                var node1 = await GetCurrentTreeNode(oContext);
                var parent = await node1.getParent();
                parent.refresh();
            }
        }
    }
}

export async function DisableAsync(oContext: azdata.ObjectExplorerContext) {
    if (oContext && oContext.connectionProfile) {
        var currentMenuItem = await GetCurrentTreeNode(oContext);
        var tableMenuItem = await GetParentByType(currentMenuItem, "table");
        var triggerName = currentMenuItem.metadata?.name;
        var answer = await vscode.window.showWarningMessage(`Disable trigger "${triggerName}"?`, "Yes", "No");
        if (answer == "Yes") {
            const connection = oContext.connectionProfile;
            var result = await RunQuery(connection, "", `USE [${connection.databaseName}]; DISABLE TRIGGER ${triggerName} ON ${tableMenuItem.metadata?.schema}.${tableMenuItem.metadata?.name}; SELECT 0;`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`Trigger "${triggerName}" disabled`);
                var node1 = await GetCurrentTreeNode(oContext);
                var parent = await node1.getParent();
                parent.refresh();
            }
        }
    }
}