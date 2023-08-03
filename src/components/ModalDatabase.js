/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import {firebaseConfig} from 'src/firebase/FirebaseApp'

function obtener_array(object) {
    let array_pares = []
    for (let key in object){
        array_pares.push(`${key} : ${object[key]}`)
    }
    return array_pares
}


const ModalDatabase = () => {
  const [visible, setVisible] = useState(true)

  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Database connection</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {obtener_array(firebaseConfig).map(((obj) => <p key={obj}>{obj}</p>))}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalDatabase
