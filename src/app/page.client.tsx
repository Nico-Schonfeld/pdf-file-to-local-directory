'use client'

import { Brochure } from '@prisma/client'
import { useState } from 'react'
import {useRouter} from 'next/navigation'
import { deleteBrochure } from './action'

 function UploadForm({brochure}: {brochure: Brochure[]}) {
  const [file, setFile] = useState<File>()

  const router = useRouter()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })


      if (!res.ok) throw new Error(await res.text())

      if(res.ok) return router.refresh()
    } catch (e: any) {
  
      console.error(e)
    }
  }

  

  return (
   <main className='h-dvh flex items-center justify-center flex-col gap-5 px-2 py-6'>

    <ul className='flex flex-col gap-5'>
      {brochure.map((b, index) => (
        <li key={index} className='flex flex-col'>
          <span>Id: {b.id}</span>
          <span>Path: {b.filePdf}</span>
          <span>categoryId: {b.categoryId}</span>
          <span>fundNum: {b.fundNum}</span>
          <button onClick={() => {
            deleteBrochure(b.id)
            router.refresh()
          }} className='bg-red-500 text-white font-medium rounded-md'>Delete</button>
        </li>
      ))}
    </ul>

     <form onSubmit={onSubmit} className='h-full m-5 flex-col flex items-center justify-center gap-5'>
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
        className='bg-white text-black px-2 py-1 rounded-lg'
      />
      <input type="submit" value="Upload"  className='bg-slate-600 rounded-lg text-white font-medium px-2 py-1 cursor-pointer' />
    </form>
   </main>
  )
}


export default UploadForm