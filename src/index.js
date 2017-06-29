import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Index extends React.Component{
    // constructor(){
    //     super();
        

    // }
    render(){
        return (    
        <div className="index">
            <div className="title">Matt's JS Page <br />(Made in React.js)</div>
		    <div className="admin">Implementation by 343N 
                <a href="http://mashoe.pw" style={{color: "blue"}}>(original here) </a>
                <a href="http://mashoe.pw/343N/matt/" style={{color: "blue"}}>(pure-JS/no react version here)</a></div>
            <ProjectList />
        </div>
        )
    }
}

class Project extends React.Component{
    
    constructor(){
        super();
       
    }
    render(){
        return (
        <a href={this.props.link}>
            <div className="project">
                <div className="right_arrow">\u00BB</div>
                <div className="project_info">
                    <div className="project_name">{this.props.title}</div>
                    <div className="date">{this.props.date}</div>
                </div>

            </div>

        </a>);
    }
}

class ProjectList extends React.Component{
    constructor(){
        super();
        this.state = {
            projects: [["Website: AVCON (own version)", "http://mashoe.pw/avcon/index.html", "October 2016"]
            ,["Flyer: AVCON (own version)", "http://mashoe.pw/avconflyer.pdf", "October 2016"]
            ,["Website: South Australia", "http://mashoe.pw/travel/index.html", "October 2016"]
            ,["Musical Program: The Jungle Book", "http://mashoe.pw/musicalprogram.pdf", "October 2016"]
            ,["DVD Cover: Spirited Away", "http://mashoe.pw/dvdcover.pdf", "October 2016"]],
            newProjectInputValues: [null, null, null]
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    addProject(e){
        this.setState({projects: this.state.projects.concat([e])})
    }
    render(){
        var pjs = this.state.projects.map((e,i) => {
            return (
            // <ProjectCreateModal> </ProjectCreateModal>
            <Project title={e[0]} link={e[1]} date={e[2]} key={i} />)
        }); 

        
        return (
        <div className="main">
            <ProjectCreateModal handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} />
            {pjs}
        </div>);
    }

    handleInputChange(id, e){
        var vals = this.state.newProjectInputValues;
        vals[id] = e;
        this.setState({newProjectInputValues: vals});
    }

    handleSubmit(){
        var a = this.state.projects;
        var v = this.state.newProjectInputValues;
        a.push([v[0], v[2], v[1]]);
        this.setState({projects: a});
        console.log(a);
        console.log(this.state.projects);
    }
}

class ProjectCreateModal extends React.Component{
    constructor(){
        super();
        const inputTitles =  ["Project Title:", "Project Date:", "Project URL:"];     
        
        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        var values = [];
        var components = [];
        
        for (var i = 0; i < inputTitles.length; i++){
            values.push(null);
            components.push(<ModalInput title={inputTitles[i]} class="ProjectCreateModal" onInputChange={this.handleInputChange} id={i} />)
        }

        this.state = {
            isOpen: false,
            inputComponents: components,
            inputValues: values
        }
    }

    handleInputChange(id, e){
        this.props.handleInputChange(id, e);
    }

    handleSubmit(){
        this.props.handleSubmit();
    }
    
    
    render(){
        const expandedModal = []
        if (this.state.isOpen){
            return (
            <div className="projectCreateModal" id="container">
                <div className="projectCreateModal" id="toggleButton" onClick={this.handleClick}>Add new project</div>
                {this.state.inputComponents}
                <ModalSubmitButton handleSubmit={this.handleSubmit} title="Add new project"/>
            </div>
                );
        } else {
            return (<div className="projectCreateModalToggle" id="addProjectModal" onClick={this.handleClick}>Add new project</div>)
    
        }
    }

    handleClick(){
        this.setState({isOpen: !this.state.isOpen});
    }
}

class ModalInput extends React.Component{
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);    
    }
    render(){
        const title = this.props.title;
        const cls = this.props.class;
        return (
        <div>
            <div className={cls} id="title">{title}</div>
            <input className={cls} id="input" onChange={this.handleChange}></input>
        </div>)
    }

    handleChange(e){
        this.props.onInputChange(this.props.id, e.target.value);
    }

}

class ModalSubmitButton extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(){
        return (<button className={this.props.class} onClick={this.handleSubmit}>{this.props.title}</button>)
    }

    handleSubmit(){
        this.props.handleSubmit();
    }
}

ReactDOM.render(<Index />, document.getElementById("root"));