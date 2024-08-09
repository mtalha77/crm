import { createContext, useEffect, useState, ReactNode } from 'react'
import socketio, { Socket } from 'socket.io-client'

// ** Config
import authConfig from 'src/configs/auth'

// Get socket instance
const getSocket = () => {
  return socketio(process.env.NEXT_PUBLIC_SOCKET_URL!, {
    extraHeaders: {
      Authorization: window.localStorage.getItem(authConfig.storageTokenKeyName) || ''
    }
  })
}

// Socket context type
interface SocketContextType {
  socket: Socket | null
}

// Socket context
const socketContext = createContext<SocketContextType>({ socket: null })

// Socket provider
export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const socketInstance = getSocket()
    setSocket(socketInstance)

    // Clean up the socket connection on component unmount
    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return <socketContext.Provider value={{ socket }}>{children}</socketContext.Provider>
}

export default socketContext
