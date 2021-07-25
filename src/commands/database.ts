import * as vscode from 'vscode';
import * as azdata from 'azdata';
import { RunQuery } from '../dbManager';
import { GetCurrentTreeNode } from '../utils';

export async function NewAsync(oContext: azdata.ObjectExplorerContext) {
    // vscode.window.showInformationMessage("OOK 6");
    if (oContext && oContext.connectionProfile) {
        var dbName = await vscode.window.showInputBox({ title: "New Database", prompt: `Name of database to create on ${oContext.connectionProfile.serverName}` });
        if (dbName) {
            const connection = oContext.connectionProfile;
            var result = await RunQuery(connection, "", `USE [master]; CREATE DATABASE [${dbName}];SELECT 0;`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`Database "${dbName}" created`);
                var node1 = await GetCurrentTreeNode(oContext);
                var parent = await node1.getParent();
                parent.refresh();
            }
        }
    }
}

export async function RenameAsync(oContext: azdata.ObjectExplorerContext) {
    /*ALTER DATABASE [Test] MODIFY NAME = [Test2] | EXEC sp_renamedb 'Test', 'Test2'*/
    // var k = (await azdata.connection.getActiveConnections())[0];
    // console.log(k);
    // var t = await azdata.connection.getConnection(k.connectionId);
    if (oContext && oContext.connectionProfile) {
        var dbName = await vscode.window.showInputBox({ title: "New Database name", prompt: `New Name of database on ${oContext.connectionProfile.serverName}` });
        if (dbName) {
            const connection = oContext.connectionProfile;
            var result = await RunQuery(connection, "", `USE [master]; ALTER DATABASE [${oContext.connectionProfile.databaseName}] MODIFY NAME = [${dbName}];SELECT 0;`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`Database "${dbName}" renamed`);
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
        var answer = await vscode.window.showWarningMessage(`Delete database "${dbName}"?`, "Yes", "No");
        if (answer == "Yes") {
            const connection = oContext.connectionProfile;
            var result = await RunQuery(connection, "", `USE [master]; ALTER DATABASE [${dbName}] SET SINGLE_USER WITH ROLLBACK IMMEDIATE; DROP DATABASE [${dbName}]; SELECT 0;`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`Database "${dbName}" deleted`);
                var node1 = await GetCurrentTreeNode(oContext);
                var parent = await node1.getParent();
                parent.refresh();
            }
        }
    }
}

export async function TakeOfflineAsync(oContext: azdata.ObjectExplorerContext) {
    const dbName: string = oContext.connectionProfile?.databaseName || "tempdb";
    var answer = await vscode.window.showWarningMessage(`Set database "${dbName}" offline?`/*, { modal: true }*/, "Yes", "No");
    if (answer === "Yes") {
        const connection = oContext.connectionProfile; //await azdata.connection.getCurrentConnection();
        if (connection) {
            var result = await RunQuery(connection, dbName, `USE [master]; ALTER DATABASE [${dbName}] SET OFFLINE WITH ROLLBACK IMMEDIATE;SELECT 0;`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`Database "${dbName}" offline`);
                var node1 = await GetCurrentTreeNode(oContext);
                var parent = await node1.getParent();
                parent.refresh();
            }
        }
    }
}

export async function BringOnlineAsync(oContext: azdata.ObjectExplorerContext) {
    const dbName: string = oContext.connectionProfile?.databaseName || "tempdb";
    const connection = oContext.connectionProfile;
    if (connection) {
        var result = await RunQuery(connection, dbName, `USE [master]; ALTER DATABASE [${dbName}] SET ONLINE WITH ROLLBACK IMMEDIATE;SELECT 0;`);
        if (result.rowCount >= 0) {
            vscode.window.showInformationMessage(`Database "${dbName}" online`);
            var node1 = await GetCurrentTreeNode(oContext);
            var parent = await node1.getParent();
            parent.refresh();
        }
    }
}

export async function ShrinkDatabase(oContext: azdata.ObjectExplorerContext) {
    const dbName: string = oContext.connectionProfile?.databaseName || "tempdb";
    var answer = await vscode.window.showWarningMessage(`Shrink database "${dbName}" ?`/*, { modal: true }*/, "Yes", "No");
    if (answer === "Yes") {
        const connection = oContext.connectionProfile;
        if (connection) {
            var result = await RunQuery(connection, dbName, `USE [master]; DBCC SHRINKDATABASE(N'${dbName}');SELECT 0;`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`Shrink for database "${dbName}" executed`);
                var node1 = await GetCurrentTreeNode(oContext);
                var parent = await node1.getParent();
                parent.refresh();
            }
        }
    }
    // vscode.window.showInformationMessage("OOK 1");/*DBCC SHRINKDATABASE(N'${dbName}' )*/
}

export async function ShrinkData(oContext: azdata.ObjectExplorerContext) {
    vscode.window.showInformationMessage("OOK 2");/*DBCC SHRINKFILE (N'DBNAME' , 0, TRUNCATEONLY)*/
}
export async function ShrinkLog(oContext: azdata.ObjectExplorerContext) {
    vscode.window.showInformationMessage("OOK 3");/*DBCC SHRINKFILE (N'DBNAME_log' , 0, TRUNCATEONLY)*/
}