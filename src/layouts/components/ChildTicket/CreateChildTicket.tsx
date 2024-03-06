import { FormControl, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { Department, DepartmentValues } from 'src/shared/enums/Department.enum'
import ChildLocalSeoFormComponent from '../childTicketsFormMain/lsf'
import ChildPaidMarketingFormComponent from '../childTicketsFormMain/pm'
import ChildSocialMediaFormComponent from '../childTicketsFormMain/smr'
import ChildWordPressFormComponent from '../childTicketsFormMain/wd'
import ChildWebSeoFormComponent from '../childTicketsFormMain/ws'
import ChildWriterFormComponent from '../childTicketsFormMain/wt'

// function CreateChildTicket({ setShow }: any) {

function CreateChildTicket() {
  const [value, setValue] = useState('')

  return (
    <>
      {/* <Typography>Select Department</Typography> */}

      <FormControl>
        <Select
          size='small'
          sx={{ fontSize: '14px', mb: 10 }}
          onChange={e => {
            setValue(e.target.value)
          }}
          value={value}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value=''>Select Department</MenuItem>
          {DepartmentValues.map((e: any) => {
            if (e === Department.Admin || e === Department.Sales) return

            return (
              <MenuItem key={e} value={e}>
                {e}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>

      {value === Department.LocalSeo && <ChildLocalSeoFormComponent />}
      {value === Department.PaidMarketing && <ChildPaidMarketingFormComponent />}
      {value === Department.SocialMedia && <ChildSocialMediaFormComponent />}
      {value === Department.WordPress && <ChildWordPressFormComponent />}
      {value === Department.WebSeo && <ChildWebSeoFormComponent />}
      {value === Department.Writer && <ChildWriterFormComponent />}
    </>
  )
}

export default CreateChildTicket
