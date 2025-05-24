'use client'

import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UploadButton } from '@/utils/uploadthing'
import { Sparkle } from 'lucide-react'
import React from 'react'
import { z } from 'zod'
import { toast } from "sonner"
import { generatepdfsummary, storesummaryaction } from '@/actions/upload-actions'


const uploadSchema = z.object({
    file: z
        .instanceof(File, { message: 'File is required' })
        .refine((file) => file.size <= 10 * 1024 * 1024, {
            message: 'File size must be less than 10MB',
        })
        .refine((file) => file.type === 'application/pdf', {
            message: 'File must be a PDF',
        })
})

const  page = async() => {
    const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        const file = formdata.get('file-upload') as File;

        const validetedfields = uploadSchema.safeParse({ file });
        if (!validetedfields.success) {
            console.log(validetedfields.error.format())
            return;
        }
    }

    

    return (
        <BackgroundBeamsWithCollision className="min-h-screen px-4 sm:px-6 lg:px-8"> {/* Added responsive padding */}
            <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6 py-8 sm:py-16">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-800/40 border border-gray-600/50 backdrop-blur-sm">
                    <Sparkle className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    <span className="text-xs sm:text-sm font-medium text-gray-200">
                        AI powered content creation
                    </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-2xl text-center px-4">
                    Start uploading your PDFs
                </h1>

                <form className="w-full max-w-[90%] sm:max-w-md mt-4 sm:mt-8 space-y-4" onSubmit={handlesubmit}>
                    <div className="flex flex-col items-center w-full space-y-4">
                        <div className="w-full">
                            <UploadButton
                                endpoint="pdfuploader"
                                onClientUploadComplete={async (res) => {
                                    console.log("Full response:", res);
                                    if (res && res.length > 0) {
                                        const uploadData = {
                                            serverData: {
                                                userid: "user-id-here",
                                                file: {
                                                    ufsUrl: res[0].ufsUrl,
                                                    name: res[0].name
                                                }
                                            }
                                        };
                                        
                                        const summary = await generatepdfsummary(uploadData);
                                        let storeresult:any;
                                        if(summary){
                                            storeresult=await storesummaryaction({
                                                summary_text: typeof summary?.summary === "string" ? summary.summary : "",
                                                original_file_url: res[0].ufsUrl,
                                                title: res[0].name,
                                                file_name: res[0].name,
                                            });
                                            toast.success("Summary stored successfully", {
                                                position: "top-center",
                                            });
                                        }
                                        
                                        console.log({summary});
                                    }
                                    
                                    toast.success("Upload Completed", {
                                        position: "top-center",
                                    });
                                }}
                                onUploadError={(error: Error) => {
                                    toast.error(`Upload failed: ${error.message}`, {
                                        position: "top-center",
                                    });
                                }}
                                appearance={{
                                    button: "bg-primary hover:bg-primary/90 text-white w-full",
                                    allowedContent: "text-gray-400 text-sm",
                                }}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold 
                            rounded-lg transition-colors duration-200 py-2.5"
                        >
                            Upload PDF
                        </Button>
                    </div>
                </form>
            </div>
        </BackgroundBeamsWithCollision>
    )
}

export default page
