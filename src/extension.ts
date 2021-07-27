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
    {
        const newDatabase = vscode.commands.registerCommand(Commands.IDs.Database.new, Commands.Database.NewAsync);
        const renameDatabase = vscode.commands.registerCommand(Commands.IDs.Database.rename, Commands.Database.RenameAsync);
        const deleteDatabase = vscode.commands.registerCommand(Commands.IDs.Database.delete, Commands.Database.DeleteAsync);
        context.subscriptions.push(newDatabase, renameDatabase, deleteDatabase);
    }
    //#endregion

    //#region Online-Offline Database
    {
        const setDatabaseOffline = vscode.commands.registerCommand(Commands.IDs.Database.takeOffline, Commands.Database.TakeOfflineAsync);
        const setDatabaseOnline = vscode.commands.registerCommand(Commands.IDs.Database.bringOnline, Commands.Database.BringOnlineAsync);
        context.subscriptions.push(setDatabaseOffline, setDatabaseOnline);
    }
    //#endregion

    //#region Shink DATA-Log
    {
        const shrinkDatabase = vscode.commands.registerCommand(Commands.IDs.Database.shrinkDatabase, Commands.Database.ShrinkDatabase);
        const shrinkData = vscode.commands.registerCommand(Commands.IDs.Database.shrinkData, Commands.Database.ShrinkData);
        const shrinkLog = vscode.commands.registerCommand(Commands.IDs.Database.shrinkLog, Commands.Database.ShrinkLog);
        context.subscriptions.push(shrinkDatabase, shrinkData, shrinkLog);
    }
    //#endregion

    //#region View
    {
        const recompileView = vscode.commands.registerCommand(Commands.IDs.View.recompile, Commands.View.RecompileAsync);
        const renameView = vscode.commands.registerCommand(Commands.IDs.View.rename, Commands.View.RenameAsync);
        const deleteView = vscode.commands.registerCommand(Commands.IDs.View.delete, Commands.View.DeleteAsync);
        context.subscriptions.push(recompileView, renameView, deleteView);
    }
    //#endregion

    //#region Table
    {
        const renameTable = vscode.commands.registerCommand(Commands.IDs.Table.rename, Commands.Table.RenameAsync);
        const deleteTable = vscode.commands.registerCommand(Commands.IDs.Table.delete, Commands.Table.DeleteAsync);
        context.subscriptions.push(renameTable, deleteTable);
    }
    //#endregion

    //#region Table-Column
    {
        const renameColumn = vscode.commands.registerCommand(Commands.IDs.Column.rename, Commands.Table.Column.RenameAsync);
        const deleteColumn = vscode.commands.registerCommand(Commands.IDs.Column.delete, Commands.Table.Column.DeleteAsync);
        context.subscriptions.push(renameColumn, deleteColumn);
    }
    //#endregion

    //#region Table-Indexes
    {
        const rebuildIndex = vscode.commands.registerCommand(Commands.IDs.Indexes.rebuild, Commands.Table.Indexes.RebuildAsync);
        const reorganizeIndex = vscode.commands.registerCommand(Commands.IDs.Indexes.reorganize, Commands.Table.Indexes.ReorganizeAsync);
        const disableIndex = vscode.commands.registerCommand(Commands.IDs.Indexes.disable, Commands.Table.Indexes.DisableAsync);
        const renameIndex = vscode.commands.registerCommand(Commands.IDs.Indexes.rename, Commands.Table.Indexes.RenameAsync);
        const deleteIndex = vscode.commands.registerCommand(Commands.IDs.Indexes.delete, Commands.Table.Indexes.DeleteAsync);
        context.subscriptions.push(rebuildIndex, reorganizeIndex, disableIndex, renameIndex, deleteIndex);
    }
    //#endregion

    //#region Table-Trigger
    {
        const enableTrigger = vscode.commands.registerCommand(Commands.IDs.Trigger.enable, Commands.Table.Trigger.EnableAsync);
        const disableTrigger = vscode.commands.registerCommand(Commands.IDs.Trigger.disable, Commands.Table.Trigger.DisableAsync);
        const deleteTrigger = vscode.commands.registerCommand(Commands.IDs.Trigger.delete, Commands.Table.Trigger.DeleteAsync);
        context.subscriptions.push(enableTrigger, disableTrigger, deleteTrigger);
    }
    //#endregion

    //#region Table-Constraint
    {
        const deleteConstraint = vscode.commands.registerCommand(Commands.IDs.Constraint.delete, Commands.Table.Constraint.DeleteAsync);
        context.subscriptions.push(deleteConstraint);
    }
    //#endregion

    //#region Stored Procedure
    {
        const recompileStoredProcedure = vscode.commands.registerCommand(Commands.IDs.StoredProcedure.recompile, Commands.StoredProcedure.RecompileAsync);
        const renameStoredProcedure = vscode.commands.registerCommand(Commands.IDs.StoredProcedure.rename, Commands.StoredProcedure.RenameAsync);
        const deleteStoredProcedure = vscode.commands.registerCommand(Commands.IDs.StoredProcedure.delete, Commands.StoredProcedure.DeleteAsync);
        context.subscriptions.push(recompileStoredProcedure, renameStoredProcedure, deleteStoredProcedure);
    }
    //#endregion

    //#region User
    {
        const deleteUser = vscode.commands.registerCommand(Commands.IDs.User.delete, Commands.Security.User.DeleteAsync);
        context.subscriptions.push(deleteUser);
    }
    //#endregion

    //#region Schema
    {
        const deleteSchema = vscode.commands.registerCommand(Commands.IDs.Schema.delete, Commands.Security.Schema.DeleteAsync);
        context.subscriptions.push(deleteSchema);
    }
    //#endregion
}

// this method is called when your extension is deactivated
export function deactivate() {
}