import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {DeleteOutlined,PlusOutlined}from '@ant-design/icons';
import { Radio, Input, Space, Checkbox, Row, Col,Button } from 'antd';
class AddText extends Component{
    constructor(props){
        super(props);
        this.state={
            aid:'',
            ask:'',
            type:3,
            isNecessary:Boolean,
            isDeleted:false,
            answer:"",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
}
handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value =target.value;
  
    this.setState({
      [name]: value
    });
  }

  handleDelete(){
    this.setState({
        isDeleted:true
    })
}

render(){
    const { TextArea } = Input;
    return(
        
     <div>
            <div >
                <span name="aid" value=""/*题号 根据该题在题目数组中的索引号+1生成 */ ></span>
            </div>
    
            <div >
             <Input name="ask" placeholder="请输入问题" onChange={this.handleChange}></Input>
            </div>
    
            <div>
            <Button type="primary" onClick={this.handleDelete}  icon={<DeleteOutlined />}></Button>     
            </div>
            <div>
                        <span>该题为：</span>
                        <Radio.Group name="isNecessary" onChange={this.handleChange} >
                             <Radio value={true}>必填</Radio>
                             <Radio value={false}>选填</Radio>
                        </Radio.Group>
                    </div>
            <div>
            <TextArea rows={4} placeholder="请输入您的回答"/>
            </div>
    </div>
    )
}

}
export default AddText