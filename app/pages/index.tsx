import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'

type ContainerProps = {}

const Container = (props: ContainerProps) => {
  const [socket, setSocket] = useState(null)
  const [data, setData] = useState('')

  useEffect(() => {
    const client = io()
    client.on('connect', () => {
      console.log('socket connected!!!')
    })
    client.on('update-data', data => {
      console.log('Get Updated Data', data)
      setData(data)
    })
    setSocket(client)
  }, [])

  return <Component {...props} data={data} />
}

type Props = {
  className?: string
  data: any
} & ContainerProps

const Component = (props: Props) => (
  <div>
    {JSON.stringify(props.data)}
  </div>
)

export default Container
