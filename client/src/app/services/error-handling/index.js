class ErrorBuffer
{
    constructor()
    {
        this.buf = []
    }
    push(e)
    {
        this.buf.push(e)
    }
    clear()
    {
        this.buf = []
    }
    count()
    {
        return this.buf.length
    }
    get(i)
    {
        if (typeof i === typeof 0 && i<0 && i<this.count()) 
        {
            return this.buf[i]
        }else{
            return  {}
        }

    }
}

const errorHandling = {
    /**
     *  An error flag set to true if an exception handling is queried after clearHasError() was called
     */
    errorFlag : false,
    /*
    * local error buffer used to buffer errors
    */
    buffer : null , 
    /*
    *  Errors callback
    */
    callbacks : {} ,
    callbacks_by_type : {} ,
    /**
     * Initialize module
     */
    init(){
        this.buffer = new ErrorBuffer()
    },
    /**
     *  Returns true if an exception handling is queried after clearHasError() was called
     */
    hasError : () => this.errorFlag,
    /**
     *  Set's hasError to false
     */
    clearHasError : ()=>{
        this.errorFlag = false
    },
    /**
     *  Does exception handling ( and reporting )
     */
    handleException(e,id)
    {
        this.buffer.push(e)
        /*
        const exceptionAdapter = buildExceprionAdapter(e)
        pingApi(exceptionAdapter, new Date(),function.callee.name)
        */
        if (id && this.callbacks[id])
        {
            for (let callback of this.callbacks[id])
                callback(id,e)
        }
        if (this.callbacks_by_type[e.constructor.name])
        {
            console.log(this.callbacks_by_type[e.constructor.name]);
            for (let callback of this.callbacks_by_type[e.constructor.name])
                callback(e.constructor.name,e)
        }
        errorHandling.hasError = true
    },
    setErrorCallback(callback, ids)
    {
        for ( let c of ids )
        {
            this.callbacks[c] = this.callbacks[c] ? [...this.callbacks[c] , callback ] : [callback]
        }
    } ,
    setErrorCallbackByType(callback, types)
    {
        for ( let c of types )
        {
            this.callbacks_by_type[c] = this.callbacks_by_type[c] ? [...this.callbacks_by_type[c] , callback ] : [callback]
        }
    }
}

errorHandling.init()
export default errorHandling