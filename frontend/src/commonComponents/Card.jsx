import {MessageCircle, ThumbsUp, Star} from "lucide-react"



export const Card=({title,description,technologies,author,votes,comments})=>{

    
    return<div className="bg-white shadow-md p-4 pt-7 py-5 px-5 rounded-lg">
        <div className="flex justify-between pb-3">
            <h1 className="font-bold text-2xl ">
                {title}
            </h1>
            <span className="text-md font-light text-slate-500">by {author}</span>
        </div>
        <div className="font-normal text-lg text-slate-500 pb-4 truncate">
            {description}
        </div>
        <div className=" flex flex-wrap gap-2 mb-4">
            {technologies.map(tech=>(
                <span key={tech} className="text-blue-800 bg-blue-100 px-2 py-1 rounded  text-xs">
                    {tech}
                </span>
            ))}
        </div>

        <div className="flex items-center">
            <div className="flex items-center p-2">
                <button className="flex px-2 gap-1 text-gray-600 hover:text-blue-600">
                    <ThumbsUp size={20} className="mt-0.5"/>
                    {votes}
                </button>
                <button className="flex px-2 gap-1 text-gray-600 hover:text-green-600">
                    <MessageCircle size={20} className="mt-0.5"/>
                    {comments}
                </button>
                <Star size={20} className="mt-0.5 text-gray-600 hover:text-yellow-400"/>
            </div>
            
        </div>
        
        
    </div>
}