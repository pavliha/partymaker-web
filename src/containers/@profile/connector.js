import { connect } from 'react-redux'
import currentUser from 'src/redux/auth/select/user'

const mapStateToProps = state => ({
  user: currentUser(state),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)
