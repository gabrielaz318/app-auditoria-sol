import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("whatsbeto.db");

export default db;