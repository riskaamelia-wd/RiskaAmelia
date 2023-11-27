const Textarea = ({placeholder, onChange, value, name}) =>{
    return(
        <textarea        
            placeholder={placeholder}
            className="form-control input-border-color input-box-shadow input-background input-text-color"
            onChange={onChange}
            value={value}
            rows={5}
            name={name}
            id={name}
        >

        </textarea>
    )
}
export default Textarea