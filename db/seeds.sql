INSERT INTO users ("user_name", "birthday", "email", "bio", "createdAt", "updatedAt") VALUES
('Josh Horowitz', '01/02/1980', 'jhorowitz@gmail.com', 'I am a cowboy', now(), now()),
('Ryan Reynolds', '03/15/1975', 'deadpool@gmail.com', 'I am deadpoop', now(), now()),
('Logan Paul', '12/15/1990', 'lpaul@douche.com', 'I am a douche', now(), now());

INSERT INTO comments ("title", "comment_text", "createdAt", "updatedAt") VALUES
('How I met your mother...', 'I met her at a grungy bar', now(), now()),
('I deserve an Oscar for Deadpool', 'Because I am the best actor of...', now(), now()),
('Not a douche', 'No really', now(), now());

INSERT INTO recipes ("recipe_name", "image_url", "ingredients", "directions", "chef", "tags", "createdAt", "updatedAt") VALUES
('Oatmeal', 'https://img.com/img.jpg', 'oatmeal, sugar, milk', 'mix it', 'Anthony Bourdain', 'bland, healthy', now(), now()),
('Chimichanga', 'https://img.com/img.jpg', 'mexican stuff', 'put it together', 'Maria', 'yum, unhealthy', now(), now()),
('Hot Dog', 'https://img.com/img.jpg', 'bun, ketchup, weiner', 'uh...', 'Arnold', 'baseball food', now(), now());

INSERT INTO days ("date", "createdAt", "updatedAt") VALUES
('05/10/2018', now(), now()),
('02/15/2018', now(), now()),
('03/15/2017', now(), now());