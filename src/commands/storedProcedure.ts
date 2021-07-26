import * as vscode from 'vscode';
import * as azdata from 'azdata';
import { RunExec, RunQuery } from '../dbManager';
import { GetCurrentTreeNode } from '../utils';


export async function RenameAsync(oContext: azdata.ObjectExplorerContext) {
    if (oContext && oContext.connectionProfile) {
        var currentMenuItem = await GetCurrentTreeNode(oContext);
        var storedProcedureName = currentMenuItem.metadata?.name;
        var newStoredProcedureName = await vscode.window.showInputBox({ title: "New Stored procedure name", prompt: `New Name of stored procedure on ${oContext.connectionProfile.serverName}` });
        if (newStoredProcedureName) {
            const connection = oContext.connectionProfile;
            var result = await RunQuery(connection, "", `USE [${connection.databaseName}]; EXEC sp_rename '${currentMenuItem.metadata?.schema}.${currentMenuItem.metadata?.name}', '${newStoredProcedureName}' ;SELECT 0;`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`Stored procedure ${storedProcedureName} renamed as "${newStoredProcedureName}"`);
                var node1 = await GetCurrentTreeNode(oContext);
                var parent = await node1.getParent();
                parent.refresh();
            }
        }
    }
}

export async function RecompileAsync(oContext: azdata.ObjectExplorerContext) {
    if (oContext && oContext.connectionProfile) {
        var dbName = oContext.connectionProfile.databaseName;
        var currentMenuItem = await GetCurrentTreeNode(oContext);
        var storedProcedureName = currentMenuItem.metadata?.name || currentMenuItem.label;
        var answer = await vscode.window.showWarningMessage(`Recompile stored procedure "${storedProcedureName}"?`, "Yes", "No");
        if (answer == "Yes") {
            const connection = oContext.connectionProfile;
            var result = await RunExec(connection, `USE [${connection.databaseName}]; EXEC sp_recompile N'${currentMenuItem.metadata?.schema}.${currentMenuItem.metadata?.name}'; SELECT 0;`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`Stored procedure "${dbName}" recompiled`);
                var node1 = await GetCurrentTreeNode(oContext);
                var parent = await node1.getParent();
                parent.refresh();
            }
        }
    }
}

export async function DeleteAsync(oContext: azdata.ObjectExplorerContext) {
    if (oContext && oContext.connectionProfile) {
        var dbName = oContext.connectionProfile.databaseName;
        var currentMenuItem = await GetCurrentTreeNode(oContext);
        var storedProcedureName = currentMenuItem.metadata?.name || currentMenuItem.label;
        var answer = await vscode.window.showWarningMessage(`Delete stored procedure "${storedProcedureName}"?`, "Yes", "No");
        if (answer == "Yes") {
            const connection = oContext.connectionProfile;
            var result = await RunQuery(connection, "", `USE [${dbName}]; DROP PROCEDURE [${currentMenuItem.metadata?.schema}.${storedProcedureName}]; SELECT 0;`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`Stored Procedure "${storedProcedureName}" deleted`);
                var node1 = await GetCurrentTreeNode(oContext);
                var parent = await node1.getParent();
                parent.refresh();
            }
        }
    }
}