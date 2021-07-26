import * as vscode from 'vscode';
import * as azdata from 'azdata';
import { GetCurrentTreeNode } from '../utils';
import { RunExec, RunQuery } from '../dbManager';

export async function RecompileAsync(oContext: azdata.ObjectExplorerContext) {
    if (oContext && oContext.connectionProfile) {
        var currentMenuItem = await GetCurrentTreeNode(oContext);
        var viewName = currentMenuItem.metadata?.name;
        var answer = await vscode.window.showWarningMessage(`Recompile view "${viewName}"?`, "Yes", "No");
        if (answer == "Yes") {
            const connection = oContext.connectionProfile;
            var result = await RunExec(connection, `USE [${connection.databaseName}]; EXEC sp_refreshview '${currentMenuItem.metadata?.schema}.${currentMenuItem.metadata?.name}';`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`View "${viewName}" recompiled`);
                var node1 = await GetCurrentTreeNode(oContext);
                var parent = await node1.getParent();
                parent.refresh();
            }
        }
    }
}

export async function RenameAsync(oContext: azdata.ObjectExplorerContext) {
    if (!oContext || !oContext.connectionProfile) { return; }
    var currentMenuItem = await GetCurrentTreeNode(oContext);
    var newViewName = await vscode.window.showInputBox({ title: "New View Name", prompt: `New name of view on ${oContext.connectionProfile.serverName}` });
    if (newViewName) {
        const connection = oContext.connectionProfile;
        var result = await RunQuery(connection, "", `USE [${connection.databaseName}]; EXEC sp_rename '${currentMenuItem.label}', '${newViewName}';SELECT 0;`);
        if (result.rowCount >= 0) {
            vscode.window.showInformationMessage(`View "${currentMenuItem.metadata?.name}" renamed as "${newViewName}"`);
            var parent = await currentMenuItem.getParent();
            parent.refresh();
        }
    }
}

export async function DeleteAsync(oContext: azdata.ObjectExplorerContext) {
    if (oContext && oContext.connectionProfile) {
        var currentMenuItem = await GetCurrentTreeNode(oContext);
        var viewName = currentMenuItem.metadata?.name;
        var answer = await vscode.window.showWarningMessage(`Delete view "${viewName}"?`, "Yes", "No");
        if (answer == "Yes") {
            const connection = oContext.connectionProfile;
            var result = await RunQuery(connection, "", `USE [${connection.databaseName}]; DROP VIEW [${viewName}]; SELECT 0;`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`View "${viewName}" deleted`);
                var node1 = await GetCurrentTreeNode(oContext);
                var parent = await node1.getParent();
                parent.refresh();
            }
        }
    }
}