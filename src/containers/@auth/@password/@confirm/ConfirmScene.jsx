import React from 'react'
import { object, string, shape } from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, withStyles } from '@material-ui/core'
import { AuthCard, AndDevider } from 'components'
import { connect } from 'src/redux'

const styles = {
  link: {
    margin: 16,
    textAlign: 'center',
  },
}

const ConfirmScene = ({ classes, email }) =>
  <AuthCard
    images="forgot.jpg"
    title={`Спасибо! Проверьте почту ${email}. Мы отправили вам ссылку для сброса пароля.`}
    documentTitle="Подтверждение пароля - Partymaker"
  >
    <AndDevider />
    <div className={classes.link}>
      <Link to="/auth/login"><Button variant="raised" color="primary">Войти</Button></Link>
    </div>
  </AuthCard>

ConfirmScene.propTypes = {
  classes: object.isRequired,
  redux: shape({
    email: string.isRequired,
  })
}

const redux = state => ({
  email: state.auth.email
})

export default withStyles(styles)(connect(redux)(ConfirmScene))
