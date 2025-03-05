import React, { useEffect, useState } from 'react'
import Navigation from '../components/sidebar/Navigation'
import { axiosClient2 } from '../api/axios'

const AdminLayout = ({children,name}) => {

  return (
    <div>
      <Navigation name={name} />
      {children}
    </div>
  )
}

export default AdminLayout
