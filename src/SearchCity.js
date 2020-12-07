import React from 'react';
import PropTypes from 'prop-types';
import Search from './DegreeToggle';

const SearchCity = ({submit, value, change, showResult}) =>{
    return (
        <form showResult= {showResult} onSubmit= {submit}>
        <input type= 'text' value = {value} placeholder="enter zipcode" onChange = {change} />
        </form>
    )
}
//PropTypes exports a range of validators that can be used to make sure the data you receive is valid.
//When an invalid value is provided for a prop, a warning will be shown in the JavaScript console.
SearchCity.propTypes = {
    submit: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired,
    showResult: PropTypes.bool.isRequired
};

export default SearchCity;