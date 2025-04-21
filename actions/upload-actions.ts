'use server'
import { fetchandextract } from "@/lib/langchain";

export async function generatepdfsummary(uploadResponse:{
    serverData: {
        userid: string;
        file: {
            ufsUrl: string;
            name: string;
        };
    };
}){
    if(!uploadResponse?.serverData) return { error: "Missing server data" };
    
    const { serverData:{
        userid,
        file: { ufsUrl, name },
    } } = uploadResponse;

    if(!ufsUrl) return { error: "Missing URL" };

    try{
        const pdfsummary = await fetchandextract(ufsUrl, name, userid);
        console.log('Extraction succeeded with', pdfsummary.length, 'pages');
        return { success: true, data: pdfsummary };
    }
    catch(err){
        console.error("Error fetching and extracting PDF:", err);
        return { error: String(err) };
    }
}