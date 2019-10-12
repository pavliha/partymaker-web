import React, { Component } from 'react'
import { object, func, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { EntertainmentsLoader, EntertainmentsSearch, AppBottomNavigation } from 'components'
import Header from 'components/headers/Header'
import Logo from 'components/zzz/Logo'
import AccountDropdown from 'components/navigation/AccountDropdown'

const styles = theme => ({

  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%'
  },

  container: {
    height: 'calc(100% - 64px)',
    display: 'flex',
  },

  searchArea: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 20,
    paddingBottom: 15,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 30,
      paddingBottom: 30,
    }
  },

  list: {
    margin: '0 auto'
  },

  listLoader: {
    overflow: 'auto',
  },
})

class EntertainmentsScene extends Component {

  state = {
    search: null,
  }

  selectPlace = place => {
    const { history } = this.props
    history.push(`/places/${place.id}`)
  }

  search = (e) =>
    this.setState({ search: e.target.value })

  render() {
    const { classes } = this.props
    const { search } = this.state

    return (
      <section className={classes.root}>
        <Header>
          <Logo />
          <EntertainmentsSearch onChange={this.search} />
          <AccountDropdown />
        </Header>
        <div className={classes.container}>
          <div className={classes.list}>
            <div className={classes.listLoader}>
              <EntertainmentsLoader
                search={search}
                filter={this.filter}
                onLoad={this.handleLoad}
                onSelect={this.selectPlace}
              />
            </div>
          </div>
        </div>
        <AppBottomNavigation />
      </section>
    )
  }
}

EntertainmentsScene.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func }),
}

export default withStyles(styles)(EntertainmentsScene)
