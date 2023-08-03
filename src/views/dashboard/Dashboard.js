import React, { useEffect, useState } from 'react'

import {
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
import { cilCheckCircle, cilXCircle } from '@coreui/icons'

import ModalDatabase from 'src/components/ModalDatabase'
import { FirebaseApp, firebaseConfig } from 'src/firebase/FirebaseApp'
import { getDatabase, onValue, ref } from 'firebase/database'
import { CChart } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

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

      let list_keys = Object.keys(data)

      let list_objetos_procesadores = []

      for (var i = 0; i < list_keys.length; i++) {
        list_objetos_procesadores.push(data[list_keys[i]])
      }

      setProcesadores(list_objetos_procesadores)
    })
  }

  function get_registros() {
    const registros_info = ref(database, 'cantidades_vendidas/')
    onValue(registros_info, (snapshot) => {
      const data = snapshot.val()

      let registros = Object.entries(data)

      let total_vector = 0

      for (var i = 0; i < registros.length; i++) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function calcular_porcentaje(cantidad, total) {
    return (cantidad * 100) / total
  }

  function generarNuevoColor() {
    var simbolos, color
    simbolos = '0123456789ABCDEF'
    color = '#'

    for (var i = 0; i < 6; i++) {
      color = color + simbolos[Math.floor(Math.random() * 16)]
    }

    return color
  }

  return (
    <>
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
                <CCardHeader>Reporte cantidad de computadoras vendidas por años</CCardHeader>
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
                                value={calcular_porcentaje(vector[1], total_vendidos)}
                                className="overflow-visible text-center text-light bg-dark px-3 font-weight-bold"
                              >
                                {calcular_porcentaje(vector[1], total_vendidos).toFixed(1)}
                              </CProgressBar>
                            </CProgress>
                          </div>
                        </div>
                      ))}
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs>
              <CCard className="mb-4">
                <CCardHeader>Datos ventas por Modelos de procesadores</CCardHeader>
                <CCardBody>
                  <h2 className="text-center p-3">Datos ventas por Modelos de procesadores</h2>
                  <br></br>
                  <CRow>
                    <CTable align="middle" className="mb-0 border" hover responsive>
                      <CTableHead color="light">
                        <CTableRow>
                          <CTableHeaderCell className="text-center">nombre</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">nucleos</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">velocidad</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">tamaño</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">porcentaje</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">64bits</CTableHeaderCell>
                          <CTableHeaderCell className="text-center">cantidad</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {procesadores.map((item, index) => (
                          <CTableRow v-for="item in tableItems" key={index}>
                            <CTableDataCell className="text-center">
                              <div>{item.nombre}</div>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              <div>{item.nucleos}</div>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              <div>{item.velocidad}</div>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              <div>{item.tamaño}</div>
                            </CTableDataCell>
                            <CTableDataCell>
                              <div className="clearfix">
                                <div className="float-start">
                                  <strong>{item.porcentaje}%</strong>
                                </div>
                              </div>
                              <CProgress thin color="info" value={item.porcentaje} />
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              {item.acepta64bits ? (
                                <CIcon icon={cilCheckCircle} className="text-success" size="xl" />
                              ) : (
                                <CIcon icon={cilXCircle} className="text-danger" size="xl" />
                              )}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              <div className="small text-font-bold">
                                <strong>{item.cantidad}</strong>
                              </div>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs>
              <CCard>
                <CCardHeader>Grafico porcentaje de ventas por Modelos de procesadores</CCardHeader>
                <CCardBody>
                  <CChart
                    type="doughnut"
                    data={{
                      labels: procesadores.map((procesador) => procesador.nombre),
                      datasets: [
                        {
                          backgroundColor: procesadores.map((procesador) => generarNuevoColor()),
                          data: procesadores.map((procesador) => procesador.porcentaje),
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          labels: {
                            color: getStyle('--cui-body-color'),
                          },
                        },
                      },
                    }}
                  />
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
