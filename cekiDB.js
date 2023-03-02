import { data, saveData } from "./Base/splash.js";
import db from "./index.js";

class cekiDB {
    async get(key) {
        if (!key)
            throw TypeError(
                "data to be extracted is not specified! (data.get() undefined data!)"
            );

        return data[key];
    }

    async has(key) {
        if (!key)
            throw TypeError(
                "data to be extracted is not specified! (data.has() undefined data!)"
            );

        return Boolean(data[key]);
    }

    async set(key, value) {
        if (!key)
            throw TypeError(
                "data to be extracted is not specified! (data.set() undefined data!)"
            );

        if (value === null || value === undefined)
            throw TypeError(
                "value to set is not specified! (data.set() undefined value!)"
            );

        data[key] = value;
        saveData();
    }

    async delete(key) {
        if (!key)
            throw TypeError(
                "data to be deleted is not specified! (data.delete() undefined data!)"
            );
        delete data[key];
        saveData();
    }

    async add(key, count) {
        if (!key)
            throw TypeError("No key to be added! (data.add() undefined key!)");
        if (count === null || count === undefined)
            throw TypeError(
                "no value specified! (data.add() undefined value!)"
            );
        if (!isNaN(key)) throw TypeError("key isNaN! (data.add() isNaN key!)");

        if (db.get(key)) {
            data[key] += count;
        } else {
            data[key] = count;
        }

        saveData();
    }

    async subtrack(key, count) {
        if (!key)
            throw TypeError(
                "No data to be added! (data.subtrack() undefined data!)"
            );
        if (count === null || count === undefined)
            throw TypeError(
                "no value specified! (data.subtrack() undefined value!)"
            );

        if (db.get(key)) {
            data[key] -= count;
        } else {
            data[key] = count;
        }
        saveData();
    }

    async push(key, elements) {
        if (!key) throw TypeError("No data to add value specified! ");
        if (!elements) throw TypeError("No value to be added!");

        if (!data[key]) data[key] = [];
        data[key].push(elements);
        saveData();
    }

    async pull(key, elements) {
        if (!key) throw TypeError("No data to pull value specified! ");
        if (!elements) throw TypeError("No value to withdraw!");
        if (!data[key]) throw TypeError("There is no such key");
        if (!Array.isArray(data[key]))
            throw TypeError("The data is not a array!");
        const newData = data[key].filter((x) => x !== elements);
        this.set(key, newData);
	saveData();
    }
}

export default cekiDB;
