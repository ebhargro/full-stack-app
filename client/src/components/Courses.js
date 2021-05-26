import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class Courses extends Component {
    state = {
        courses: [],
    };

    componentDidMount(){
        Axios.get('http://localhost:5000/api/courses')
        .then(response => {
            this.setState({
                courses: response.data
            })
        })
        .catch(errors => {
            console.log('Error fetching data from API', errors);
            this.props.history.push('/error');
        })
    }

    render() {
            return (
                <div>
                <h1>View All Courses</h1>
                {this.state.courses.map(course => 
                <Link key={course.id} to={`/courses/${course.id}`}>
                <h2> {course.title} </h2>
                    </Link>
                )}
                  </div>
              );
        }
    }
