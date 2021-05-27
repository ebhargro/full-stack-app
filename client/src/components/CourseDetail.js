import React, {Component} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {
    state = {
        course: {},
        user: {}
    };

    componentDidMount(){
        Axios.get(`http://localhost:5000/api/courses/${this.props.id}`)
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
        return(
            <React.Fragment>
                <div className="actions--bar">
                    <div className="wrap">
                        
                    </div>


                </div>
            </React.Fragment>
        )
    }

    }
