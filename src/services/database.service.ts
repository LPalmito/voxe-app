import {Injectable, NgZone} from "@angular/core";
import 'rxjs/Rx';
import {AppStore} from "../store";
import * as PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
import {MainService} from "./main.service";
import {Storage} from '@ionic/storage';

window["PouchDB"] = PouchDB;


@Injectable()
export class DatabaseService {
  private _db;
  private _store;


  constructor(private main: MainService, private zone: NgZone, private storage: Storage) {}

  initDB() {
    console.log('Initializing the database...');
    PouchDB.plugin(cordovaSqlitePlugin);
    this._db = new PouchDB('voxe.db', { adapter: 'cordova-sqlite' });
  }

  databaseToStore() {
    this.getAll()
      .then(data => {
        this.zone.run(() => {
          this.main.initStore(data);
        });
      })
      .catch(console.error.bind(console));
  };

  storageToDatabase() {
    if(this._db) {
      let newStore: AppStore;
      this.storage.forEach((value, key, iterationNumber) => {
        console.log('Hey!', value, key, iterationNumber);
        newStore[key] = value;
      });
      this.update(newStore);
    }
  }

  update(appStore: AppStore) {
    return this._db.put(appStore);
  }

  add(store: AppStore) {
    return this._db.post(store);
  }

  drop(store: AppStore) {
    return this._db.remove(store);
  }

  getAll() {

    if (!this._store) {
      return this._db.allDocs({ include_docs: true})
        .then(docs => {

          // TODO: "AppStore[] vs AppStore for '_store'"
          // Each row has a .doc object and we just want to send the first
          // element of the array of AppStores back to the calling controller,
          // so let's map the array to contain just the .doc objects
          this._store = docs.rows.map(row => row.doc);

          // Listen for changes on the database
          this._db.changes({ live: true, since: 'now', include_docs: true})
            .on('change', this.onDatabaseChange);

          return this._store;
        });
    }
    else {
      // Return cached data as a promise
      return Promise.resolve(this._store);
    }
  }

  // The input for this method is a change object that contains an id and the actual data in a doc object
  private onDatabaseChange = (change) => {

    console.log('Changing the database...', this._store, change);

    // Not sure what is actually happening here but since we only have one AppStore index should be equal to 0
    let index = this.findIndex(this._store, change.id);
    let s = this._store[index];

    if (change.deleted) {
      if (s) {
        this._store.splice(index, 1);  // remove
      }
    }
    else {
      if (s && s._id === change.id) {
        this._store[index] = change.doc;  // update
      }
      else {
        this._store.splice(index, 0, change.doc);  // insert
      }
    }
  }

  // Binary search, the array is by default sorted by _id
  private findIndex(array, id) {
    let low = 0, high = array.length, mid;
    while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid + 1 : high = mid
    }
    return low;
  }

}
