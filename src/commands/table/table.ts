import * as vscode from 'vscode';
import * as azdata from 'azdata';
import { RunQuery } from '../../dbManager';
import { GetCurrentTreeNode } from '../../utils';


export async function RenameAsync(oContext: azdata.ObjectExplorerContext) {
    if (!oContext || !oContext.connectionProfile) { return; }
    var currentMenuItem = await GetCurrentTreeNode(oContext);
    var newTableName = await vscode.window.showInputBox({ title: "New Table Name", prompt: `New name of table on ${oContext.connectionProfile.serverName}` });
    if (newTableName) {
        const connection = oContext.connectionProfile;
        var result = await RunQuery(connection, "", `USE [${connection.databaseName}]; EXEC sp_rename '${currentMenuItem.label}', '${newTableName}';SELECT 0;`);
        if (result.rowCount >= 0) {
            vscode.window.showInformationMessage(`Table "${currentMenuItem.metadata?.name}" renamed as "${newTableName}"`);
            var parent = await currentMenuItem.getParent();
            parent.refresh();
        }
    }
}

export async function DeleteAsync(oContext: azdata.ObjectExplorerContext) {

}