const Textarea = ({placeholder, onChange, value}) =>{
    return(
        <textarea        
            placeholder={placeholder}
            className="form-control input-border-color input-box-shadow input-background input-text-color"
            onChange={onChange}
            value={value}
            rows={5}
        >

        </textarea>
    )
}
export default Textarea