import React, { Component } from 'react'
import { object, shape, func } from 'prop-types'
import { Button, withStyles } from '@material-ui/core'
import { userShape } from 'shapes'
import { EntertainmentsLoader, AppBottomNavigation, EntertainmentsSearch, AccountDropdown, Header } from 'components'
import Logo from 'components/Logo'
import { select, connect } from 'src/redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const styles = theme => ({
  container: {
    maxWidth: 860,
    margin: '0 auto',
  },

  logo: {
    flex: 1,
    [theme.breakpoints.up('sm')]: {
      flex: 'inherit',
      color: 'white'
    }
  },

  navigation: {
    flex: 1,
    display: 'none',
    marginLeft: 15,
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      marginLeft: 60,
    }
  },

  logoTitle: {
    color: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      color: 'white'
    }
  },

  searchArea: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 20,
    paddingBottom: 15,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 40,
      paddingBottom: 30,
    }
  }
})

class EntertainmentsScene extends Component {

  redirectToRoom = (room) => {
    const { history } = this.props
    history.push(`/rooms/${room.id}`)
  }

  render() {
    const { classes, redux: { user } } = this.props
    return (
      <div>
        <Helmet><title>Partymaker - Поиск развлечений</title></Helmet>
        <Header>
          <Logo classes={{ root: classes.logo, title: classes.logoTitle }} />
          <div className={classes.navigation}>
            {user && (
              <Link to="/profile">
                <Button color="inherit">мои компании</Button>
              </Link>)}
            {user && (
              <Link className={classes.company} to="/rooms">
                <Button color="inherit">найти компанию</Button>
              </Link>
            )}
          </div>
          <AccountDropdown />
        </Header>
        <section className={classes.container}>
          <div className={classes.searchArea}>
            <EntertainmentsSearch />
          </div>
          <div className={classes.list}>
            <EntertainmentsLoader
              onCreated={this.redirectToRoom}
              buttonTitle="Хочу сюда"
            />
          </div>
        </section>
        <AppBottomNavigation />
      </div>
    )
  }
}

EntertainmentsScene.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func }),
  redux: shape({
    user: userShape,
  })
}

const redux = state => ({
  user: select.auth.user(state)
})

export default withStyles(styles)(connect(redux)(EntertainmentsScene))
