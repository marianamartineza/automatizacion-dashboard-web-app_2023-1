import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">&copy; 2023 </span>
      </div>
      <div>
        <span className="ms-1">Dashboard automatizacion web app</span>
      </div>
      <div className="ms-auto">
        <p>Mariana Martinez Araque CI 28.396.879</p>
        <p>Juan Diego Gutierrez CI 27.</p>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
