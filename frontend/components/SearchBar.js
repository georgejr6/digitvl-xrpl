import React from "react";
import Router from "next/router";
// import {SearchOutlined} from "@ant-design/icons"
class SearchBar extends React.Component{
    state = {searchTerm:""}
    searchClick = () => {
        if (this.state.searchTerm) {
            Router.push(`/search/${this.state.searchTerm}`)
        }
    }
    handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (this.state.searchTerm) {
                Router.push(`/search/${this.state.searchTerm}`)
            }
        }
    }
    render() {
        const handleChange = (e) => {
            const isCheckbox = e.target.type === "checkbox";
            this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
        }
        return (
            <div className="custom-nav-search-bar">
                <div className="input-group mb-3">
                    {/*<i className="fas fa-search my-auto ml-5"/>*/}
                    <input type="text" className="custom-nav-search custom-tweet-inputtext" placeholder="What are you looking for..." aria-label="Username"
                           aria-describedby="basic-addon1" onKeyDown={this.handleKeyDown}
                           name="searchTerm" value={this.state.searchTerm} onChange={handleChange}/>
                </div>
            </div>
        );
    }
}

export default SearchBar;