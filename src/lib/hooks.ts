import { useDispatch, useSelector, useStore } from 'react-redux'
import type RootState from '../redux/store'
import type AppDispatch from '../redux/store'
import type { AppStore } from '../redux/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()