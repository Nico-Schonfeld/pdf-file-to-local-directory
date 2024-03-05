'use client'

import { useState } from 'react'

 function UploadForm() {
  const [file, setFile] = useState<File>()

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
    } catch (e: any) {
  
      console.error(e)
    }
  }

  return (
    <form onSubmit={onSubmit} className='h-dvh m-5 flex-col flex items-center justify-center gap-5'>
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
        className='bg-white text-black px-2 py-1 rounded-lg'
      />
      <input type="submit" value="Upload"  className='bg-slate-600 rounded-lg text-white font-medium px-2 py-1 cursor-pointer' />
    </form>
  )
}


export default UploadForm