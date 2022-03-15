import { createContext } from 'react'
import { CountryStore } from './CountryStore'

export const configStore = createContext(new CountryStore())