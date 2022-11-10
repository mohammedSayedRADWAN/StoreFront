/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    status_order VARCHAR(50) NOT NULL,
    /*CASCADE means that the child data is either deleted or updated when the parent data is deleted or updated.*/
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE 
);