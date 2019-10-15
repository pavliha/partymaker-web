import React from 'react'
import { object } from 'prop-types'
import { ListItemText, withStyles, ListItem, ListItemAvatar } from '@material-ui/core'
import { UserAvatar } from 'components'
import { commentShape } from 'shapes'

const styles = {
  root: {},
}

const CommentListItem = ({ classes, comment }) =>
  <ListItem disableGutters className={classes.root}>
    <ListItemAvatar>
      <UserAvatar user={comment.user} />
    </ListItemAvatar>
    <ListItemText
      primary={comment.user?.name}
      secondary={comment.text}
    />
  </ListItem>

CommentListItem.propTypes = {
  classes: object.isRequired,
  comment: commentShape,
}

export default withStyles(styles)(CommentListItem)
