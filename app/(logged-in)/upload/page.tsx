'use client'

import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkle } from 'lucide-react'
import React from 'react'
import { z } from 'zod'

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

const page = () => {
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
                    <div className="flex flex-col items-center gap-3 sm:gap-4">
                        <Input
                            type="file"
                            accept=".pdf"
                            name="file-upload"
                            id="file-upload"
                            className="w-full cursor-pointer file:cursor-pointer file:border-0 file:bg-primary file:text-white file:px-2 sm:file:px-4 file:py-1 sm:file:py-2 file:mr-2 sm:file:mr-4 file:rounded-lg hover:file:bg-primary/90 transition-all text-sm sm:text-base"
                            placeholder='Upload your PDF'
                        />

                        <Button 
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg transition-all text-sm sm:text-base"
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
