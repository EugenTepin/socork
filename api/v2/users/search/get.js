const db = app_require('./utils/getDataBaseObject.js');
const errors = app_require('./utils/errors.js');
const AppError = errors.AppError;
const ParameterRequiredError = errors.ParameterRequiredError;

function validate(req, res, next) {
    console.log('users/search GET validate');
    console.log(req.body);
    const name = req.body.name;

    if (name === void 0 || name === '') {
        throw new ParameterRequiredError('name');
    }

    res.locals.search = {
        name: name
    };
    next();
};

function searchUsers(req, res, next) {
    console.log('users/search GET ')
    let longSQL = `SELECT users.id, users.name, followers.follower
    FROM users LEFT JOIN followers ON users.id = followers.following
    WHERE (followers.follower = :id OR followers.follower is NULL)
    AND users.id <> :id
    AND users.name ILIKE :name
    ORDER BY followers.follower ASC`; // add sort as param?

    db.query(longSQL, {
        replacements: {
            name: res.locals.search.name + '%',
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


module.exports = [validate, searchUsers];