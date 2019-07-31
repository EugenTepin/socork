const db = app_require('./utils/getDataBaseObject.js');
const errors = app_require('./utils/errors.js');
const AppError = errors.AppError;

function searchUsers(req, res, next) {
    console.log('posts/subscriptions GET ')
    let longSQL = `SELECT posts.id, posts.text, posts.date, users.name
    FROM posts JOIN followers ON posts.authorid = followers.following
    JOIN users ON posts.authorid = users.id
    WHERE followers.follower = :id
    ORDER BY posts.date ASC`;

    db.query(longSQL, {
        replacements: {
            id: res.locals.user.id
        },
        type: db.QueryTypes.SELECT
    }
    ).then(function (result) {
        console.log(result)
        res.status(200).json(result);
    }).catch(function (e) {
        next(new AppError('Unknown error.', e));
    })
};


module.exports = [searchUsers];