\connect jotterdb

-- Accounts 
INSERT INTO account.accounts (id, name, email, password) VALUES 
('4bc38315-f925-4703-9ec2-60a73635b3cf', 'Freddie Hoy', 'freddiehoy0@gmail.com', '$2a$10$.AXk8hPzaKzgQ6I0jSwZfOmlnT99C4X9LEqhTcwQ059FgWQIHDnBu');
-- Password "pass"

-- Notes
INSERT INTO note.notes (id, heading, content, account_id) VALUES 
('c0948689-ced0-436a-80c6-152017ca1caf', 'Top movies', 'Gladiator, Saving Private Ryan', '4bc38315-f925-4703-9ec2-60a73635b3cf');
INSERT INTO note.notes (id, heading, content, account_id) VALUES 
('8eeec737-e34c-43db-bd35-d7605aa97aa5', 'Dinner ingredients', 'Pasta, tomato sauce', '4bc38315-f925-4703-9ec2-60a73635b3cf');
INSERT INTO note.notes (id, heading, content, account_id) VALUES 
('a95a02ba-5cfa-4ee6-96ce-7009003224ea', 'Christmas Presents', 'Teddy for my sister', '4bc38315-f925-4703-9ec2-60a73635b3cf');


