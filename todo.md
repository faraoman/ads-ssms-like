# To Do

## Features

### Database

 - [X] Create
 - [X] Rename
 - [X] Delete
 - [X] Online
 - [X] Offline
 - [ ] Shrink
    - [X] Database
    - [ ] Data
    - [ ] Log
 - [ ] Comment `exec sp_addextendedproperty 'MS_Description', 'prova commento'`

### Table

 - [ ] Create
 - [ ] Design
 - [X] Rename
 - [X] Delete
 - [ ] Comment

### Table-Column

 - [ ] Create
 - [X] Rename
 - [X] Delete
 - [ ] Comment `EXEC sp_addextendedproperty @name = N'MS_Description', @value = 'This is the description of my column', @level0type = N'Schema', @level0name = 'dbo', @level1type = N'Table', @level1name = 'MyTable', @level2type = N'Column', @level2name = 'MyColumn'`

### Table-Trigger

 - [ ] Create
 - [ ] Rename
 - [ ] Delete
 - [ ] Enable `https://docs.microsoft.com/it-it/sql/t-sql/statements/disable-trigger-transact-sql?view=sql-server-ver15`
 - [ ] Disable `https://docs.microsoft.com/it-it/sql/t-sql/statements/disable-trigger-transact-sql?view=sql-server-ver15`
 
### Table-Indexes

 - [ ] Create
 - [X] Rename
 - [X] Delete
 - [X] Rebuild
 - [ ] Reorganize
 - [X] Disable
 - [ ] RebuildAll
 - [ ] ReorganizeAll
 - [ ] DisableAll

## Extension

 - [ ] 