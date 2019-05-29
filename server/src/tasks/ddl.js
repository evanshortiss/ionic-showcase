

async function createTasksTables(db) {
    const tasksExists = await db.schema.hasTable('tasks')
    if (!tasksExists) {
        await db.schema.createTable('tasks', function(table) {
            table.string('title')
            table.string('description')
            // Required for conflict resolution
            table.integer('version')
            table.increments('id')
            table.string('status')
        })
    }
}

async function createTaskVersionTable(db) {
    const tasksExists = await db.schema.hasTable('taskVersions')
    if (!tasksExists) {
        await db.schema.createTable('taskVersions', function(table) {
            table.string('title')
            table.string('description')
            // Required for conflict resolution
            table.integer('version')
            table.integer('id')
            table.string('status')
            table.primary(['id', 'version']);
        })
    }
}

module.exports = { createTasksTables, createTaskVersionTable }



