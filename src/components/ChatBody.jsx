/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react'
import { object, node, func, string } from 'prop-types'
import { withStyles } from '@material-ui/core'
import background from 'assets/images/chat-background.jpg'
import classNames from 'classnames'

const styles = {
  root: {
    flexGrow: 1,
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '15px 0',
    position: 'relative',
    background: `url(${background})`,
  },
}

class ChatBody extends Component {

  chatBody = React.createRef()

  componentDidMount() {
    const chatBody = this.chatBody.current
    chatBody.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    const chatBody = this.chatBody.current
    chatBody.removeEventListener('scroll', this.handleScroll)
  }

  forceScrollToBottom = () => {
    const { onForceScrollBottom } = this.props
    const chatBody = this.chatBody.current
    chatBody.scrollTop = chatBody.scrollHeight
    onForceScrollBottom()
  }

  scrollToBottom = () => {
    const { onScrollBottom } = this.props
    const chatBody = this.chatBody.current
    const scrollPosition = chatBody.scrollHeight - chatBody.scrollTop

    if (scrollPosition < 2000) {
      chatBody.scrollTop = chatBody.scrollHeight
    }

    onScrollBottom()
  }

  handleScroll = (e) => {
    requestAnimationFrame(async () => {
      const scrollY = e.target.scrollTop
      const isScrollingTop = this.oldScroll > scrollY
      if (isScrollingTop && e.target.scrollTop <= 70) {
        await this.handleScrolledTop(e)
      }
      this.oldScroll = scrollY
    })
  }

  handleScrolledTop = async (e) => {
    const { onScrollTop } = this.props
    const oldScrollHeight = e.target.scrollHeight
    await onScrollTop()
    this.jumpToOriginalPosition(oldScrollHeight)
  }

  jumpToOriginalPosition = (oldScrollHeight) => {
    const element = this.chatBody.current
    const { scrollTop, scrollHeight } = element
    element.scrollTop = scrollHeight - oldScrollHeight + scrollTop
  }

  render() {
    const { classes, children, className } = this.props

    return (
      <div ref={this.chatBody} className={classNames([classes.root, className])}>
        {children}
      </div>
    )
  }
}

ChatBody.propTypes = {
  classes: object.isRequired,
  className: string,
  children: node.isRequired,
  onScrollTop: func,
  onScrollBottom: func,
  onForceScrollBottom: func,
}

ChatBody.defaultProps = {
  onScrollTop: () => {},
  onScrollBottom: () => {},
  onForceScrollBottom: () => {},
}

export default withStyles(styles)(ChatBody)
