import React, { Component } from 'react'
import { object, func, bool } from 'prop-types'
import { Drawer, withStyles } from '@material-ui/core'
import { EntertainmentsLoader, SearchField, CloseButton } from 'components'

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    padding: 0,
    boxSizing: 'border-box',
    flexDirection: 'column',
    flex: 1,

  },
  container: {
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '785px',
      padding: 15,
    },
    height: '100%',
    paddingLeft: 25,
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
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    padding: '15px 10px 0 10px',
    boxSizing: 'border-box',
    right: 0,
    left: 0,
    zIndex: 1,
    height: 60,
    marginLeft: 1,
    backgroundColor: 'white',
  },
})

class EntertainmentsDrawer extends Component {

  state = {
    search: null,
  }

  search = (e) =>
    this.setState({ search: e.target.value })

  render() {
    const { classes, isOpen, onClose, onSelect } = this.props
    const { search } = this.state

    return (
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={onClose}
      >
        <section className={classes.container}>
          <div className={classes.searchArea}>
            <CloseButton onClick={onClose} /> <SearchField onChange={this.search} />
          </div>
          <div className={classes.list}>
            <EntertainmentsLoader
              search={search}
              onSelect={onSelect}
            />
          </div>
        </section>
      </Drawer>
    )
  }
}

EntertainmentsDrawer.propTypes = {
  classes: object.isRequired,
  isOpen: bool.isRequired,
  onSelect: func.isRequired,
  onClose: func.isRequired,
}

export default withStyles(styles)(EntertainmentsDrawer)
