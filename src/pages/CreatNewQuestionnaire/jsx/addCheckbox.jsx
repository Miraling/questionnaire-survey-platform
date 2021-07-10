import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {DeleteOutlined,PlusOutlined}from '@ant-design/icons';
import { Radio, Input, Space, Checkbox, Row, Col,Button } from 'antd';
class AddCheckbox extends Component{
  constructor(props){
      super(props);
      this.state={
          aid:'',
          ask:'',
          type:2,
          isNecessary:Boolean,
          choicenum:2,
          isDeleted:false,
          choiceList: [//每个选项内容
            <Checkbox disabled={true} ><Input  placeholder="请输入选项内容" onChange={this.handleChange}></Input></Checkbox>,
                       
                       
             <Checkbox disabled={true} ><Input  placeholder="请输入选项内容" onChange={this.handleChange}></Input></Checkbox>,
                         
      
          ],
          choicecontent:[]
      
      
      }
      this.addChoice = this.addChoice.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleDelete = this.handleDelete.bind(this);

      }


      handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value =target.value;
        const key = target.key;
        if(name=="choicecontent"){
            if(typeof this.state.choicecontent[key]=='​undefined')
            {
                this.setState(prevState => ({
                    choicecontent: [...prevState.choicecontent,value]
                  }));
            }
            else{
            this.setState({
                [name[key]]: value
              });}
        }
        else{
        this.setState({
          [name]: value
        });}
        }
        addChoice(event){
          //将组件插入新建选项button的前方
          this.setState(prevState => ({
            choiceList: [...prevState.choiceList, <Checkbox disabled={true} ><Input name="choicecontent" key={this.state.choicenum} placeholder="请输入选项内容" onChange={this.handleChange}></Input></Checkbox>]
          }));
          this.setState({
            choicenum: this.state.choicenum + 1
          });
          }

        handleDelete=()=>{
        alert(this.state.aid);
      // alert("点击发出删除请求");
        this.props.handleDelete(this.state.aid);
        
       }

 componentDidMount(){
        this.setState({
            aid:this.props.aid
        })
    }
    componentDidUpdate(prevProps, prevState) {
       
       if(prevProps.aid !== this.props.aid) {
           this.setState({
               aid:this.props.aid
           })
       }
     }
        
          render(){
            return (
             // <RenderInCreatPage> 应在此处用RenderInCreatPage包裹，将内容插入form指定位置
            <div>
                <div>
                  <div>
                <span>第{this.state.aid+1}题</span>
                </div>
                    <div >
                        <span name="aid" value=""/*题号 根据该题在题目数组中的索引号+1生成 */ ></span>
                    </div>
            
                    <div >
                     <Input name="ask" placeholder="请输入该单选题的问题" onChange={this.handleChange}></Input>
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
                     <Checkbox.Group  onChange={this.handleChange} name="choiceList" >
                        <Space direction="vertical">
                            
                            {this.state.choiceList}
                            <Button type="dashed" onClick= {this.addChoice}><PlusOutlined />添加选项</Button>
                        </Space>
                      </Checkbox.Group>
                    </div>
            
                </div>
            </div>
            // </RenderInCreatPage>
            
            )
            
            }

}
 export default AddCheckbox
