create database jwt;
use jwt;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Primary key with auto-increment
    name VARCHAR(255) NOT NULL,        -- Name field, cannot be NULL
    email VARCHAR(255) NOT NULL UNIQUE, -- Email field, must be unique and not NULL
    username VARCHAR(255) NOT NULL UNIQUE, -- Username field, must be unique and not NULL
    password VARCHAR(255) NOT NULL,    -- Password field, cannot be NULL
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp for updates
);

create user "jwt_user"@"localhost" identified by "jwt_pass";
grant all privileges on jwt.* to "jwt_user"@"localhost";
flush privileges;

describe users;
select * from users;