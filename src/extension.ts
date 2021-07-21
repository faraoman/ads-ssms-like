'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// The module 'azdata' contains the Azure Data Studio extensibility API
// This is a complementary set of APIs that add SQL / Data-specific functionality to the app
// Import the module and reference it with the alias azdata in your code below

import * as azdata from 'azdata';
import { RunQuery } from './dbManager';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "ssms-like" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    //#region Add-Rename-Delete Database
    const newDatabase = vscode.commands.registerCommand("ssms-like.newDatabase", async (oContext: azdata.ObjectExplorerContext) => {
        // vscode.window.showInformationMessage("OOK 6");
        if (oContext && oContext.connectionProfile) {
            var dbName = await vscode.window.showInputBox({ title: "New Database", prompt: `Name of database to create on ${oContext.connectionProfile.serverName}` });
            if (dbName) {
                const connection = oContext.connectionProfile;
                var result = await RunQuery(connection, "", `USE [master]; CREATE DATABASE [${dbName}];SELECT 0;`);
                if (result.rowCount >= 0) {
                    vscode.window.showInformationMessage(`Database "${dbName}" created`);
                    var node1 = await azdata.objectexplorer.getNode(connection.id, oContext.nodeInfo?.nodePath);
                    var parent = await node1.getParent();
                    parent.refresh();
                }
            }
        }
    });
    const renameDatabase = vscode.commands.registerCommand("ssms-like.renameDatabase", async (oContext: azdata.ObjectExplorerContext) => {
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
                    var node1 = await azdata.objectexplorer.getNode(connection.id, oContext.nodeInfo?.nodePath);
                    var parent = await node1.getParent();
                    parent.refresh();
                }
            }
        }
    });
    const deleteDatabase = vscode.commands.registerCommand("ssms-like.deleteDatabase", async (oContext: azdata.ObjectExplorerContext) => {
        if (oContext && oContext.connectionProfile) {
            var dbName = oContext.connectionProfile.databaseName;
            var answer = await vscode.window.showWarningMessage(`Delete database "${dbName}"?`, "Yes", "No");
            if (answer == "Yes") {
                const connection = oContext.connectionProfile;
                var result = await RunQuery(connection, "", `USE [master]; ALTER DATABASE [${dbName}] SET SINGLE_USER WITH ROLLBACK IMMEDIATE; DROP DATABASE [${dbName}]; SELECT 0;`);
                if (result.rowCount >= 0) {
                    vscode.window.showInformationMessage(`Database "${dbName}" deleted`);
                    var node1 = await azdata.objectexplorer.getNode(connection.id, oContext.nodeInfo?.nodePath);
                    var parent = await node1.getParent();
                    parent.refresh();
                }
            }
        }
    });

    context.subscriptions.push(newDatabase, renameDatabase, deleteDatabase);
    //#endregion

    //#region Online-Offline Database
    const setDatabaseOffline = vscode.commands.registerCommand("ssms-like.takeOffline", async (oContext: azdata.ObjectExplorerContext) => {
        const dbName: string = oContext.connectionProfile?.databaseName || "tempdb";
        var answer = await vscode.window.showWarningMessage(`Set database "${dbName}" offline?`/*, { modal: true }*/, "Yes", "No");
        if (answer === "Yes") {
            const connection = oContext.connectionProfile; //await azdata.connection.getCurrentConnection();
            if (connection) {
                var result = await RunQuery(connection, dbName, `USE [master]; ALTER DATABASE [${dbName}] SET OFFLINE WITH ROLLBACK IMMEDIATE;SELECT 0;`);
                if (result.rowCount >= 0) {
                    vscode.window.showInformationMessage(`Database "${dbName}" offline`);
                    var node1 = await azdata.objectexplorer.getNode(connection.id, oContext.nodeInfo?.nodePath);
                    var parent = await node1.getParent();
                    parent.refresh();
                }
            }
        }
    });

    const setDatabaseOnline = vscode.commands.registerCommand("ssms-like.bringOnline", async (oContext: azdata.ObjectExplorerContext) => {
        const dbName: string = oContext.connectionProfile?.databaseName || "tempdb";
        const connection = oContext.connectionProfile;
        if (connection) {
            var result = await RunQuery(connection, dbName, `USE [master]; ALTER DATABASE [${dbName}] SET ONLINE WITH ROLLBACK IMMEDIATE;SELECT 0;`);
            if (result.rowCount >= 0) {
                vscode.window.showInformationMessage(`Database "${dbName}" online`);
                var node1 = await azdata.objectexplorer.getNode(connection.id, oContext.nodeInfo?.nodePath);
                var parent = await node1.getParent();
                parent.refresh();
            }
        }
    });

    context.subscriptions.push(setDatabaseOffline, setDatabaseOnline);
    //#endregion

    //#region Shink DATA-Log
    const shrinkDatabase = vscode.commands.registerCommand("ssms-like.shrinkDatabase", async (oContext: azdata.ObjectExplorerContext) => {
        const dbName: string = oContext.connectionProfile?.databaseName || "tempdb";
        var answer = await vscode.window.showWarningMessage(`Shrink database "${dbName}" ?`/*, { modal: true }*/, "Yes", "No");
        if (answer === "Yes") {
            const connection = oContext.connectionProfile;
            if (connection) {
                var result = await RunQuery(connection, dbName, `USE [master]; DBCC SHRINKDATABASE(N'${dbName}');SELECT 0;`);
                if (result.rowCount >= 0) {
                    vscode.window.showInformationMessage(`Shrink for database "${dbName}" executed`);
                    var node1 = await azdata.objectexplorer.getNode(connection.id, oContext.nodeInfo?.nodePath);
                    var parent = await node1.getParent();
                    parent.refresh();
                }
            }
        }
        // vscode.window.showInformationMessage("OOK 1");/*DBCC SHRINKDATABASE(N'${dbName}' )*/
    });
    const shrinkData = vscode.commands.registerCommand("ssms-like.shrinkData", async (oContext: azdata.ObjectExplorerContext) => {
        vscode.window.showInformationMessage("OOK 2");/*DBCC SHRINKFILE (N'DBNAME' , 0, TRUNCATEONLY)*/
    });
    const shrinkLog = vscode.commands.registerCommand("ssms-like.shrinkLog", async (oContext: azdata.ObjectExplorerContext) => {
        vscode.window.showInformationMessage("OOK 3");/*DBCC SHRINKFILE (N'DBNAME_log' , 0, TRUNCATEONLY)*/
    });

    context.subscriptions.push(shrinkDatabase, shrinkData, shrinkLog);
    //#endregion
}

// this method is called when your extension is deactivated
export function deactivate() {
}