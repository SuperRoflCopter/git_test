const dbName = "taskManager"

export const openTaskManagerDB = () => indexedDB.open(dbName, 1)

export const initDB = () => {

    const request = openTaskManagerDB()

    const tasksData = [];

    request.onerror = function(event) {
    // Handle errors.
    }

    request.onupgradeneeded = function(event) {
    var db = event.target.result;

    // Create an objectStore to hold information about our tasks. We're
    // going to use "ssn" as our key path because it's guaranteed to be
    // unique - or at least that's what I was told during the kickoff meeting.
    var objectStore = db.createObjectStore("tasks", { keyPath: "ssn", autoIncrement: true })

    // Create an index to search customers by name. We may have duplicates
    // so we can't use a unique index.
    objectStore.createIndex("label", "label", { unique: true })

    // Use transaction oncomplete to make sure the objectStore creation is
    // finished before adding data into it.
    objectStore.transaction.oncomplete = function(event) {
        // Store values in the newly created objectStore.
        var tasksObjectStore = db.transaction("tasks", "readwrite").objectStore("tasks")
        tasksData.forEach(function(tasks) {
            tasksObjectStore.add(tasks)
        })
    }
    }
}