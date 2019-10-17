import React, { Component } from 'react'
import { object, func, string } from 'prop-types'
import { withStyles, IconButton, InputBase, Divider, Paper, Typography, ClickAwayListener } from '@material-ui/core'
import SearchIcon from 'mdi-react/SearchIcon'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    height: 60,
    paddingRight: 5,
  },
  input: {
    backgroundColor: 'transparent',
    marginLeft: theme.spacing(1),
    flex: 1,
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    }
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },

  title: {
    fontFamily: 'Google Sans',
    color: theme.palette.primary.main,
  },

  city: {
    fontFamily: 'Google Sans',
    fontWeight: '100',
    paddingLeft: '15px',
  },

  logo: {
    cursor: 'pointer',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    margin: '0 15px',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },

  inputFocused: {
    display: 'block',
  },

  logoFocused: {
    display: 'none'
  }
})

class SearchField extends Component {

  input = React.createRef()

  state = {
    isFocused: false,
  }

  focus = () => {
    this.setState({ isFocused: true })
    this.input.current.focus()
  }

  blur = () =>
    this.setState({ isFocused: false })

  render() {
    const { classes, className, onChange } = this.props
    const { isFocused } = this.state

    const inputStyle = classNames({ [classes.input]: true, [classes.inputFocused]: isFocused })
    const logoStyle = classNames({ [classes.logo]: true, [classes.logoFocused]: isFocused })

    return (
      <ClickAwayListener onClickAway={this.blur}>
        <Paper className={classNames([classes.root, className])} onClick={this.focus}>
          <InputBase
            ref={this.input}
            className={inputStyle}
            placeholder="Искать развлечения"
            inputProps={{ 'aria-label': 'Искать развлечения' }}
            onChange={onChange}
            onBlur={this.blur}
          />
          <div className={logoStyle}>
            <Typography className={classes.title} variant="h6" color="inherit">
              Partymaker
            </Typography>
            <Typography className={classes.city}>Запорожье</Typography>
          </div>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton color="primary" className={classes.iconButton} aria-label="directions">
            <SearchIcon />
          </IconButton>
        </Paper>
      </ClickAwayListener>
    )
  }
}

SearchField.propTypes = {
  classes: object.isRequired,
  className: string,
  onChange: func,
}

export default withStyles(styles)(SearchField)
