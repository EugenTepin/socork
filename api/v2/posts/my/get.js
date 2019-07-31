const db = app_require('./utils/getDataBaseObject.js');
const errors = app_require('./utils/errors.js');
const AppError = errors.AppError;

function searchUsers(req, res, next) {
    console.log('posts/my GET ')
    let longSQL = `SELECT *
    FROM posts
    WHERE authorid = :id
    ORDER BY date ASC`;
    db.query(longSQL, {
        replacements: {
            id: res.locals.user.id
        },
        type: db.QueryTypes.SELECT
    }
    ).then(function (result) {
        //console.log(result)
        res.status(200).json(result);
    }).catch(function (e) {
        next(new AppError('Unknown error.', e));
    })
};


module.exports = [searchUsers];