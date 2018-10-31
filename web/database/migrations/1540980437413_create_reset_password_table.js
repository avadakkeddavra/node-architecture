module.exports = {
    "up": `
    CREATE TABLE reset_password (
        id INT NOT NULL AUTO_INCREMENT,
        user_id INT NOT NULL,
        hash VARCHAR(256) NOT NULL,
        used BOOLEAN NOT NULL DEFAULT 0,
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `,
    "down": "DROP TABLE reset_password"
} 