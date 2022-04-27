import { required, email, minLength } from '../validators'

export const Example = {
  name: { required, minLength: minLength(10) },
  email: { required, email }
}
