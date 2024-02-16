// ** React Imports
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import { CardHeader, CircularProgress, MenuItem, Select } from '@mui/material'
import Repeater from 'src/@core/components/repeater'
import { Department, DepartmentValues } from 'src/shared/enums/Department.enum'
import { UserRole, UserRoleValues } from 'src/shared/enums/UserRole.enum'
import axios from 'axios'

interface State {
  password: string
  showPassword: boolean
  user_name: string
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginV1 = () => {
  // ** State
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
    user_name: ''
  })
  const [selectedDepartment, setSelectedDepartment] = useState<string>('')
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [departments, setDepartments] = useState<[]>([])
  // ** Hook
  const theme = useTheme()
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const { data } = await axios.get('/api/department/get-all', {
          headers: {
            authorization: localStorage.getItem('token')
          }
        })
        setDepartments(data.payload.departments)
      } catch (error) {
        console.log(error)
      }
    }
    getDepartments()
  }, [])

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post('/api/user/create', {
        user_name: values.user_name,
        password: values.password,
        role: selectedRole,
        // department_id : departments.,
        department_name: selectedDepartment
      })
    } catch (error) {}
  }
  return (
    <Card>
      <CardHeader title='Create New User' />
      <CardContent sx={{ minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <TextField
            autoFocus
            fullWidth
            id='user_name'
            label='Username'
            sx={{ mb: 4 }}
            onChange={handleChange('user_name')}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
            <OutlinedInput
              label='Password'
              value={values.password}
              id='auth-login-password'
              onChange={handleChange('password')}
              type={values.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={e => e.preventDefault()}
                    aria-label='toggle password visibility'
                  >
                    <Icon icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 5 }}>
            <InputLabel id='form-layouts-separator-multiple-select-label'>Department</InputLabel>
            <Select
              value={selectedDepartment}
              onChange={e => setSelectedDepartment(e.target.value)}
              labelId='form-layouts-separator-multiple-select-label'
              input={<OutlinedInput label='Department' />}
            >
              {departments.map(d => {
                return (
                  <MenuItem key={d.name} value={d.name}>
                    {d.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 5 }}>
            <InputLabel id='form-layouts-separator-multiple-select-label'>Role</InputLabel>
            <Select
              value={selectedRole}
              disabled={selectedDepartment ? false : true}
              onChange={e => setSelectedRole(e.target.value)}
              labelId='form-layouts-separator-multiple-select-label'
              input={<OutlinedInput label='Role' />}
            >
              {UserRoleValues.map(d => {
                if (selectedDepartment === Department.Sales) if (!(d === UserRole.SALE_EMPLOYEE)) return

                if (selectedDepartment !== Department.Sales) if (d === UserRole.SALE_EMPLOYEE) return
                return (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7, mt: 10 }} disabled={loading}>
            {loading ? (
              <CircularProgress
                sx={{
                  color: 'common.white',
                  width: '20px !important',
                  height: '20px !important',
                  mr: theme => theme.spacing(2)
                }}
              />
            ) : null}
            Create new user
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginV1
