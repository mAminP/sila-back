

const validator = {
    body : (schema)=>(req,res,next)=>{
        const {error,value } = schema.validate(req.body)

        if (error){
            res.status(422).send(error.details[0])
            return
        }
        req.body = value
        next()

    }
}

export  {validator}
