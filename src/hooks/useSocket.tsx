import { useContext } from 'react'
import socketContext from 'src/context/socketContext'

export const useSocket = () => useContext(socketContext)
