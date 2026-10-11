import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToId } from './scrollTo'

export function useGo() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (target) => {
    if (target.startsWith('/')) {
      if (target !== pathname) navigate(target)
      else scrollToId('top')
      return
    }
    if (target === 'top') {
      if (pathname === '/') scrollToId('top')
      else navigate('/')
      return
    }
    if (document.getElementById(target)) scrollToId(target)
    else navigate('/', { state: { scrollTo: target } })
  }
}
