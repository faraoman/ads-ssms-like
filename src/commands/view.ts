import * as vscode from 'vscode';
import * as azdata from 'azdata';
import { GetCurrentTreeNode } from '../utils';
import { RunQuery } from '../dbManager';


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

}