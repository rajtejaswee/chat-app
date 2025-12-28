interface InputProps {
    placeholder: string
}

export const Input = (props: InputProps) => {
    return (
        <input
            type="text"
            placeholder={props.placeholder}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />    
    )
}