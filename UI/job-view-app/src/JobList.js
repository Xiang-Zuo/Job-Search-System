import React, { Component } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';

class JobList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			list: []
		}
	}

	render() {
		return (
			<div class="jumbotron bg-white">
				<h1 class='text-center'>SavvyPro Job Test</h1>
				<div class="form-group">
					<div class="form-row justify-content-center">
						<div class="offset-4 col-8">
							<label for="keyword">Keyword: </label>
						</div>
					</div>
					<div class="form-row justify-content-center">
						<div class="offset-4 col-4">
							<input type="text" class="form-control" id="keyword" placeholder="Search Keyword"
						value = {this.state.inputValue}
						onChange = {this.handleInputChange.bind(this)}
						/> 
						</div>
						<div class="col-4">
							<button type="button" class="btn btn-primary" onClick = {this.handleSearchBtnClick.bind(this)}>Search</button>
						</div>
					</div>
				</div>
					{
						// this.state.list.map((item, index) => {
						// 	return <li key={index}>{item.position}</li>
						// })
						this.state.list.map(( item, index ) => {
	          return (
	          	<div key={index} >
			          	<table class="table mt-5">
			          		<thead class="thead-dark text-white">
									    <tr>
									      <th>Job Position</th>
									      <th>Company</th>
									      <th>Location</th>
									      <th>Summary</th>
									      <th>Tag</th>
									      <th>Operation</th>
									      <th>Link</th>
									      <th>Update</th>
									    </tr>
									  </thead>
			          		<tbody>
				          		<tr>
					              <td className = 'position' id = {"position" + item.id}><div contentEditable>{item.position}</div></td>
					              <td className = 'company' id = {"company" + item.id}><div contentEditable>{item.company}</div></td>
					              <td className = 'location' id = {"location" + item.id}><div contentEditable>{item.location}</div></td>
					              <td className = 'summary' id = {"summary" + item.id}><div contentEditable>{item.summary}</div></td>
					              <td className = 'tag' id = {"tag" + item.id}><div contentEditable>{item.tag}</div></td>
					              <td className = 'hideBtn'><button class="btn btn-danger" id = {"hide" + item.id} onClick = {this.handleJobHideClick.bind(this)}>Delete</button></td>
					              <td className = 'urlBtn'><button class="btn btn-secondary" id = {item.url} onClick = {this.handleLinkClick.bind(this)}>Link</button></td>
					              <td className = 'updateBtn'><button class="btn btn-primary" id = {item.id} onClick = {this.handleJobUpdateClick.bind(this)}>Update</button></td>
			            		</tr>
			            	</tbody>
			          	</table>
	            </div>
		          );
		        })
					}
			</div>
		)
	}

	handleLinkClick(e){
		const url = e.target.getAttribute('id')
		var win = window.open(url, '_blank');
  	win.focus();
	}

	handleJobHideClick(e) {
		const id = e.target.getAttribute('id')
		var btn = document.getElementById(id);
		let status = btn.innerHTML;
		console.log(status)
		if (status === 'Delete'){
			btn.innerHTML = 'Restore'
		}else {
			btn.innerHTML = 'Delete'
		}
	}

	handleJobUpdateClick(e){
		//console.log(e.target.getAttribute('id'))
		const id = e.target.getAttribute('id')
		const hide = (document.getElementById("hide" + id)).innerHTML === "Restore" ? true : false;
		console.log(hide) 
		const data = {
			'job_id': parseInt(id),
			'job_position': document.getElementById("position" + id).textContent,
			'job_company': document.getElementById("company" + id).textContent,
			'job_location': document.getElementById("location" + id).textContent,
			'job_summary': document.getElementById("summary" + id).textContent,
			'job_tag': document.getElementById("tag" + id).textContent,
			'job_hidden': hide,
		}
		console.log(data)
		fetch('http://localhost:10010/job-update/' + id, {
		  method: 'PUT', 
		  mode: 'cors',
		  headers: {
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(data => {
		  console.log('Success:', data);
		  this.handleSearchBtnClick();
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
	}

	handleInputChange(e){
		this.setState({
			inputValue: e.target.value
		})
	}

	handleSearchBtnClick() {
		this.setState({
			list: []
		})
		fetch('http://localhost:10010'+'/jobs/' + this.state.inputValue)
        .then(res => res.json())
        .then((data) => {
  				var count = Object.keys(data).length;
        	let jobs = []
        	for (var i = 0; i < count; i++){
        		if (!data[i].hidden)
        			jobs.push(data[i])
        	}
          this.setState({ list: jobs })
          document.getElementsByClassName('hideBtn')[0].children[0].innerHTML = "Delete"

        })
        .catch(console.log);
	}
}



export default JobList;