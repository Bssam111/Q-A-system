
-- Users
INSERT INTO users (id, username, password) VALUES
(2, 'user_alpha', 'pass123'),
(3, 'user_beta', 'pass123'),
(4, 'user_gamma', 'pass123'),
(5, 'user_delta', 'pass123');

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
