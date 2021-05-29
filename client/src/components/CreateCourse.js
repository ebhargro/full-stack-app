import React, {Component} from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
      }
    
      render() {
        const {
          title,
          description,
          estimatedTime,
          materialsNeeded,
          errors
        } = this.state;

        const {context} = this.props;
        const authUser = context.authenticatedUser;
    
        return (
          <div className="wrap">
              <h1>Create A Course</h1>
              <Form 
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Create Course"
                elements={() => (
                  <React.Fragment>
                  <label> Course Title
                    <input 
                      id="title" 
                      name="title" 
                      type="text"
                      value={title} 
                      onChange={this.change} 
                      placeholder="Title" />
                      </label>
                      <p> By {authUser.firstName} {authUser.lastName} </p>
                    <label> Description 
                    <textarea 
                      id="description" 
                      name="description"
                      type="text"
                      value={description} 
                      onChange={this.change} 
                      placeholder="Description" />    
                      </label>
                      <label> Estimated Time 
                    <input 
                      id="estimatedTime" 
                      name="estimatedTime"
                      type="text"
                      value={estimatedTime} 
                      onChange={this.change} 
                      placeholder="Estimated Time" />    
                      </label>
                      <label> Materials Needed 
                    <textarea 
                      id="materialsNeeded" 
                      name="materialsNeeded"
                      type="text"
                      value={materialsNeeded} 
                      onChange={this.change} 
                      placeholder="Materials Needed" />    
                      </label>                  
                  </React.Fragment>
                )} />
            </div>
        );
      }
    
      change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
      }
    
      submit = () => {
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const authUser = context.authenticatedUser;
        const userId = authUser.userId;
        const { title, description, estimatedTime, materialsNeeded, } = this.state;
        const course = { title, description, estimatedTime, materialsNeeded, userId };
    
        console.log(authUser);

        context.data.createCourse(course, authUser.emailAddress, authUser.password)
          .then((user) => {
            console.log(user);
            if (user.length) {
              this.setState({ errors: user });
            } else {
              this.props.history.push(from);
              console.log(`Hooray! Course created.`)
            }
          })
          .catch((error) => {
            console.error(error);
            this.props.history.push('/error');
          });
      }
    
      cancel = () => {
        this.props.history.push('/');
      }
    }