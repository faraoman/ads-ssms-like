import * as vscode from 'vscode';
import * as azdata from 'azdata';
import { RunQuery } from '../../dbManager';
import { GetCurrentTreeNode, GetParentByType } from '../../utils';


export async function RenameAsync(oContext: azdata.ObjectExplorerContext) {
    if (!oContext || !oContext.connectionProfile) { return; }
    var currentMenuItem = await GetCurrentTreeNode(oContext); //  await azdata.objectexplorer.getNode(oContext.connectionProfile.id, oContext.nodeInfo?.nodePath);
    var columnName = currentMenuItem.metadata?.name || currentMenuItem.label.split(' ')[0];
    var tableMenuItem = await GetParentByType(currentMenuItem, "table");
    var newColumnName = await vscode.window.showInputBox({ title: "New Column Name", prompt: `New name of column on ${oContext.connectionProfile.serverName}` });
    if (newColumnName) {
        const connection = oContext.connectionProfile;
        var result = await RunQuery(connection, "", `USE [${connection.databaseName}]; EXEC sp_rename '${tableMenuItem.metadata?.schema}.${tableMenuItem.metadata?.name}.${columnName}', '${newColumnName}', 'COLUMN';SELECT 0;`);
        if (result.rowCount >= 0) {
            vscode.window.showInformationMessage(`Column "${columnName}" renamed as "${newColumnName}"`);
            var parent = await currentMenuItem.getParent();
            parent.refresh();
        }
    }
}

export async function DeleteAsync(oContext: azdata.ObjectExplorerContext) {

}