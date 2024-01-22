import prisma from "@/libs/prismaClient"
import { getServerSession } from "next-auth/next"
import { imgbbUploader } from "imgbb-uploader";

export async function POST(request) {
    
    const session = await getServerSession(request)
    let imgdata

    if(session){
        
        let Data = await request.json()
        if(Data.data.info.image){
            let base64img = Data.data.info.image.substr(Data.data.info.image.indexOf(',') + 1);
    
            const options = {
                apiKey: "b89e645579bd4ed0af6eea6394c431cd", 
                base64string: base64img,
              };
        
        
            imgdata = await imgbbUploader(options)
        }

        
        await prisma.users.update({
            where: {
                id: Data.data.id
            },
            data: {
                ...Data.data.info,
                image: imgdata?.url
            }
        })
        
    }
    else{
        console.log("error")
    }
    return Response.json({ image: imgdata?.url })
    
    
}