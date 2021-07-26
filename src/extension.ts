'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// The module 'azdata' contains the Azure Data Studio extensibility API
// This is a complementary set of APIs that add SQL / Data-specific functionality to the app
// Import the module and reference it with the alias azdata in your code below

import * as azdata from 'azdata';
import * as Commands from "./commands"

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "ssms-like" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    //#region Add-Rename-Delete Database
    const newDatabase = vscode.commands.registerCommand(Commands.IDs.Database.new, Commands.Database.NewAsync);
    const renameDatabase = vscode.commands.registerCommand(Commands.IDs.Database.rename, Commands.Database.RenameAsync);
    const deleteDatabase = vscode.commands.registerCommand(Commands.IDs.Database.delete, Commands.Database.DeleteAsync);
    context.subscriptions.push(newDatabase, renameDatabase, deleteDatabase);
    //#endregion

    //#region Online-Offline Database
    const setDatabaseOffline = vscode.commands.registerCommand(Commands.IDs.Database.takeOffline, Commands.Database.TakeOfflineAsync);
    const setDatabaseOnline = vscode.commands.registerCommand(Commands.IDs.Database.bringOnline, Commands.Database.BringOnlineAsync);
    context.subscriptions.push(setDatabaseOffline, setDatabaseOnline);
    //#endregion

    //#region Shink DATA-Log
    const shrinkDatabase = vscode.commands.registerCommand(Commands.IDs.Database.shrinkDatabase, Commands.Database.ShrinkDatabase);
    const shrinkData = vscode.commands.registerCommand(Commands.IDs.Database.shrinkData, Commands.Database.ShrinkData);
    const shrinkLog = vscode.commands.registerCommand(Commands.IDs.Database.shrinkLog, Commands.Database.ShrinkLog);
    context.subscriptions.push(shrinkDatabase, shrinkData, shrinkLog);
    //#endregion

    //#region View
    const renameView = vscode.commands.registerCommand(Commands.IDs.View.rename, Commands.View.RenameAsync);
    const deleteView = vscode.commands.registerCommand(Commands.IDs.View.delete, Commands.View.DeleteAsync);
    context.subscriptions.push(renameView, deleteView);
    //#endregion

    //#region Table
    const renameTable = vscode.commands.registerCommand(Commands.IDs.Table.rename, Commands.Table.RenameAsync);
    const deleteTable = vscode.commands.registerCommand(Commands.IDs.Table.delete, Commands.Table.DeleteAsync);
    context.subscriptions.push(renameTable, deleteTable);
    //#endregion

    //#region Table-Column
    const renameColumn = vscode.commands.registerCommand(Commands.IDs.Column.rename, Commands.Table.Column.RenameAsync);
    const deleteColumn = vscode.commands.registerCommand(Commands.IDs.Column.delete, Commands.Table.Column.DeleteAsync);
    context.subscriptions.push(renameColumn, deleteColumn);
    //#endregion

    //#region Table-Indexes
    const renameIndex = vscode.commands.registerCommand(Commands.IDs.Indexes.rename, Commands.Table.Indexes.RenameAsync);
    const enableIndex = vscode.commands.registerCommand(Commands.IDs.Indexes.rebuild, Commands.Table.Indexes.RebuildAsync);
    const disableIndex = vscode.commands.registerCommand(Commands.IDs.Indexes.disable, Commands.Table.Indexes.DisableAsync);
    context.subscriptions.push(renameIndex, enableIndex, disableIndex);
    //#endregion
}

// this method is called when your extension is deactivated
export function deactivate() {
}