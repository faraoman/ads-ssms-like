import * as vscode from 'vscode';
import * as azdata from 'azdata';
import { RunQuery } from '../../dbManager';
import { GetCurrentTreeNode, GetParentByType } from '../../utils';

export async function RenameAsync(oContext: azdata.ObjectExplorerContext) {
    if (!oContext || !oContext.connectionProfile) { return; }
    var currentMenuItem = await GetCurrentTreeNode(oContext); //  await azdata.objectexplorer.getNode(oContext.connectionProfile.id, oContext.nodeInfo?.nodePath);
    var indexName = currentMenuItem.metadata?.name || currentMenuItem.label.split(' ')[0];
    var tableMenuItem = await GetParentByType(currentMenuItem, "table");
    var newIndexName = await vscode.window.showInputBox({ title: "New Index Name", prompt: `New name of index on ${oContext.connectionProfile.serverName}` });
    if (newIndexName) {
        const connection = oContext.connectionProfile;
        var result = await RunQuery(connection, "", `USE [${connection.databaseName}]; EXEC sp_rename '${tableMenuItem.metadata?.schema}.${tableMenuItem.metadata?.name}.${indexName}', '${newIndexName}', 'INDEX';SELECT 0;`);
        if (result.rowCount >= 0) {
            vscode.window.showInformationMessage(`Index "${indexName}" renamed as "${newIndexName}"`);
            var parent = await currentMenuItem.getParent();
            parent.refresh();
        }
    }
}

export async function DeleteAsync(oContext: azdata.ObjectExplorerContext) {
    if (oContext && oContext.connectionProfile) {
        var currentMenuItem = await GetCurrentTreeNode(oContext);
        var tableMenuItem = await GetParentByType(currentMenuItem, "table");
        var indexName = currentMenuItem.metadata?.name;
        var answer = await vscode.window.showWarningMessage(`Delete index "${indexName}"?`, "Yes", "No");
        if (answer == "Yes") {
            const connection = oContext.connectionProfile;
            var result = await RunQuery(connection, "", `USE [${connection.databaseName}]; DROP INDEX ${indexName} ON ${tableMenuItem.metadata?.schema}.${tableMenuItem.metadata?.name}; SELECT 0;`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`Index "${indexName}" deleted`);
                var node1 = await GetCurrentTreeNode(oContext);
                var parent = await node1.getParent();
                parent.refresh();
            }
        }
    }
}

export async function RebuildAsync(oContext: azdata.ObjectExplorerContext) {
    if (!oContext || !oContext.connectionProfile) { return; }
    var currentMenuItem = await GetCurrentTreeNode(oContext); //  await azdata.objectexplorer.getNode(oContext.connectionProfile.id, oContext.nodeInfo?.nodePath);
    var indexName = currentMenuItem.metadata?.name || currentMenuItem.label.split(' ')[0];
    var tableMenuItem = await GetParentByType(currentMenuItem, "table");
    const connection = oContext.connectionProfile;
    var result = await RunQuery(connection, "", `USE [${connection.databaseName}]; ALTER INDEX ${indexName} ON ${tableMenuItem.metadata?.schema}.${tableMenuItem.metadata?.name} REBUILD;SELECT 0;`);
    if (result.rowCount >= 0) {
        vscode.window.showInformationMessage(`Index "${indexName}" enabled`);
        var parent = await currentMenuItem.getParent();
        parent.refresh();
    }
}

export async function DisableAsync(oContext: azdata.ObjectExplorerContext) {
    if (!oContext || !oContext.connectionProfile) { return; }
    var currentMenuItem = await GetCurrentTreeNode(oContext); //  await azdata.objectexplorer.getNode(oContext.connectionProfile.id, oContext.nodeInfo?.nodePath);
    var indexName = currentMenuItem.metadata?.name || currentMenuItem.label.split(' ')[0];
    var tableMenuItem = await GetParentByType(currentMenuItem, "table");
    const connection = oContext.connectionProfile;
    var result = await RunQuery(connection, "", `USE [${connection.databaseName}]; ALTER INDEX ${indexName} ON ${tableMenuItem.metadata?.schema}.${tableMenuItem.metadata?.name} DISABLE;SELECT 0;`);
    if (result.rowCount >= 0) {
        vscode.window.showInformationMessage(`Index "${indexName}" disabled`);
        var parent = await currentMenuItem.getParent();
        parent.refresh();
    }
    // var newColumnName = await vscode.window.showInputBox({ title: "New Index Name", prompt: `New name of index on ${oContext.connectionProfile.serverName}` });
    // if (newColumnName) {
    //     const connection = oContext.connectionProfile;
    //     var result = await RunQuery(connection, "", `USE [${connection.databaseName}]; EXEC sp_rename '${tableMenuItem.metadata?.schema}.${tableMenuItem.metadata?.name}.${indexName}', '${newColumnName}', 'INDEX';SELECT 0;`);
    //     if (result.rowCount >= 0) {
    //         vscode.window.showInformationMessage(`Index "${indexName}" renamed as "${newColumnName}"`);
    //         var parent = await currentMenuItem.getParent();
    //         parent.refresh();
    //     }
    // }
}