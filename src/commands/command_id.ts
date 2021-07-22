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

export enum Table {
    "new" = "ssms-like.Table.new",
    "rename" = "ssms-like.Table.rename",
    "delete" = "ssms-like.Table.delete",
}

export enum Column {
    "rename" = "ssms-like.column.rename",
    "delete" = "ssms-like.column.delete",
}
