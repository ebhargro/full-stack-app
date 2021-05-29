import React, {Component} from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: [],
        user: {},
        id: ''
      };

    componentDidMount(){
      const {context} = this.props;
      const authUser = context.authenticatedUser;
      const id = this.props.match.params.id;

      context.data.getCourse(id)
        .then((course) => {
          console.log(id);
          this.setState({
            title: course.title,
            description: course.description,
            materialsNeeded: course.materialsNeeded,
            estimatedTime: course.estimatedTime,
            user: course.User
          })
          if (authUser.id) {
            this.props.history.push('/notfound');
          }
        })
        .catch(error => {
          this.props.history.push('/error');
          console.log(`Error: unable to retrieve course ${error}.`)
        })
    }
    
    
      render() {
        const {
          title,
          description,
          estimatedTime,
          materialsNeeded,
          user,
          errors,
        } = this.state;

        const {context} = this.props;
        const authUser = context.authenticatedUser;
    
        return (
          <div className="wrap">
              <h1>Update Course</h1>
              <Form 
                cancel={this.cancel}
                errors={errors}
                submit={this.submit}
                submitButtonText="Update Course"
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
                      <p> By {user.firstName} {user.lastName} </p>
                    <label> Description 
                    <input 
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
                    <input 
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
        const authUser = context.authenticatedUser;
        const userId = authUser.userId;
        const { title, description, estimatedTime, materialsNeeded, } = this.state;
        const id = this.props.match.params.id;
        const course = { title, description, estimatedTime, materialsNeeded, userId };
    
        context.data.updateCourse(id, course, authUser.emailAddress, authUser.password)
          .then(errors => {
            console.log(id);
            if (errors) {
              this.setState({errors});
            } else {
              const id = this.props.match.params.id;
              this.props.history.push(`/courses/${id}`);
              console.log('Hooray! Course updated.')
            }
          })
          .catch((error) => {
            console.error(error);
            this.props.history.push('/error');
          });
      }
    
      cancel = () => {
        const id = this.props.match.params.id;
        this.props.history.push(`/courses/${id}`);
      }
    }
