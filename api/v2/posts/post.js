const db = app_require('./utils/getDataBaseObject.js');
const errors = app_require('./utils/errors.js');
const AppError = errors.AppError;
const ParameterRequiredError = errors.ParameterRequiredError;


function validate(req, res, next) {
    console.log('Posts POST validate');
    console.log(req.body);
    const text = req.body.text;
    const title = req.body.title;
    if (text === void 0 || text === '') {
        throw new ParameterRequiredError('text');
    }

    if (title === void 0 || title === '') {
        throw new ParameterRequiredError('title');
    }

    res.locals.post = {
        text: text,
        title: title
    };
    next();
};


function createNewPost(req, res, next) {
    console.log('Posts POST')
    //authorid
    db.query('INSERT INTO posts (text,title, authorid, date) VALUES(:text,:title, :authorid, :date) RETURNING id;', {
        replacements: {
            text: res.locals.post.text,
            title: res.locals.post.title,
            authorid: res.locals.user.id,
            date: new Date()
        },
        type: db.QueryTypes.INSERT
    }
    ).then(function (result) {
        console.log(result)
        var id = result[0][0].id;
        res.status(200).json({ postId: id });
    }).catch(function (e) {
        next(new AppError('Unknown error.', e));
    })
};


module.exports = [validate, createNewPost];