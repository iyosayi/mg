import {editUser} from '../use-cases'
import {PatchController} from '../../http/Patch'

const patchMethod = new PatchController(editUser)