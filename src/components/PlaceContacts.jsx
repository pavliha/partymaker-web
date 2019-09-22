import React from 'react'
import { object, string, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { PlaceContact } from 'components'
import GlobeIcon from 'mdi-react/GlobeIcon'
import InstagramIcon from 'mdi-react/InstagramIcon'
import PhoneIcon from 'mdi-react/PhoneIcon'
import MailIcon from 'mdi-react/MailIcon'
import LocationOnIcon from 'mdi-react/LocationOnIcon'

const styles = {
  root: {},
}

const PlaceContacts = ({ classes, contacts }) =>
  <div className={classes.root}>
    {contacts.website_url && (
      <a target="_blank" href={contacts.website_url}>
        <PlaceContact icon={GlobeIcon} label="Website" />
      </a>
    )}
    {contacts.email && (<PlaceContact icon={MailIcon} label={contacts.email} />)}
    {contacts.instagram_url && (
      <a target="_blank" href={contacts.instagram_url}>
        <PlaceContact icon={InstagramIcon} label={contacts.instagram_url} />
      </a>
    )}
    {contacts.phone && <PlaceContact icon={PhoneIcon} label={contacts.phone} />}
    {contacts.address && <PlaceContact icon={LocationOnIcon} label={contacts.address} />}
  </div>

PlaceContacts.propTypes = {
  classes: object.isRequired,
  contacts: shape({
    website_url: string,
    email: string,
    instagram_url: string,
    phone: string,
    address: string,
  })
}

export default withStyles(styles)(PlaceContacts)
