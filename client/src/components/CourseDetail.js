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
        const authUser = this.props.authenticatedUser;
        return(
            <React.Fragment>
                <div className="actions--bar">
                    <div className="wrap">
                        {
                            ( authUser && course.userId === authUser.id)
                        ?
                        <React.Fragment>
                            <Link className="button" to={`/courses/${course.id}/update`}> Update Course </Link>
                            <Link className="button" to={`/courses/${course.id}/delete`}> Delete Course </Link>
                            <Link className="button" to={"/"}> Back </Link>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Link className="button" to={"/"}> Back </Link>
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
    }
