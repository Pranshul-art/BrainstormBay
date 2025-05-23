export const Button=({label,onClick})=>{
    return(
    <div className="pt-4 bg-clip-padding bg-gradient-to-r from-slate-400 to-gray-600">
        <button onClick={onClick} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
    </div>
    )
}