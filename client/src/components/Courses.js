import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Courses extends Component {
    state = {
        courses: [],
    };

//Retrieve data from API port, redirect to error page if unsuccessful

// Referenced this article for help understanding how to set up fetch request: https://www.smashingmagazine.com/2020/06/rest-api-react-fetch-axios/

    componentDidMount(){
        axios.get('http://localhost:5000/api/courses')
        .then(response => 
            this.setState({
                courses: response.data
            })
        )
        .catch((errors) => {
            console.log(errors);
            this.props.history.push('/error');
        })
    }
//Render list of courses from API
    render() {
            return (
                <div>
                <div className="wrap main--grid">
                    {this.state.courses.map(course => 
                    <Link className="course--module course--link" key={course.id} to={`/courses/${course.id}`}>
                    <h2 className="course--label"> Course </h2>
                    <h3 className="course--title">{course.title} </h3>
                        </Link>
                        )}
                        
                        <Link className="course--module course--add--module" to="/courses/create">
						<h3 className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>Create Course</h3>
					</Link>               
                  </div>
                  </div>
              );
        }
    }
