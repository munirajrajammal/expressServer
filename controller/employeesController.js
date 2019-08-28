router = require('express').Router()
module.exports = router;

router.get('/', getEmployees)
router.put('/:id', UpdateEmployees)
router.post('/', InsertEmployees)
router.delete('/:id', DeleteEmployees)



let db = [];

function getEmployees(req, res, next) {
    res.send(status(200),db)
}

function UpdateEmployees(req, res, next) {
    let updated = false;
    db.forEach((emp) => {
        if(req.params['id'] == emp['id']) {
            emp['id'] = req.body['id'];
            emp['name'] = req.body['name'];
            emp['email'] = req.body['email'];
            updated = true;
        }
    })
    if (updated)
        res.send(db)
}

function InsertEmployees(req, res, next) {
    db.push(req.body);
    res.send({data:db,msg:'emp inserted'})
}

function DeleteEmployees(req, res, next) {
    // let temp = [];
    // db.forEach((emp) => {
    //     if(req.params['id'] != emp['id']){
    //         db.push(temp);
    //     }
    // })

    db = db.filter(emp => emp.id != req.params['id'])

    res.send(db)
}