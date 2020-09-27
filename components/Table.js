class Table extends React.Component{   
    state = {
        selector: {},
        rejectTracker: {}
    }

    handleSelect = (ind)=>{
        let {selector} = this.state;
        if(ind in selector){
            delete selector[ind];
        }else{
            selector[ind] = true;
        }
        this.setState({
            selector
        })
    }

    handleAccRej = (ind,type = 'accept')=>{
        let {data} = this.props;
        if(type == 'accept'){
            console.log(
                {
                    ...data[ind],
                    action:'approve'
                }
            );
            alert('result logged in console');
        }else{
            let {rejectTracker} = this.state;
            rejectTracker[ind] = true;
            this.setState({
                rejectTracker
            });
        }
    }

    acceptSelected = ()=>{
        let {selector} = this.state;
        let {data} = this.props;
        console.log(
            Object.keys(selector).map((d) => {
                return {
                    ...data[d],
                    action: 'approve'
                }
            })
        );
        alert('result logged in console');
        this.setState({
            selector:{}
        });
    }

    cancelReject = (ind)=>{
        let {rejectTracker} = this.state;
        delete rejectTracker[ind];
        this.setState({
            rejectTracker
        });
    }

    saveRemark = (e,ind)=>{
        e.preventDefault();
        const {data} = this.props;
        const formData = new FormData(e.target);
        let remark = '';
        for (let [key, value] of formData.entries()) {
            if(key == 'remark'){
                remark = value;
                break;
            }
        }
        console.log(
            {
                ...data[ind],
                remark,
                action:'reject'
            }
        );
        alert('result logged in console');
        this.cancelReject(ind);
    }

    render(){
        const {headers,data} = this.props;
        const {selector,rejectTracker} = this.state;
        const selecting = Object.keys(selector).length > 0;

        return(
            <div>
                {
                    (selecting)?
                    <div>
                        <button className = "btn btn-success" onClick = {this.acceptSelected}> Accept Selected </button>
                    </div>
                    :
                    null
                    
                }
                <table className = "table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>
                                Selector
                            </th>
                            {
                                headers.map((ele,ind)=>{
                                    return(
                                        <th key = {'head'+ind}> {ele} </th>
                                    )
                                })
                            }
                            {
                                (selecting)?
                                null
                                :
                                <th>
                                    Action
                                </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((row,ind)=>{
                                return(
                                    <tr key = {row.earning_id}>
                                        <td> <input type = "checkbox" name = "selector" checked = {(selector[ind])?true:false} onClick = {()=>this.handleSelect(ind)}/> </td>
                                        <td> {row.mobile} </td>
                                        <td> {row.earning_id} </td>
                                        <td> {row.earning} </td>
                                        {
                                            (selecting)?
                                                null
                                            :
                                            <td className = "text-center"> 
                                                {
                                                 (ind in rejectTracker)?
                                                    <form onSubmit = {(e)=>this.saveRemark(e,ind)}>
                                                        <input type = "text" name = "remark" placeholder = "Enter the Remark"  className = "form-control"/>
                                                        <div className = "mt-1 text-center">
                                                            <input type = "submit" className = "btn btn-success mr-1" value = "Submit"/>
                                                            <button type = "button" className = "btn btn-danger ml-1" onClick = {()=>{this.cancelReject(ind)}}> Cancel </button>
                                                        </div>
                                                    </form>
                                                 :
                                                    <div>
                                                        <button className = "btn btn-success m-1" onClick = {()=>{this.handleAccRej(ind,'accept')}}> Approve  </button>
                                                        <button className = "btn btn-danger m-1" onClick = {()=>{this.handleAccRej(ind,'reject')}}> Reject </button>
                                                    </div>
                                                }
                                            </td>
                                        }
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table;