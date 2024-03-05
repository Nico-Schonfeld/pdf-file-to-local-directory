import React from 'react'
import UploadForm from './page.client'
import db from '../../db/db'

const AppHome = async () => {
const brochure = await db.brochure.findMany({})


  return (
    <UploadForm brochure={brochure}  />
  )
}

export default AppHome