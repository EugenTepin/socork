# socork
test social network

# Routes

POST /auth - get token (sign in)
Params:
    email - login (required)
    password - password (required)

POST /users - add new user (sign up)
Params:
    name - visiable name (required)
    email - login (required)
    password - password (required)
DB: insert into users table

GET /users/search - search users by name criteria.
Params:
    name - value of search field (required)
    page - result page (default 1)
    limit - result limit (default 10)
DB: JOIN users and followers than filter by criteria, limit response to page and limit params

POST /my-subscriptions/userid - subscribe to user account
Params:
    following - user id (required)
DB: insert into followers table, get my id from token

DELETE /my-subscriptions/userid - unsubscribe from user account
DB: delete from followers table, get my id from token

GET /posts/my 
Params:
    page - result page (default 1)
    limit - result limit (default 10)
DB: JOIN posts, users and followers than filter by criteria, limit response to page and limit params

GET /posts/my-subscriptions
Params:
    page - result page (default 1)
    limit - result limit (default 10)
DB: JOIN posts, users and followers than filter by criteria, limit response to page and limit params

POST /posts
Params:
    title - post title (required)
    text - post body (required)
DB: insert into posts table, get my id from token
