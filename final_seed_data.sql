
-- Users
INSERT IGNORE INTO users (id, username, password) VALUES
(1, 'demo_user', '123456'),
(2, 'user_alpha', 'pass123'),
(3, 'user_beta', 'pass123'),
(4, 'user_gamma', 'pass123'),
(5, 'user_delta', 'pass123');

-- Questions
INSERT INTO questions (id, user_id, title, content, created_at) VALUES
(1, 1, 'How to center a div using CSS?', 'I am struggling to center a div in my layout. Any help?', NOW()),
(2, 1, 'What is the difference between let and var in JavaScript?', 'Can someone explain with examples?', NOW()),
(3, 1, 'How to connect PHP to MySQL database?', 'I want to fetch data using PHP. How to connect it properly?', NOW()),
(4, 1, 'What is event bubbling in JavaScript?', 'I heard about it in interviews. What exactly is it?', NOW()),
(5, 1, 'Best way to learn web development in 2025?', 'What roadmap should I follow?', NOW()),
(6, 1, 'How to prevent SQL injection in PHP?', 'Is prepared statement enough?', NOW()),
(7, 1, 'What is semantic HTML?', 'Why is it important and where do we use it?', NOW()),
(8, 1, 'Why use MVC architecture?', 'Is MVC still relevant in modern web development?', NOW()),
(9, 1, 'Difference between sessionStorage and localStorage?', 'Which one is better for auth tokens?', NOW()),
(10, 1, 'How to deploy a PHP site online?', 'Any free hosting or recommended steps?', NOW());

-- Answers
INSERT INTO answers (question_id, user_id, content, created_at) VALUES
(1, 2, 'You can use margin: auto or flexbox to center the div.', NOW()),
(2, 3, 'let is block scoped, var is function scoped.', NOW()),
(3, 4, 'Use mysqli or PDO with prepared statements.', NOW()),
(4, 5, 'Event bubbling means the event propagates up from child to parent.', NOW()),
(5, 2, 'Follow frontendmentor.io or the Odin Project.', NOW()),
(6, 3, 'Prepared statements are a strong defense against SQL injection.', NOW()),
(7, 4, 'Semantic HTML helps accessibility and SEO.', NOW()),
(8, 5, 'MVC separates concerns and is still used widely.', NOW()),
(9, 2, 'Use sessionStorage for temp data, localStorage for persistent.', NOW()),
(10, 3, 'Use 000webhost or deploy to Netlify if using front-end only.', NOW());
