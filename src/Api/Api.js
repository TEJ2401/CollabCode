import axios from "axios"
import { language } from "../atoms"
import { LANGUAGE_VERSIONS } from "./constants"

export const executeCode=async(language,sourceCode)=>{
    const API=axios.create({
        baseURL:"add your api key here"
    })
    const response=await API.post("/execute",{
        language:language,
        version:LANGUAGE_VERSIONS[language],
        files:[
            {
                
                content:sourceCode
            }

        ]
    })
    return response.data
}
export default executeCode;
