export enum Database {
    "new" = "ssms-like.database.new",
    "rename" = "ssms-like.database.rename",
    "delete" = "ssms-like.database.delete",
    "takeOffline" = "ssms-like.database.takeOffline",
    "bringOnline" = "ssms-like.database.bringOnline",
    "shrinkDatabase" = "ssms-like.database.shrinkDatabase",
    "shrinkData" = "ssms-like.database.shrinkData",
    "shrinkLog" = "ssms-like.database.shrinkLog",
    "comment" = "ssms-like.database.comment"
}

export enum View {
    "rename" = "ssms-like.view.rename",
    "delete" = "ssms-like.view.delete",
}

export enum Table {
    "new" = "ssms-like.table.new",
    "rename" = "ssms-like.table.rename",
    "delete" = "ssms-like.table.delete",
    "comment" = "ssms-like.table.comment",
}

export enum Column {
    "rename" = "ssms-like.column.rename",
    "delete" = "ssms-like.column.delete",
    "comment" = "ssms-like.column.comment",
}

export enum Indexes {
    "rebuild" = "ssms-like.indexes.rebuild",
    "reorganize" = "ssms-like.indexes.reorganize",
    "disable" = "ssms-like.indexes.disable",
    "rename" = "ssms-like.indexes.rename",
    "delete" = "ssms-like.indexes.delete",
    "comment" = "ssms-like.indexes.comment",
}

export enum Trigger {
    "delete" = "ssms-like.trigger.delete",
    "enable" = "ssms-like.trigger.enable",
    "disable" = "ssms-like.trigger.disable",
    "comment" = "ssms-like.trigger.comment",
}

export enum Constraint {
    "delete" = "ssms-like.constraint.delete",
}