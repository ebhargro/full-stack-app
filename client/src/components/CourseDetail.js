import React, {Component} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {
    state = {
        course: {},
        user: {}
    };
//Using Axios to get course data and user data
    componentDidMount(){
        Axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then(response => {
            this.setState({
                course: response.data,
                user: response.data.User
            })
            
        })
        .catch(errors => {
            console.log('Course ID not found', errors);
            this.props.history.push('/notfound');
        })
    }
    render() {
        const {course, user} = this.state;
        //If the user is the owner of the course, allow access
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        return(
            <React.Fragment>
                <div className="actions--bar">
                    <div className="wrap">
                        {
                            //if the user is authorized, display "Update", "Delete", and "Back" buttons
                            (authUser)
                        ?
                        <React.Fragment>
                            <Link className="button" to={`/courses/${course.id}/update`}> Update Course </Link>
                            <Link className="button" to="/" onClick={() => this.deleteCourse()}> Delete Course </Link>
                            <Link className="button" to="/"> Back </Link>
                        </React.Fragment>
                        // if user is not authorized, display only "Back" button
                        :
                        <React.Fragment>
                            <Link className="button" to="/"> Back </Link>
                        </React.Fragment>
                        }
                    </div>
                </div>
                <div>
                    <h2> Course Detail </h2>
                    <div>
                        <h3>Course</h3>
                        <h1>{course.title}</h1>
                        <p> By {user.firstName} {user.lastName} </p>
                        <ReactMarkdown children={course.description}/>
                        <p> Estimated Time </p>
                        {
                            (course.estimatedTime === null || course.estimatedTime === '')
                        ?
                        <p> N/A </p>
                        :
                        <p> {course.estimatedTime} </p>
                        }
                        <p> Materials Needed </p>
                        {
                            (course.materialsNeeded === null || course.materialsNeeded === '')
                        ?
                        <p> N/A </p>
                        :
                        <ReactMarkdown children={course.materialsNeeded}/>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
    deleteCourse = () => {
        const {context} = this.props;
        const authUser = context.authenticatedUser;
        const id = this.props.match.params.id;
        context.data.deleteCourse(id, authUser.emailAddress, authUser.password)
        .then(errors => {
            if(errors){
                this.setState({errors})
            } else {
                console.log('Hooray! Course deleted.');
                this.props.history.push('/');
            }
        })
        .catch(error => {
            console.log(error);
            this.props.history.push('/error');
        })
    }


    }
