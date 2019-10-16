import React, { Component } from 'react'
import { object, func, shape } from 'prop-types'
import { withStyles } from '@material-ui/core'
import { EntertainmentsLoader, AppBottomNavigation, LeftNavigation, SearchField } from 'components'
import { Helmet } from 'react-helmet'

const styles = theme => ({

  root: {
    display: 'flex',
    flexGrow: 1,
    height: '100%'
  },

  container: {
    position: 'relative',
    width: '100%',
    maxWidth: 1050,
    height: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: 300,
      width: 'calc(100% - 330px)',
    },
  },

  list: {
    flex: 1,
    marginTop: 100,
    overflow: 'auto',
    marginBottom: 60,
    [theme.breakpoints.up('md')]: {
      display: 'block',
      marginBottom: 0,
    }
  },

  leftNavigation: {
    position: 'fixed',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },

  searchArea: {
    position: 'fixed',
    padding: '15px 10px 0 10px',
    boxSizing: 'border-box',
    right: 0,
    left: 0,
    zIndex: 1,
    height: 60,
    marginLeft: 1,
    maxWidth: 1050,
    backgroundColor: 'white',
    [theme.breakpoints.up('md')]: {
      left: 300,
      width: 'calc(100% - 330px)',
    }
  },

  bottomNavigation: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  }
})

class EntertainmentsScene extends Component {

  state = {
    search: null,
  }

  search = (e) =>
    this.setState({ search: e.target.value })

  render() {
    const { classes, history } = this.props
    const { search } = this.state

    return (
      <section className={classes.root}>
        <Helmet>
          <title>Поиск мест</title>
        </Helmet>
        <LeftNavigation className={classes.leftNavigation} />
        <section className={classes.container}>
          <div className={classes.searchArea}>
            <SearchField onChange={this.search} />
          </div>
          <div className={classes.list}>
            <EntertainmentsLoader
              search={search}
              onExpand={entertainment => history.push(`/entertainments/${entertainment.id}`)}
              onSelect={place => history.push(`/places/${place.id}`)}
            />
          </div>
        </section>
        <AppBottomNavigation className={classes.bottomNavigation} />
      </section>
    )
  }
}

EntertainmentsScene.propTypes = {
  classes: object.isRequired,
  history: shape({ push: func }),
}

export default withStyles(styles)(EntertainmentsScene)
