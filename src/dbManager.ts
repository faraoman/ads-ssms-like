'use strict';
import * as vscode from 'vscode';
import * as azdata from 'azdata';


export async function RunQuery(connection: azdata.IConnectionProfile, dbName: string, query: string): Promise<azdata.SimpleExecuteResult> {
    var result: azdata.SimpleExecuteResult;

    // { // new mode
    //     let connectionUri = await azdata.connection.getUriForConnection(connection.id);
    //     let connectionProvider = azdata.dataprotocol.getProvider<azdata.ConnectionProvider>(connection.providerName, azdata.DataProviderType.ConnectionProvider);
    //     connectionProvider.changeDatabase(connectionUri, dbName);

    //     let queryProvider = azdata.dataprotocol.getProvider<azdata.QueryProvider>(connection.providerName, azdata.DataProviderType.QueryProvider);
    //     result = await queryProvider.runQueryAndReturn(connectionUri, query);
    // }

    { // old mode
        var connectionResult = await azdata.connection.connect(connection, false, false);
        if (connectionResult.connected) {
            let connectionUri = await azdata.connection.getUriForConnection(connection.id);
            let queryProvider = azdata.dataprotocol.getProvider<azdata.QueryProvider>(connection.providerName, azdata.DataProviderType.QueryProvider);
            result = await queryProvider.runQueryAndReturn(connectionUri, query);
        } else {
            result = {
                rowCount: -1, columnInfo: [], rows: []
            }
        }
    }


    // 
    // var connectionUri = await azdata.connection.getUriForConnection(connectionResult.connectionId);
    // let connectionProvider = azdata.dataprotocol.getProvider<azdata.ConnectionProvider>(connectionProfile.providerName, azdata.DataProviderType.ConnectionProvider);
    // connectionProvider.changeDatabase(connectionUri, dbName);
    // if (connectionResult.connected) {
    // let queryProvider = azdata.dataprotocol.getProvider<azdata.QueryProvider>(connectionProfile.providerName, azdata.DataProviderType.QueryProvider);
    // result = await queryProvider.runQueryAndReturn(connectionUri, query);
    // } else {
    //     result = {
    //         rowCount: -1, columnInfo: [], rows: []
    //     }
    // }

    return result;
}