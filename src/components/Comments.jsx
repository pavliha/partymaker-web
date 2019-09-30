import React, { Component } from 'react'
import { object, func, arrayOf } from 'prop-types'
import { List, Typography, withStyles } from '@material-ui/core'
import { ChatBody, CommentForm, CommentListItem } from 'components'
import { commentShape, userShape } from 'shapes'

const styles = {
  root: {
    fontFamily: 'Google Sans',
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column'
  },

  commentsTitle: {
    fontFamily: 'Google Sans',
    padding: '0 20px',
  },
  chatBody: {
    background: 'transparent'
  },

  authCaption: {
    marginLeft: 15,
    marginBottom: 15,
  }
}

class Comments extends Component {

  chatBody = React.createRef()

  comment = async (form) => {
    const { onComment } = this.props
    const action = await onComment(form)
    this.scrollBottom()
    return action
  }

  scrollBottom = () =>
    this.chatBody.current.scrollToBottom()

  render() {
    const { classes, comments, user } = this.props
    return (
      <div className={classes.root}>
        <Typography variant="subtitle1" className={classes.commentsTitle}>
          Комментарии
        </Typography>
        <ChatBody className={classes.chatBody} ref={this.chatBody}>
          <List>
            {comments.map(comment => <CommentListItem key={comment.id} comment={comment} />)}
          </List>
        </ChatBody>
        {user
          ? <CommentForm onSubmit={this.comment} />
          : (
            <Typography
              className={classes.authCaption}
              gutterBottom
              color="textSecondary"
              variant="caption">
              Войте в аккаунт что бы оставить комментарий
            </Typography>
          )
        }
      </div>
    )
  }
}

Comments.propTypes = {
  classes: object.isRequired,
  user: userShape,
  comments: arrayOf(commentShape),
  onComment: func,
}

export default withStyles(styles)(Comments)
