const db = app_require('./utils/getDataBaseObject.js');
const errors = app_require('./utils/errors.js');
const AppError = errors.AppError;
const ParameterRequiredError = errors.ParameterRequiredError;


function validate(req, res, next) {
    console.log('my-subscriptions DELETE validate');
    console.log(req.params);
    const userid = req.params.userid;

    if (userid === void 0 || userid === '') {
        throw new ParameterRequiredError('userid');
    }

    res.locals.userid = userid;
    next();
};


function deleteSubscription(req, res, next) {
    console.log('my-subscriptions DELETE')
    //authorid
    db.query('DELETE FROM followers where follower=:id AND following=:userid', {
        replacements: {
            userid: res.locals.userid,
            id: res.locals.user.id
        },
        type: db.QueryTypes.DELETE
    }).then(function (result) {
        res.status(200).end();
    }).catch(function (e) {
        next(new AppError('Unknown error.', e));
    })
};


module.exports = [validate, deleteSubscription];