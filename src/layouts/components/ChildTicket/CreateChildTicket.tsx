import { FormControl, MenuItem, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Department, DepartmentValues } from 'src/shared/enums/Department.enum'
import DLocalSeoFormComponent from '../departmentalTicketFormMain/lsf'
import ChildLocalSeoFormComponent from '../childTicketsFormMain/lsf'
import ChildPaidMarketingFormComponent from '../childTicketsFormMain/pm'
import ChildSocialMediaFormComponent from '../childTicketsFormMain/smr'
import ChildWordPressFormComponent from '../childTicketsFormMain/wd'
import ChildWebSeoFormComponent from '../childTicketsFormMain/ws'

function CreateChildTicket({ setShow }: any) {
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
    </>
  )
}

export default CreateChildTicket
