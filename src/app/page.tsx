// 上傳檔案測試
"use client"

import React from "react"

const HomePgae = () => {
  const [file, setFile] = React.useState<File | null>(null)
  const [message, setMessage] = React.useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(data.message)
      } else {
        setMessage("上傳失敗")
      }
    }
  }

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button
        className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
        onClick={handleFileUpload}
      >
        上傳檔案測試
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default HomePgae
