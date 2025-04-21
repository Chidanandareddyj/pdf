import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchandextract(ufsUrl: string, name: string, userid: string) {
    console.log("Starting PDF extraction from:", ufsUrl);
    
    try {
        const response = await fetch(ufsUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
        }
        
        const blob = await response.blob();
        console.log("PDF fetched, blob size:", blob.size);
        
        const arrayBuffer = await blob.arrayBuffer();
        
        // Create a new PDFLoader instance with the Blob
        const loader = new PDFLoader(new Blob([arrayBuffer], { type: "application/pdf" }));
        
        const docs = await loader.load();
        console.log("PDF loaded successfully:", docs.length, "pages");
        
        return docs.map((doc) => ({
            pageContent: doc.pageContent,
            metadata: {
                source: doc.metadata.source,
                title: name,
                userId: userid,
                pageNumber: doc.metadata.pageNumber,
            },
        }));
    } catch (error) {
        console.error("Error in PDF extraction:", error);
        throw error;
    }
}