import connection from "mysql2-promise";
connection().configure({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "test",
});

async function checktable() {
  try {
    Promise.all([
      createTableIfNotExists("users", [
        "id INT AUTO_INCREMENT PRIMARY KEY",
        "password VARCHAR(255) NOT NULL",
        "email VARCHAR(255) NOT NULL UNIQUE",
        "username VARCHAR(20) NOT NULL",
        "updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()",
        "created_at TIMESTAMP NOT NULL DEFAULT NOW()",
      ]),
      createTableIfNotExists("blockaccesses", [
        "id INT AUTO_INCREMENT PRIMARY KEY",
        "user_id INT NOT NULL",
        "token VARCHAR(255) DEFAULT NULL",
        "expiry DATETIME DEFAULT NULL",
        "issuedAt DATETIME DEFAULT NULL",
        "createdAt TIMESTAMP NOT NULL DEFAULT NOW()",
        "updatedAt TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()",
      ]),
    ]);
    return connection();
  } catch (error) {
    throw error;
  }
}

async function createTableIfNotExists(tableName, columns) {
  try {
      connection().query(
      `CREATE TABLE IF NOT EXISTS ${tableName} (${columns.join(", ")})`
    );
    console.log(`Table '${tableName}' created or already exists`);
  } catch (error) {
    console.error(`Error creating table '${tableName}':`, error);
    throw error;
  }
}

export default checktable;
