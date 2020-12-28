const getData = async (req, res) => {
    const db = req.app.get('db')
    const { tableName } = req.params
    // const { userId } = req.session.user  
    const userId = 1

    const data = await db.data.get_data([tableName, userId])
    .catch(err => {console.log(err); res.status(500).send(err)})

    res.status(200).send(data)
    
}

const addData = async (req, res) => {
    const db = req.app.get('db')
    const { tableName } = req.params

    await db.data.add_data([tableName, req.body])
    .catch(err => {console.log(err); res.status(500).send(err)})

    res.sendStatus(200)
}

const editData = async (req, res) => {
    const db = req.app.get('db')
    
}

const deleteData = async (req, res) => {
    const db = req.app.get('db')
    const { tableName, dataId } = req.params
    // const { userId } = req.session.user
    const userId = 1

    await db.data.delete_data([tableName, userId, dataId])
    res.sendStatus(200)
}

export { getData, addData, editData, deleteData }