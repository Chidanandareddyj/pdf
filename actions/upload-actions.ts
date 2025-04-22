'use server'
import geminisummary from "@/lib/gemini";
import { fetchandextract } from "@/lib/langchain";
export async function generatepdfsummary(uploadResponse: {
    serverData: {
        userid: string;
        file: {
            ufsUrl: string;
            name: string;
        };
    };
}) {
    if (!uploadResponse?.serverData) return { error: "Missing server data" };

    const { serverData: {
        userid,
        file: { ufsUrl, name },
    } } = uploadResponse;

    if (!ufsUrl) return { error: "Missing URL" };

    try {
        const pdfextract = await fetchandextract(ufsUrl, name, userid);
        console.log('Extraction succeeded with', pdfextract.length, 'pages');
        let summary;
        try {
            const fullText = pdfextract.map(p => p.pageContent).join("\n\n");
            summary = await geminisummary(fullText);
            console.log("Summary from gemini:", {summary});
        } catch (err) {
            console.error("Error in gemini API call:", err );
            return { error: String(err) };
        }

        return { success: true, summary:summary };
    }
    catch (err) {
        console.error("Error fetching and extracting PDF:", err);
        return { error: String(err) };
    }
}