const db = app_require('./utils/getDataBaseObject.js');
const errors = app_require('./utils/errors.js');
const AppError = errors.AppError;
const ValidationError = errors.ValidationError;
const ParameterRequiredError = errors.ParameterRequiredError;

function validate(req, res, next) {
    console.log('my-subscriptions POST validate');
    console.log(req.params);
    const userid = req.params.userid;

    if (userid === void 0 || userid === '') {
        throw new ParameterRequiredError('userid');
    }

    res.locals.userid = userid;
    next();
};


function createNewSubscription(req, res, next) {
    console.log('my-subscriptions POST')
    //authorid
    db.query('SELECT EXISTS(SELECT 1 FROM users WHERE id=:userid)', {
        replacements: {
            userid: res.locals.userid
        },
        type: db.QueryTypes.SELECT
    }).then(function (result) {
        console.log(result)
        if (!result[0].exists) {
            throw new ValidationError('No such user!');
        }
        return db.query('INSERT INTO followers (follower, following) VALUES(:follower, :following) RETURNING id;', {
            replacements: {
                follower: res.locals.user.id,
                following: res.locals.userid
            },
            type: db.QueryTypes.INSERT
        });
    }).then(function (result) {
        console.log(result)
        var id = result[0][0].id;
        res.status(200).json({ subscriptionId: id });
    }).catch(function (e) {
        next(new AppError('Unknown error.', e));
    })
};


module.exports = [validate, createNewSubscription];