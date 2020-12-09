import { RequiredParameterError } from './Errors'

export default function requiredParam(param: string)  {
  throw new RequiredParameterError(param)
}
