export enum Database {
    "new" = "ssms-like.database.new",
    "rename" = "ssms-like.database.rename",
    "delete" = "ssms-like.database.delete",
    "takeOffline" = "ssms-like.database.takeOffline",
    "bringOnline" = "ssms-like.database.bringOnline",
    "shrinkDatabase" = "ssms-like.database.shrinkDatabase",
    "shrinkData" = "ssms-like.database.shrinkData",
    "shrinkLog" = "ssms-like.database.shrinkLog"
}

export enum View {
    "rename" = "ssms-like.view.rename",
    "delete" = "ssms-like.view.delete",
}

export enum Table {
    "new" = "ssms-like.table.new",
    "rename" = "ssms-like.table.rename",
    "delete" = "ssms-like.table.delete",
}

export enum Column {
    "rename" = "ssms-like.column.rename",
    "delete" = "ssms-like.column.delete",
}
