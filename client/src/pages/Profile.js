import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ImageUploader from '../components/ImageUploader'

class Profile extends Component {

  render() {
    if(this.props.isAuthenticated) {
      return(

        <section className="section is-small">
        <section className="hero">
          <div className="hero-body">
            <div className="columns">
              <div className="form-titles">
                <h1 className="title">Hello {this.props.user.name}</h1>
              </div>
            </div>
            <div className="columns">
              <div className="column is-one-third">
                <br />
                <img src={this.props.user.avatar} alt="avatar"/>
                <ImageUploader user={this.props.user.email}/>
              </div>
            </div>
          </div>
        </section>
      </section>


        // <div>
        //   <div>
        //     <img src={this.props.user.avatar} alt="avatar"/>
        //     <h1>{this.props.user.name}</h1>
        //   </div>
        //   <div>
        //     <ImageUploader user={this.props.user.email}/>
        //   </div>
        // </div>
      )
    } else {
    return(
      <Redirect to="/login" />
    )
  }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps)(Profile)