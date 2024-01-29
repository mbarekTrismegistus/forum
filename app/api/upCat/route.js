import prisma from "@/libs/prismaClient"
import { getServerSession } from "next-auth/next"
import { imgbbUploader } from "imgbb-uploader";

export async function POST(request) {
    
    const session = await getServerSession(request)
    
    if(session){
        
        let Data = await request.json()
        
        let categorie = Data.data.id.replaceAll('%20', " ")
        let base64img = Data.data?.image.substr(Data.data.image.indexOf(',') + 1);

        const options = {
            apiKey: "b89e645579bd4ed0af6eea6394c431cd", 
            base64string: base64img,
        };
    
    
        let imgdata = await imgbbUploader(options)


        await prisma.categorie.update({
            where: {
                id: categorie
            },
            data: {
                title: Data.data.title,
                content: Data.data.content,
                image: imgdata.url
            }
        })
        
    }
    else{
        console.log("error")
    }
    return Response.json({  })
    
    
}