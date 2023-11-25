const Input = ({placeholder, onChange, value, type}) =>{
    return(
        <input
            placeholder={placeholder}
            className="form-control input-border-color mb-3  input-box-shadow input-background input-text-color"
            onChange={onChange}
            value={value}
            type={type}
        />
    )
}
export default Input