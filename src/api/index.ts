
import axios from "axios";
export const getQueEvents = async ()=>{
    try{
      const response =await axios.get("https://lrc3ourpsofdv5ucokblscusmq0iuqqe.lambda-url.ap-south-1.on.aws/")
       console.log(response.data)
  
      return response
  
  
    }catch(error){
      console.error(error)
  
    }
  }
  
  export const getAllHistoryByUserId = async ()=>{
    try{
      const response = await axios.post('https://n3iqmdkuqulj7gpklmxesd7fiu0piqig.lambda-url.ap-south-1.on.aws/',
        {
          "userId":"Manoj Namana",
          "source":"POC",
           "lastEvaluatedKey":0
        }
      )
  
      
      // console.log(response.data.items)
      return response
  
    }catch(error){
      console.error(error)
    }
  }