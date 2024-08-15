import React, { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button
} from '@mui/material'
import axios from 'axios'
import toast from 'react-hot-toast'
import FallbackSpinner from 'src/@core/components/spinner'
import BusinessTicketsTable from './tables/businessTicketsTable'
import MuiTable from 'src/layouts/components/tables/MuiTable'
import ViewDomainFormDialog from 'src/layouts/components/dialogs/ViewDomainFormDialog'
import ViewHostingFormDialog from './dialogs/ViewHostingFormDialog'
import DomainColumns from './DomainColumns'
import HostingColumns from './HostingColumns'
import UpdateHostingForm from './UpdateHostingForm'
import UpdateDomainForm from './UpdateDomainForm' // Ensure correct import path

const BoldText = ({ children }) => (
  <Typography variant='subtitle1' sx={{ fontWeight: 'bold', display: 'inline' }}>
    {children}
  </Typography>
)

const ViewFullBusinessDetails = ({ id }) => {
  const [apiLoading, setApiLoading] = useState(true)
  const [data, setData] = useState({})
  const [domains, setDomains] = useState([])
  const [hostings, setHostings] = useState([])
  const [selectedDomainId, setSelectedDomainId] = useState(null)
  const [selectedHostingId, setSelectedHostingId] = useState(null)
  const [domainDialogOpen, setDomainDialogOpen] = useState(false)
  const [hostingDialogOpen, setHostingDialogOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const fetchBusiness = async () => {
    try {
      const businessResponse = await axios.get(`/api/business/${id}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      setData(businessResponse.data.payload.business)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data)
    }
  }

  const fetchDomains = async () => {
    try {
      const domainsResponse = await axios.get(`/api/domain-forms/get-domain-by-business?businessId=${id}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      const fetchedDomains = domainsResponse.data.payload.domainForms
      setDomains(fetchedDomains)
      if (fetchedDomains.length === 0) {
        fetchHostings() // Fetch hostings only if domains are empty
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data)
    }
  }

  const fetchHostings = async () => {
    try {
      const hostingsResponse = await axios.get(`/api/hosting-forms/get-hosting-by-business?businessId=${id}`, {
        headers: { authorization: localStorage.getItem('token') }
      })
      const fetchedHostings = hostingsResponse.data.payload.hostingForms
      setHostings(fetchedHostings)
      if (fetchedHostings.length === 0) {
        fetchDomains() // Fetch domains only if hostings are empty
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data)
    }
  }

  const handleDelete = async () => {
    try {
      if (deleteTarget === 'domain') {
        await axios.delete(`/api/domain-forms/delete?_id=${selectedDomainId}`, {
          headers: { authorization: localStorage.getItem('token') }
        })
        setDomains(prevDomains => prevDomains.filter(domain => domain._id !== selectedDomainId))
        toast.success('Domain deleted successfully')
      } else if (deleteTarget === 'hosting') {
        await axios.delete(`/api/hosting-forms/delete?_id=${selectedHostingId}`, {
          headers: { authorization: localStorage.getItem('token') }
        })
        setHostings(prevHostings => prevHostings.filter(hosting => hosting._id !== selectedHostingId))
        toast.success('Hosting deleted successfully')
      }
    } catch (error) {
      console.error('Error deleting:', error)
      toast.error('Failed to delete')
    } finally {
      setDeleteDialogOpen(false)
      setSelectedDomainId(null)
      setSelectedHostingId(null)
      setDeleteTarget(null)
    }
  }

  const handleUpdateHostingForm = (updatedHosting: any) => {
    setHostings(prevHostings =>
      prevHostings.map(hosting => (hosting._id === updatedHosting._id ? updatedHosting : hosting))
    )
    toast.success('Hosting updated successfully')
  }

  const handleUpdateDomainForm = (updatedDomain: any) => {
    setDomains(prevDomains => prevDomains.map(domain => (domain._id === updatedDomain._id ? updatedDomain : domain)))
    toast.success('Domain updated successfully')
  }

  useEffect(() => {
    setApiLoading(true)
    fetchBusiness()
    fetchDomains()
    fetchHostings()
    setApiLoading(false)
  }, [id])

  if (apiLoading) {
    return (
      <>
        <FallbackSpinner showIcon={true} />
      </>
    )
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <BoldText>Status:</BoldText> {data?.status}
        </Grid>
        <Grid item xs={6}>
          <BoldText>Name:</BoldText> {data?.business_name}
        </Grid>
        <Grid item xs={6}>
          <BoldText>Email:</BoldText> {data?.business_email}
        </Grid>
        <Grid item xs={6}>
          <BoldText>Number:</BoldText> {data?.business_number}
        </Grid>
        <Grid item xs={6}>
          <BoldText>Hours:</BoldText> {data?.business_hours}
        </Grid>
        <Grid item xs={6}>
          <BoldText>Client Name:</BoldText> {data?.client_name}
        </Grid>
        <Grid item xs={6}>
          <BoldText>Country:</BoldText> {data?.country}
        </Grid>
        <Grid item xs={6}>
          <BoldText>State:</BoldText> {data?.state}
        </Grid>
        <Grid item xs={6}>
          <BoldText>Street:</BoldText> {data?.street}
        </Grid>
        <Grid item xs={6}>
          <BoldText>ZipCode:</BoldText> {data?.zip_code}
        </Grid>
        <Grid item xs={6}>
          <BoldText>Website Url:</BoldText> {data?.website_url}
        </Grid>
        <Grid item xs={6}>
          <BoldText>Social Profile:</BoldText> {data?.social_profile}
        </Grid>
        <Grid item xs={6} mb={10}>
          <BoldText>Gmb Url:</BoldText> {data?.gmb_url}
        </Grid>
      </Grid>
      <BusinessTicketsTable businessIdProps={id} />
      {domains.length > 0 && (
        <>
          <Typography variant='h5' sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
            Domains
          </Typography>
          <MuiTable
            columns={DomainColumns({ setSelectedDomainId, setDomainDialogOpen, setDeleteDialogOpen, setDeleteTarget })}
            data={domains}
          />
        </>
      )}
      {hostings.length > 0 && (
        <>
          <Typography variant='h5' sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
            Hostings
          </Typography>
          <MuiTable
            columns={HostingColumns({
              setSelectedHostingId,
              setHostingDialogOpen,
              setDeleteDialogOpen,
              setDeleteTarget
            })}
            data={hostings}
          />
        </>
      )}
      {selectedDomainId && (
        <ViewDomainFormDialog
          _id={selectedDomainId}
          open={domainDialogOpen}
          onClose={() => setDomainDialogOpen(false)}
        />
      )}
      {selectedHostingId && (
        <ViewHostingFormDialog
          _id={selectedHostingId}
          open={hostingDialogOpen}
          onClose={() => setHostingDialogOpen(false)}
        />
      )}
      {selectedDomainId && (
        <UpdateDomainForm
          updatedDomain={domains.find(domain => domain._id === selectedDomainId)}
          handleUpdateDomainForm={handleUpdateDomainForm}
          setShow={() => setDomainDialogOpen(false)}
        />
      )}

      {selectedHostingId && (
        <UpdateHostingForm
          updatedHosting={hostings.find(hosting => hosting._id === selectedHostingId)}
          handleUpdateHostingForm={handleUpdateHostingForm}
          setShow={() => setHostingDialogOpen(false)}
        />
      )}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {`Delete ${deleteTarget === 'domain' ? 'Domain' : 'Hosting'}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this {deleteTarget === 'domain' ? 'domain' : 'hosting'}? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='primary' autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ViewFullBusinessDetails
