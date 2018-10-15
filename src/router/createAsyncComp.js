import Loadable from 'react-loadable'
import Loading from 'components/Loading'

export const createAsyncComp = compDir => {
  return Loadable({
    loader: () => import(`views/${compDir}`),
    loading: Loading
  })
}
