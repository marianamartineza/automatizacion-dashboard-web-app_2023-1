import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CProgressBar,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilPeople,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import ModalDatabase from 'src/components/ModalDatabase'
import { FirebaseApp, firebaseConfig } from 'src/firebase/FirebaseApp'
import { getDatabase, onValue, ref } from 'firebase/database'

let total_vendidos = 0

const Dashboard = () => {
  const [ModalVisible, setModalVisible] = useState(true)
  const [Loading, setLoading] = useState(true)
  const [reports, setReports] = useState({})
  const [procesadores, setProcesadores] = useState({})

  const database = getDatabase(FirebaseApp)

  function get_procesadores_info() {
    const procesadores_info = ref(database, 'procesadores/')
    onValue(procesadores_info, (snapshot) => {
      const data = snapshot.val()
      setProcesadores(data)
    })
  }

  function get_registros() {
    const registros_info = ref(database, 'cantidades_vendidas/')
    onValue(registros_info, (snapshot) => {
      const data = snapshot.val()

      let registros = Object.entries(data)

      let total_vector = 0

      for (var i = 0; i < registros.length; i++) {
        console.log(registros[i])
        let vector = registros[i]
        total_vector += vector[1]
      }

      setReports(registros)
      setLoading(false)

      total_vendidos = total_vector
    })
  }

  function load_data() {
    get_procesadores_info()
    get_registros()
  }

  useEffect(() => {
    load_data()
  }, [])

  function calcular_porcentaje(cantidad, total) {
    return (cantidad * 100) / total
  }

  console.log(procesadores)

  const tableExample = [
    {
      avatar: { src: avatar1, status: 'success' },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'USA', flag: cifUs },
      usage: {
        value: 50,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      activity: '10 sec ago',
    },
    {
      avatar: { src: avatar2, status: 'danger' },
      user: {
        name: 'Avram Tarasios',
        new: false,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Brazil', flag: cifBr },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'info',
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      activity: '5 minutes ago',
    },
    {
      avatar: { src: avatar3, status: 'warning' },
      user: { name: 'Quintin Ed', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'India', flag: cifIn },
      usage: {
        value: 74,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'warning',
      },
      payment: { name: 'Stripe', icon: cibCcStripe },
      activity: '1 hour ago',
    },
    {
      avatar: { src: avatar4, status: 'secondary' },
      user: { name: 'Enéas Kwadwo', new: true, registered: 'Jan 1, 2021' },
      country: { name: 'France', flag: cifFr },
      usage: {
        value: 98,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'danger',
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      activity: 'Last month',
    },
    {
      avatar: { src: avatar5, status: 'success' },
      user: {
        name: 'Agapetus Tadeáš',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Spain', flag: cifEs },
      usage: {
        value: 22,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'primary',
      },
      payment: { name: 'Google Wallet', icon: cibCcApplePay },
      activity: 'Last week',
    },
    {
      avatar: { src: avatar6, status: 'danger' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        registered: 'Jan 1, 2021',
      },
      country: { name: 'Poland', flag: cifPl },
      usage: {
        value: 43,
        period: 'Jun 11, 2021 - Jul 10, 2021',
        color: 'success',
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      activity: 'Last week',
    },
  ]

  return (
    <>
      {console.log(ModalVisible)}
      {ModalVisible ? <ModalDatabase></ModalDatabase> : setModalVisible(false)}
      {Loading ? (
        <CSpinner color="primary"></CSpinner>
      ) : (
        <>
          <CRow>
            <h1 className="text-center mb-4">Dashboard automatizacion firebase web app</h1>
          </CRow>
          <CRow>
            <CCol xs>
              <CCard className="mb-4">
                <CCardHeader>Database Firebase</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol>
                      <CRow>
                        <CCol>
                          <div className="border-start border-start-4 border-start-info py-1 px-3">
                            <div className="text-medium-emphasis small">projectId</div>
                            <div className="fs-5 fw-semibold">{firebaseConfig.projectId}</div>
                          </div>
                        </CCol>
                        <CCol>
                          <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                            <div className="text-medium-emphasis small">Database URL</div>
                            <div className="fs-5 fw-semibold">{firebaseConfig.databaseURL}</div>
                          </div>
                        </CCol>
                      </CRow>
                      <hr className="mt-0" />
                      <h2 className="text-center p-3">
                        Reporte cantidad de computadoras vendidas por años
                      </h2>
                      <br></br>
                      {reports.map((vector) => (
                        <div className="progress-group mb-4" key={vector[0]}>
                          <div className="progress-group-prepend">
                            <span className="font-weight-bold">{vector[0]}</span>
                            <br></br>
                            <span className="text-medium-emphasis small">{vector[1]}</span>
                          </div>
                          <div className="progress-group-bars">
                            <CProgress height={20} variant="striped" animated>
                              <CProgressBar
                                color="success"
                                value={calcular_porcentaje(vector[1], total_vendidos)}
                                className="overflow-visible text-dark px-2"
                              >
                                {calcular_porcentaje(vector[1], total_vendidos)}
                              </CProgressBar>
                            </CProgress>
                          </div>
                        </div>
                      ))}
                    </CCol>
                  </CRow>

                  <br />

                  <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell className="text-center">
                          <CIcon icon={cilPeople} />
                        </CTableHeaderCell>
                        <CTableHeaderCell>User</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                        <CTableHeaderCell>Usage</CTableHeaderCell>
                        <CTableHeaderCell className="text-center">Payment Method</CTableHeaderCell>
                        <CTableHeaderCell>Activity</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {tableExample.map((item, index) => (
                        <CTableRow v-for="item in tableItems" key={index}>
                          <CTableDataCell className="text-center">
                            <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{item.user.name}</div>
                            <div className="small text-medium-emphasis">
                              <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                              {item.user.registered}
                            </div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="clearfix">
                              <div className="float-start">
                                <strong>{item.usage.value}%</strong>
                              </div>
                              <div className="float-end">
                                <small className="text-medium-emphasis">{item.usage.period}</small>
                              </div>
                            </div>
                            <CProgress thin color={item.usage.color} value={item.usage.value} />
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <CIcon size="xl" icon={item.payment.icon} />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="small text-medium-emphasis">Last login</div>
                            <strong>{item.activity}</strong>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      )}
    </>
  )
}

export default Dashboard
