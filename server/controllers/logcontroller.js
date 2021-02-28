const router = require('express').Router(); 
const { validateSession } = require('../middleware');
const { LogModel } = require('../models');

//POST LOG
router.post('/post', validateSession, async (req, res) => {
    const {description, definition, result, owner_id} = req.body;

    try {
        const Log = await LogModel.create({
            description,
            definition,
            result,
            owner_id
        })

        res.status(201).json({
            message: 'Logged',
            Log
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to Log: ${err}` 
        })
    }
})

//GET ALL BY USER
router.get('/', validateSession, async (req, res) => {
    try{
        const locateLogs = await LogModel.findAll();
        res.status(200).json({
            message: 'Logs Retrived!',
            locateLogs
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to retrive logs: ${err}`
        })
    }
});
//GET ALL BY ID
router.get('/:id', validateSession, async (req, res) => {
    try{
        const locateLogs = await LogModel.findAll({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: 'Logs Retrived!',
            locateLogs
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to retrive logs: ${err}`
        })
    }
});
//UPDATE LOG BY ID
router.put('/:id', async (req, res) => {
    const {description, definition, result, owner_id} = req.body;
    try{
        const logUpdated = LogModel.update(
            {description, definition, result, owner_id},
            {where: {id: req.params.id}}
        )
        res.status(200).json({
            message: "Log updated",
            logUpdated
        })
    } catch (err) {
        res.status(500).json({
            message: `Updeate failed ${err}`
        })
    }
});

//DELETE
router.delete('/:id', async (req, res) => {
    try{
        await LogModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            message: "Log Destroyed"
        })
    } catch (err) {
        res.status(500).json({
            message: `Unable to Destroy log: ${err}`
        })
    }
})

module.exports = router;
