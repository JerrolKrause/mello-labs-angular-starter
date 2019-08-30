1. Rename the following files by replacing 'temp' => 'newProp'. `temp.query.ts`, `temp.service.ts` and `temp.store.ts`
2. Within those same files, do a global case sensitive find replace for 'Temp' => 'NewProp'
3. Make another find replace to update the interface. `Models.User` => `Models.NewModel`
4. Add a reference to the new service in `../domain.service.ts` in the constructor. IE `public newProp: NewPropService`
5. If necessary, update uniqueID in the store file
6. Update the property of the default selector in the query file. IE `public users$ = this.select();` => `public todos$ = this.select();`
