interface ButtonProps {
    text: string,
    variant?: "primary" | "secondary"
    fullWidth?: boolean
}

export const Button = (props: ButtonProps) => {
    const baseStyle = "px-8 py-3 rounded-md font-bold transition-all duration-200";
    const primaryStyles = "bg-white text-black hover:bg-gray-200"
    const widthClass = props.fullWidth ? "w-full" : "";

    return (
        <button className={`${baseStyle} ${primaryStyles} ${widthClass}`}>
            {props.text}
        </button>
    )
}
