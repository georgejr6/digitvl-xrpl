import React, {Component} from 'react';
import Navbar from "./Navbar";
import Link from "next/link";
import {addDigitvlTreeLinksApi,getDTreeCurrentUserProfileLinks,deleteDTreePublicProfileLinks} from "../actions";
import {connect} from "react-redux";
import {store} from "react-notifications-component";
import {NextSeo} from "next-seo";
class AddDigitvlLinkstree extends Component {
    state = {
        links_array:[],
        user_slug:"something",
        inputFields:[
            {title:"",url:""}
        ]
    }
    componentDidMount() {
        let userSession = localStorage.getItem("userSession")
        userSession = JSON.parse(userSession)
        this.setState({user_slug:userSession.user.username_slug})
        this.props.getDTreeCurrentUserProfileLinks(userSession).then(() => {
            this.setState({links_array:this.props.getCurrentUserDlinksResponse.link_tree_data})
            // console.log(this.props.getCurrentUserDlinksResponse)
        }).catch(err => {

        })
    }
    renderDLinks = () =>{
        const openInNewTab = (url) => {
            const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
            if (newWindow) newWindow.opener = null
        }
        if (this.state.links_array) {
            if (this.state.links_array.length === 0) {
                return (
                    <div className="col-md-12">
                        <h3 className="text-center text-color-white">No Links Added</h3>
                    </div>
                );
            }
            return this.state.links_array.reverse().map(result => {
                return (
                    <div className="col-md-12 col-lg-12 col-sm-12 mt-3">
                        <div className="align-items-center align-content-center justify-content-center text-center">
                            <div className="btn btn-outline-primary w-50" onClick={() => openInNewTab(result.url)}>
                                {result.title}
                            </div>
                            <i className="fas fa-trash-alt text-color-accent pl-3" onClick={() => {
                                let userSession = localStorage.getItem("userSession")
                                userSession = JSON.parse(userSession)
                                this.props.deleteDTreePublicProfileLinks(result.id,userSession).then(()=>{
                                    this.props.getDTreeCurrentUserProfileLinks(userSession).then(() => {
                                        this.setState({links_array:this.props.getCurrentUserDlinksResponse.link_tree_data})
                                        // console.log(this.props.getCurrentUserDlinksResponse)
                                    }).catch(err => {

                                    })
                                }).catch(err => {

                                })
                            }}/>
                        </div>
                    </div>
                )
            })
        }
    }
    render() {
        const handleSubmit = (e) => {
            e.preventDefault();
            let userSession = localStorage.getItem("userSession")
            userSession = JSON.parse(userSession)
            const bodyFormData = new FormData();
            // bodyFormData.append("data",this.state.inputFields)
            const data = {data: this.state.inputFields}
            this.props.addDigitvlTreeLinksApi(data,userSession).then(() => {
                notify()
                this.setState({inputFields:[
                        {title:"",url:""}
                    ]})
                this.props.getDTreeCurrentUserProfileLinks(userSession).then(() => {
                    this.setState({links_array:this.props.getCurrentUserDlinksResponse.link_tree_data})
                    // console.log(this.props.getCurrentUserDlinksResponse)
                }).catch(err => {

                })
            }).catch(err => {

            })
        }
        const handleAddInputField = () =>{
            this.setState({inputFields:[...this.state.inputFields,{title:"",url:""}]})
        }
        const handleRemoveInputFields = (i) => {
            const values = [...this.state.inputFields]
            values.splice(i,1)
            this.setState({inputFields:values})
        }
        const handleChange = (i,e) => {
            // const isCheckbox = e.target.type === "checkbox";
            // this.setState({[e.target.name]: isCheckbox ? e.target.checked : e.target.value})
            const values = [...this.state.inputFields]
            values[i][e.target.name] = e.target.value
            this.setState({inputFields:values})
        }
        const notify = () => {
            store.addNotification({
                title: "Success!",
                message: "Your Links has been added!",
                type: "success",
                container: "top-right",
                insert: "top",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 2000
                }
            })
        }
        return (
            <div className="container-fluid custom-user-detail-page">
                <NextSeo
                    title="DigiLinks"
                    description="Add digilinks to share your links with everyone"
                    openGraph={{
                        url: 'https://www.digitvl.com/home',
                        title: 'Home',
                        description: 'Explore Hub for independent creators and their unique music art',
                        site_name: 'DIGITVL',
                        type:'website'
                    }}
                    additionalMetaTags={[
                        {
                            property:"twitter:image",
                            content:'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property:"twitter:image:src",
                            content:'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property:"og:image",
                            content:'https://www.digitvl.com/images/landing_bg_img.png'
                        },
                        {
                            property:"og:image:width",
                            content:800
                        },
                        {
                            property:"og:image:height",
                            content:500
                        }
                    ]}
                    twitter={{
                        handle: '@digitvl',
                        site: '@digitvl',
                        cardType: 'summary_large_image',
                        image:'https://www.digitvl.com/images/landing_bg_img.png'
                    }}
                />
                <Navbar/>
                <div className="row custom-row-margin mt-5">
                    {/*<div className="col-md-12 col-sm-12 col-lg-12">*/}
                    {/*    <div className="text-center">*/}
                    {/*    <h3 className="text-color-white">Add Links To Share With Everyone</h3>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {this.state.links_array !== null ? <div className="col-md-12 col-sm-12 col-lg-12">
                        <div className="text-right pt-3 pt-sm-3 pr-5" onClick={() => {navigator.clipboard.writeText(`https://www.digitvl.com/${this.state.user_slug}`)}}>
                            <div className="btn btn-outline-primary"> Copy Public Digilink to share</div>
                        </div>
                    </div>:null}
                    <div className="col-md-12 col-sm-12 col-lg-12">
                        <form onSubmit={handleSubmit} className="pt-3 pt-sm-3 pb-5">
                            <div className="container-fluid w-75 h-100 custom-djlink-form pb-5 mx-auto mx-md-auto mx-sm-auto">
                                <div className="text-center custom-djlink-heading pt-5">Add DigiLinks To Share With Everyone</div>
                                <div className="text-center justify-content-center align-content-center align-items-center"><div className="btn btn-primary" onClick={handleAddInputField}>Add Link</div></div>
                                {this.state.inputFields.map((inputField,index) =>(
                                    <div key={index}>
                                        <div className="custom-input w-100 mt-2 text-center">
                                            <input className="mx-auto w-75 custom-tweet-inputtext" type="text" name="title" value={inputField.title}
                                                   onChange={event => handleChange(index,event)} placeholder="Title" tabIndex="1"
                                                   required/>
                                        </div>
                                        <div className="custom-input w-100 mt-2 text-center">
                                            <input className="mx-auto w-75 custom-tweet-inputtext" type="text" name="url" value={inputField.url}
                                                   onChange={event => handleChange(index,event)} placeholder="Url (Add http:// or https:// at start of link)" tabIndex="2"
                                                   required/>
                                            <p>Important Note: Add Https:// or Http:// at the start of the url other wise the link wont redirect.</p>
                                        </div>
                                        <div className="row custom-row-margin">
                                            <div className="col-md-12 col-sm-12 col-lg-12 mt-2">
                                            <div className="text-center justify-content-center align-items-center align-content-center">
                                                <div className="btn btn-primary ml-3" onClick={() => handleRemoveInputFields(index)}>Remove Link</div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="w-50 mt-3 mx-auto">
                                    <button type="submit" tabIndex="3" className="custom-login-button btn btn-block">Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="col-md-12 col-sm-12 col-lg-12">
                            <h4 className="text-center text-white">Your DigiLinks</h4>
                        </div>
                        <div className="col-md-12 col-sm-12 col-lg-12">
                            {this.renderDLinks()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        addDlinksTreeResponse: state.addDtreeLinks.addDtreeLinksData,
        getCurrentUserDlinksResponse: state.currentUserUserDlinks.getCurrentUserDtreeLinksResponse
    }
}
export default connect(mapStateToProps, {addDigitvlTreeLinksApi,getDTreeCurrentUserProfileLinks,deleteDTreePublicProfileLinks})(AddDigitvlLinkstree);