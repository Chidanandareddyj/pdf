"use server";
import geminisummary from "@/lib/gemini";
import { fetchandextract } from "@/lib/langchain";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { prisma } from "@/lib/db";


interface pdfsummarytype {
  userId?: string;
  original_file_url: string;
  summary_text: string;
  title?: string;
  file_name?: string;
}

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

  const {
    serverData: {
      userid,
      file: { ufsUrl, name },
    },
  } = uploadResponse;

  if (!ufsUrl) return { error: "Missing URL" };

  try {
    const pdfextract = await fetchandextract(ufsUrl, name, userid);
    console.log("Extraction succeeded with", pdfextract.length, "pages");
    let summary;
    try {
      const fullText = pdfextract.map((p) => p.pageContent).join("\n\n");
      summary = await geminisummary(fullText);
      console.log("Summary from gemini:", { summary });
    } catch (err) {
      console.error("Error in gemini API call:", err);
      return { error: String(err) };
    }

    return { success: true, summary: summary };
  } catch (err) {
    console.error("Error fetching and extracting PDF:", err);
    return { error: String(err) };
  }
}

async function savedsummary({
  userId,
  original_file_url,
  summary_text,
  title,
  file_name,
}: pdfsummarytype) {
  try {
    if (!userId) {
      throw new Error("userId is required to save summary");
    }
    const result = await prisma.pdfSummary.create({
      data: {
        userId,
        originalFileUrl: original_file_url,
        summaryText: summary_text,
        title: title || null,
        fileName: file_name || null,
        status: "completed",
      },  
    });

    console.log("Successfully saved summary with ID:", result.id);
    return { success: true, id: result.id };
  } catch (err) {
    console.error("Error storing summary:", err);
    return { error: String(err) };
  }
}

export async function storesummaryaction({
  original_file_url,
  summary_text,
  title,
  file_name,
}: pdfsummarytype) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, error: "User not authenticated" };

    const result = await savedsummary({
      userId,
      original_file_url,
      summary_text,
      title,
      file_name,
    });

    if (result.error) {
      return { success: false, error: result.error };
    }

    return { success: true, id: result.id };
  } catch (err) {
    console.error("Error storing summary:", err);
    return { success: false, error: String(err) };
  }
}
